import os
from types import NoneType

import openpyxl
from base import Base, Session, engine
from models import CourseGrade, Faculty, FacultyRemarks, Program, Student, StudentClass
from openpyxl.cell.cell import Cell
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl.workbook.workbook import Workbook
from openpyxl.worksheet.worksheet import Worksheet
from rich import print
from rich.console import Console
from sqlalchemy.orm import SessionTransaction

console = Console()
Base.metadata.create_all(engine)
session = Session()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


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


def get_remarks_column(sheet: Worksheet):
    for col in sheet.iter_cols():
        for c in col:
            cell: Cell = c
            if "faculty remark" in str(cell.value).lower():
                return cell.column
    raise Exception("Remarks column not found")


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
                mk_label_i = cell.row  # The row index for "MK"
                code_cell: Cell = sheet.cell(mk_label_i - 2, col_i)
                name = None
                i = 3
                try:
                    while i < 10:
                        name_cell = sheet.cell(mk_label_i - i, col_i)
                        name = name_cell.value
                        if name:
                            break
                        i += 1
                except Exception as e:
                    print(e)

                # courses[grade_cell.value] = grade_cell.column
                courses[code_cell.column] = {
                    "code": code_cell.value,
                    "name": name,
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
    remarks_col = get_remarks_column(sheet)

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

                remarks_cell: Cell = sheet.cell(student_col, remarks_col)
                faculty_remarks = (
                    session.query(FacultyRemarks)
                    .filter_by(student_no=student.no)
                    .first()
                )
                if not faculty_remarks:
                    faculty_remarks = FacultyRemarks(
                        remarks=remarks_cell.value, student_no=student.no
                    )
                    session.add(faculty_remarks)
                    session.commit()


def create_student_class(sheet: Worksheet):
    faculty_name = ""
    program_index = -1
    class_index = -1
    program_name, class_name = "", None
    for i, row in enumerate(sheet.iter_rows()):
        for _cell in row:
            cell: Cell = _cell
            if cell.data_type == "s" and "faculty of" in str(cell.value).lower():
                program_index = i + 1
                class_index = i + 5
                faculty_name = str(cell.value)
                program_row = list(sheet.iter_rows())[program_index]
                program_name = str(program_row[0].value)

                # if information is all in one cell
                lines = str(cell.value).split("\n")
                if len(lines) > 5:
                    faculty_name = lines[1]
                    program_name = lines[2]
                    class_index = i + 1

    class_row = list(sheet.iter_rows())[class_index]
    class_name = str(class_row[0].value)

    faculty = session.query(Faculty).filter_by(name=faculty_name).first()
    if not faculty:
        faculty = Faculty(name=faculty_name)
        session.add(faculty)
        session.commit()

    # find program from database
    program = session.query(Program).filter_by(name=program_name).first()
    if not program:
        program = Program(name=program_name, faculty_id=faculty.id)
        session.add(program)
        session.commit()

    # find class from database
    student_class = session.query(StudentClass).filter_by(name=class_name).first()
    if not student_class:
        student_class = StudentClass(name=class_name, program_id=program.id)
        session.add(student_class)
        session.commit()

    return student_class


def get_data_files(dir: str):
    files = []
    dir = os.path.join(BASE_DIR, dir)
    for file in os.listdir(dir):
        if file.endswith(".xlsx"):
            files.append(os.path.join(dir, file))
    return files


def delete_everything():
    session.query(FacultyRemarks).delete()
    session.query(CourseGrade).delete()
    session.query(Student).delete()
    session.query(StudentClass).delete()
    session.query(Program).delete()
    session.query(Faculty).delete()
    session.commit()


def main():
    with console.status("Clearing database..."):
        delete_everything()
    files = get_data_files("data")
    for i, file in enumerate(files):
        file_name = file.split("\\")[-1]
        print(f"{i+1}/{len(files)}) {file_name}")
        workbook: Workbook = openpyxl.load_workbook(file)
        for i, ws in enumerate(workbook):
            sheet: Worksheet = ws
            with console.status(
                f"{i + 1}/{len(workbook.worksheets)} Processing '{sheet.title}'..."
            ):
                print(sheet.title)
                student_class = create_student_class(sheet)
                save_student_grades(sheet, student_class)
    print("Done!")


if __name__ == "__main__":
    main()
