from os import name

from base import Base
from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class Program(Base):
    __tablename__ = "programs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(80))
    level: Mapped[str] = mapped_column(String(20))
    faculty: Mapped[str] = mapped_column(String(80))

    def __repr__(self):
        return (
            f"<Program(name={self.name}, level={self.level}, faculty={self.faculty})>"
        )


class StudentClass(Base):
    __tablename__ = "student_classes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    program_id: Mapped[int] = mapped_column(ForeignKey("programs.id"))

    def __repr__(self):
        return f"<StudentClass(name={self.name}, program_id={self.program_id})>"


class CourseGrades(Base):
    __tablename__ = "course_grades"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    code: Mapped[str] = mapped_column(String(20))
    grade: Mapped[str] = mapped_column(String(5))
    points: Mapped[float] = mapped_column(Float)

    def __init__(self, name, code, grade, points):
        self.name = name
        self.code = code
        self.grade = grade
        self.points = points

    def __repr__(self):
        return f"<CourseGrades(name={self.name}, code={self.code}, grade={self.grade}, points={self.points})>"
