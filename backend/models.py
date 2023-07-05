from base import Base
from sqlalchemy import Column, Date, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class Program(Base):
    __tablename__ = "programs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(80))
    level: Mapped[str] = mapped_column(String(20))
    faculty: Mapped[str] = mapped_column(String(80))

    def __init__(self, name, level, faculty):
        self.name = name
        self.level = level
        self.faculty = faculty

    def __str__(self):
        return f"{self.name} {self.faculty}"


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

    def __str__(self):
        return f"{self.name} {self.code} {self.grade} {self.points}"
