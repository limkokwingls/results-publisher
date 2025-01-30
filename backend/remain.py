import csv
from dataclasses import dataclass
from typing import Any, Dict, List

import firebase_admin
from firebase_admin import credentials, firestore


@dataclass
class StudentRemark:
    student_no: int
    name: str
    remarks: str


def initialize_firebase():
    """Initialize Firebase connection"""
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    return firestore.client()


def get_students_with_remain_remarks() -> List[StudentRemark]:
    """Fetch students with 'remain' in their remarks"""
    db = initialize_firebase()
    students_ref = db.collection("students")
    students = students_ref.get()

    remain_students: List[StudentRemark] = []

    for student in students:
        student_data: Dict[str, Any] = student.to_dict()
        remarks = (
            student_data.get("remarks", "") or student_data.get("remark", "")
        ).lower()

        if remarks and "remain" in remarks:
            remain_students.append(
                StudentRemark(
                    student_no=student_data["no"],
                    name=student_data["name"],
                    remarks=student_data["remarks"],
                )
            )

    return remain_students


def save_to_csv(students: List[StudentRemark], filename: str = "remain_students.csv"):
    """Save students with remarks to CSV file"""
    if not students:
        print("No students found with 'remain' in their remarks")
        return

    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        # Write header
        writer.writerow(["Student Number", "Name", "Remarks"])

        # Write student data
        for student in students:
            writer.writerow([student.student_no, student.name, student.remarks])

    print(f"Successfully saved {len(students)} students to {filename}")


def main():
    try:
        students = get_students_with_remain_remarks()
        save_to_csv(students)
    except firebase_admin.exceptions.FirebaseError as e:
        print(f"Firebase error occurred: {str(e)}")
    except IOError as e:
        print(f"Error writing to CSV file: {str(e)}")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")


if __name__ == "__main__":
    main()
