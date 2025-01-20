import os
from typing import List, NoReturn

from db import cleanup_db, get_db
from googleapiclient.discovery import Resource
from openpyxl.worksheet.worksheet import Worksheet
from rich import print
from spreadsheet import (
    get_blocked_students,
    get_google_sheets_service,
    mark_as_unblocked,
)
from tqdm import tqdm


def unblock(student_number: str) -> None:
    app, db = get_db()
    db.collection("students").document(str(student_number)).set(
        {"is_blocked": False}, merge=True
    )
    cleanup_db(app)


def main():
    """Unblock students and update their status in both database and spreadsheet."""
    try:
        print("Initializing...")
        service = get_google_sheets_service()
        blocked_students = get_blocked_students(service)

        if not blocked_students:
            print("No blocked students found.")
        else:
            print(f"Found {len(blocked_students)} blocked students.")
            for student in tqdm(blocked_students, desc="Unblocking students"):
                unblock(student.strip())
                mark_as_unblocked(service, student)
            print("\nDone!")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

    os.system("pause")


if __name__ == "__main__":
    main()
