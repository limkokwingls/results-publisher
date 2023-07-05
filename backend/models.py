from dataclasses import dataclass


@dataclass()
class Program:
    name: str
    faculty: str


@dataclass()
class CourseGrades:
    name: str
    code: str
    grade: str
    points: float
