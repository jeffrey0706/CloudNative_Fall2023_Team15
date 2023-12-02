import os
from datetime import timedelta

from app.config.base import BaseConfig

basedir = os.path.abspath(os.path.dirname(__file__))

def create_sqlite_uri(db_name):
        return "sqlite:///" + os.path.join(basedir, db_name)

class TestingConfig(BaseConfig):
        SQLALCHEMY_DATABASE_URI = create_sqlite_uri('test.db')
        SQLALCHEMY_TRACK_MODIFICATIONS = False
        RESERVATION_TIME = timedelta(minutes=15)