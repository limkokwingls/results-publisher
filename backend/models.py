import re
from dataclasses import dataclass, field
from os import name

from base import Base
from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship


@dataclass
class CourseGrade:
    name: str
    code: str
    grade: str
    points: float
    marks: float

    def __repr__(self):
        return f"<CourseGrades(name='{self.name}', code={self.code}, grade={self.grade}, points={self.points}, marks={self.marks})>"


@dataclass
class Student:
    no: int
    name: str
    remarks: str = ""
    is_blocked: bool = False
    course_grades: list[CourseGrade] = field(default_factory=list)

    def __repr__(self):
        return f"<Student(name={self.name}, no={self.no}, remarks={self.remarks}, students={self.course_grades})>"
