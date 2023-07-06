import re
from os import name

from base import Base
from sqlalchemy import Column, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Faculty(Base):
    __tablename__ = "faculties"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(80))

    def __repr__(self):
        return (
            f"<Program(name={self.name}, level={self.level}, faculty={self.faculty})>"
        )


class Program(Base):
    __tablename__ = "programs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(80))
    faculty_id: Mapped[int] = mapped_column(Integer, index=True)

    def __repr__(self):
        return f"<Program(name={self.name}, faculty_id={self.faculty_id})>"


class StudentClass(Base):
    __tablename__ = "student_classes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    program_id: Mapped[int] = mapped_column(Integer, index=True)

    def __repr__(self):
        return f"<StudentClass(name={self.name}, program_id={self.program_id})>"


class Student(Base):
    __tablename__ = "students"
    no: Mapped[str] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    student_class_id: Mapped[int] = mapped_column(Integer, index=True)
    remarks: Mapped[str] = mapped_column(Text, default="")
    is_blocked: Mapped[bool] = mapped_column(Integer, default=False)

    def __repr__(self):
        return f"<Student(name={self.name}, no={self.no}, student_class_id={self.student_class_id})>"


class CourseGrade(Base):
    __tablename__ = "course_grades"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    code: Mapped[str] = mapped_column(String(20))
    grade: Mapped[str] = mapped_column(String(5))
    points: Mapped[float] = mapped_column(Float)
    marks: Mapped[float] = mapped_column(Float)
    student_no: Mapped[int] = mapped_column(Integer, index=True)

    def __init__(self, name, code, grade, points, marks, student_no):
        self.name = name
        self.code = code
        self.grade = grade
        self.points = points
        self.marks = marks
        self.student_no = student_no

    def __repr__(self):
        return f"<CourseGrades(name='{self.name}', code={self.code}, grade={self.grade}, points={self.points}, marks={self.marks})>"
