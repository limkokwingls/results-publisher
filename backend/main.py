from types import NoneType

import openpyxl
from base import Base, Session, engine
from models import CourseGrade, Program, Student, StudentClass
from openpyxl.cell.cell import Cell
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl.workbook.workbook import Workbook
from openpyxl.worksheet.worksheet import Worksheet
from rich import print
from rich.console import Console

console = Console()


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


def get_std_name_column(sheet: Worksheet):
    for col in sheet.iter_cols():
        for c in col:
            cell: Cell = c
            if cell.value == "Name":
                return cell.column
    return 2


def get_course_rows(sheet: Worksheet):
    courses = {}
    for col in sheet.iter_cols():
        for c in col:
            cell: Cell = c
            if cell.value == "Mk":
                col_i = cell.col_idx
                row_i = cell.row
                code_cell: Cell = sheet.cell(row_i - 2, col_i)
                name_cell: Cell = sheet.cell(row_i - 8, col_i)
                # courses[grade_cell.value] = grade_cell.column
                courses[code_cell.column] = {
                    "code": code_cell.value,
                    "name": name_cell.value,
                }
    return courses


def get_students_with_rows(sheet: Worksheet) -> dict[int, Student]:
    data = {}
    std_col = get_std_column(sheet)
    std_name_col = get_std_name_column(sheet)

    for i, row in enumerate(sheet.iter_rows()):
        num = None
        name = None
        for _cell in row:
            cell: Cell = _cell
            if cell.column == std_col:
                if is_number(cell.value):
                    num = cell.value
            if cell.column == std_name_col:
                name = cell.value
        if num and name:
            data[i + 1] = Student(name=name, no=num)

    return data


def save_student_grades(sheet: Worksheet, student_class: StudentClass):
    marks_dict = get_course_rows(sheet)
    students = get_students_with_rows(sheet)

    for student_col, std in students.items():
        for mark_col, course in marks_dict.items():
            marks_cell: Cell = sheet.cell(student_col, mark_col)
            grade_cell: Cell = sheet.cell(student_col, mark_col + 1)
            points_cell: Cell = sheet.cell(student_col, mark_col + 2)
            if is_number(marks_cell.value):
                marks = float(str(marks_cell.value))
                grade = str(grade_cell.value)
                points = float(str(points_cell.value))
                student = session.query(Student).filter_by(no=std.no).first()
                if not student:
                    student = Student(
                        name=std.name,
                        no=std.no,
                        student_class_id=student_class.id,
                    )
                    session.add(student)
                    session.commit()

                course_grade = CourseGrade(
                    code=course["code"],
                    name=course["name"],
                    marks=marks,
                    grade=grade,
                    points=points,
                    student_no=student.no,
                )
                session.add(course_grade)
                session.commit()


def create_student_class(sheet: Worksheet):
    faculty = ""
    program_index = -1
    class_index = -1
    for i, row in enumerate(sheet.iter_rows()):
        for _cell in row:
            cell: Cell = _cell
            if cell.data_type == "s" and "faculty" in str(cell.value).lower():
                program_index = i + 1
                class_index = i + 5
                faculty = str(cell.value)

    program_row = list(sheet.iter_rows())[program_index]
    class_row = list(sheet.iter_rows())[class_index]
    program_name = str(program_row[0].value)
    class_name = str(class_row[0].value)
    level = program_name.split(" ")[0]

    # find program from database
    program = session.query(Program).filter_by(name=program_name).first()
    if not program:
        program = Program(name=program_name, level=level, faculty=faculty)
        session.add(program)
        session.commit()

    # find class from database
    student_class = session.query(StudentClass).filter_by(name=class_name).first()
    if not student_class:
        student_class = StudentClass(name=class_name, program_id=program.id)
        session.add(student_class)
        session.commit()

    return student_class


Base.metadata.create_all(engine)
session = Session()


def main():
    workbook: Workbook = openpyxl.load_workbook("test.xlsx")
    for i, ws in enumerate(workbook):
        sheet: Worksheet = ws
        with console.status(
            f"{i + 1}/{len(workbook.worksheets)} Processing '{sheet.title}'..."
        ):
            student_class = create_student_class(sheet)
            save_student_grades(sheet, student_class)
        print("Done!")


if __name__ == "__main__":
    print(main())
