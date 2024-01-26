import re
from dataclasses import dataclass
from os import name

from base import Base
from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String, Text
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


@dataclass
class Student:
    no: int
    name: str
    remarks: str = ""
    is_blocked: bool = False

    def __repr__(self):
        return f"<Student(name={self.name}, no={self.no}, remarks={self.remarks})>"


@dataclass
class CourseGrade:
    name: str
    code: str
    grade: str
    points: float
    marks: float

    def __repr__(self):
        return f"<CourseGrades(name='{self.name}', code={self.code}, grade={self.grade}, points={self.points}, marks={self.marks})>"
