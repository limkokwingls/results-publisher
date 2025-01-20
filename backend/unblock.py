import os
import time
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


def unblock(student_number: str) -> None:
    app, db = get_db()
    db.collection("students").document(str(student_number)).set(
        {"is_blocked": False}, merge=True
    )
    cleanup_db(app)


def main():
    """Unblock students and update their status in both database and spreadsheet."""
    while True:
        try:
            print("\nChecking for blocked students...")
            service = get_google_sheets_service()
            blocked_students = get_blocked_students(service)

            if not blocked_students:
                print("No blocked students found.")
            else:
                print(f"Found {len(blocked_students)} blocked students.")
                for student in blocked_students:
                    if len(student.strip()) == 9 and student.isdigit():
                        print(f"Unblocking: {student}")
                        unblock(student.strip())
                        mark_as_unblocked(service, student)
                    else:
                        print(
                            "Invalid Student Number: '{student}'",
                        )
        except Exception as e:
            print(f"An error occurred: {str(e)}")

        print("Waiting 30 seconds before next check...")
        time.sleep(30)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nScript terminated by user.")
