import os
from types import NoneType

import firebase_admin
import openpyxl
from base import Base, Session, engine
from firebase_admin import credentials, firestore
from openpyxl.cell.cell import Cell
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.styles.colors import Color
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl.workbook.workbook import Workbook
from openpyxl.worksheet.worksheet import Worksheet
from rich import print
from rich.console import Console
from sqlalchemy.orm import SessionTransaction
from utils import is_number

console = Console()
Base.metadata.create_all(engine)
session = Session()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_std_no_column(sheet: Worksheet):
    for col in sheet.iter_cols():
        for c in col:
            cell: Cell = c
            if cell.value == "Student ID":
                return cell.column
    return 3


def get_student_numbers(sheet: Worksheet) -> list[str]:
    student_numbers = []
    col_number = get_std_no_column(sheet)
    for row in sheet.iter_rows():
        cell: Cell = row[col_number]
        if is_number(cell.value):
            student_numbers.append(cell.value)

    return student_numbers


def main():
    cred = credentials.Certificate("serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client(app)
    workbook: Workbook = openpyxl.load_workbook("BLOCK LIST _JAN 2024.xlsx")
    for sheet in workbook:
        student_numbers = get_student_numbers(sheet)
        for i, num in enumerate(student_numbers):
            db.collection("students").document(str(num)).set(
                {"is_blocked": True}, merge=True
            )
            print(f"{i + 1}/{len(student_numbers)}) {num} blocked")
    print("Done!")


if __name__ == "__main__":
    main()
