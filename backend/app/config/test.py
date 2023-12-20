import os
from datetime import timedelta

from app.config.base import BaseConfig

from os import getenv
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))

def create_sqlite_uri(db_name):
        return "sqlite:///" + os.path.join(basedir, db_name)

class TestingConfig(BaseConfig):
        load_dotenv()

        test_db = getenv('TEST_DB_NAME')
        TESTING = True
        SQLALCHEMY_DATABASE_URI = create_sqlite_uri(test_db)
        SQLALCHEMY_TRACK_MODIFICATIONS = False
        RESERVATION_TIME = timedelta(minutes=15)