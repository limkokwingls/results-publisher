import os

import MySQLdb
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

host = os.getenv("DB_HOST")
user = os.getenv("DB_USERNAME")
passwd = os.getenv("DB_PASSWORD")
db = os.getenv("DB_DATABASE")

print(host, user, passwd, db)

# engine = create_engine(f"mysql+mysqlconnector://{user}:{passwd}@{host}:3306/{db}")
engine = create_engine("mysql+mysqlconnector://dev:111111@localhost:3306/test_anything")
Session = sessionmaker(bind=engine)

Base = declarative_base()
