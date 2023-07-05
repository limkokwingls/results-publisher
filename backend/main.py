from types import NoneType

import openpyxl
from models import Program
from openpyxl.cell.cell import Cell
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl.workbook.workbook import Workbook
from openpyxl.worksheet.worksheet import Worksheet
from rich import print


def to_int(value):
    return int(float(value))


def is_number(s):
    if type(s) == NoneType:
        return False
    try:
        float(s)
    except ValueError:
        return False
    return True


def get_std_column(sheet: Worksheet):
    for col in sheet.iter_cols():
        for c in col:
            cell: Cell = c
            if cell.value == "StudentID":
                return cell.column
    return 3


def get_marks_cols(sheet: Worksheet):
    courses = {}
    for col in sheet.iter_cols():
        for c in col:
            cell: Cell = c
            if cell.value == "Mk":
                col_i = cell.col_idx
                row_i = cell.row
                grade_cell: Cell = sheet.cell(row_i - 2, col_i)
                # courses[grade_cell.value] = grade_cell.column
                courses[grade_cell.column] = grade_cell.value
    return courses


def get_student_numbers(sheet: Worksheet) -> dict[int, str]:
    data = {}
    std_col = get_std_column(sheet)

    for col in sheet.iter_cols():
        for c in col:
            cell: Cell = c
            if cell.column == std_col:
                if is_number(cell.value):
                    data[cell.row] = cell.value
    return data


def read_excel_marks(sheet: Worksheet):
    marks_dict = get_marks_cols(sheet)
    students = get_student_numbers(sheet)

    results = {}
    for student_col in students:
        student_number = to_int(students[student_col])
        data = []
        for mark_col, course_code in marks_dict.items():
            cell: Cell = sheet.cell(student_col, mark_col)
            mark_value = None
            if is_number(cell.value):
                mark_value = float(cell.value)  # type: ignore
                data.append({course_code: mark_value})
        results[student_number] = data

    return results  # convert_list_to_dict(results)


def read_program(sheet: Worksheet):
    faculty = ""
    program_index = -1
    for i, row in enumerate(sheet.iter_rows()):
        for _cell in row:
            cell: Cell = _cell
            if cell.data_type == "s" and "faculty" in str(cell.value).lower():
                program_index = i + 1
                faculty = str(cell.value)

    program_row = list(sheet.iter_rows())[program_index]
    program_name = str(program_row[0].value)

    return Program(name=program_name, faculty=faculty)


def main():
    workbook: Workbook = openpyxl.load_workbook("test.xlsx")
    for i, ws in enumerate(workbook):
        sheet: Worksheet = ws
        # program = read_program(sheet)
        marks = read_excel_marks(sheet)
        # print(program)

        # print(marks)
        exit()


if __name__ == "__main__":
    print(main())
