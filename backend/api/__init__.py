from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass

class Base(DeclarativeBase, MappedAsDataclass):
    pass

db: SQLAlchemy = SQLAlchemy(model_class=Base)

RESERVATION_TIME = timedelta(minutes=15)