# from sqlalchemy import create_engine
from sqlalchemy import URL, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

connection_string = URL.create(
    "postgresql",
    username="ntholi.nkhatho",
    password="iU5pnYjQIVS2",
    host="ep-bitter-fire-a2jtkev1.eu-central-1.aws.neon.tech",
    database="limkokwing",
    # connect_args={'sslmode':'require'}
)

engine = create_engine(connection_string)
Session = sessionmaker(bind=engine)

Base = declarative_base()
