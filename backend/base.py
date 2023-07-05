from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+mysqlconnector://dev:111111@localhost:3306/test_anything")
Session = sessionmaker(bind=engine)

Base = declarative_base()
