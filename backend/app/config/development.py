from datetime import timedelta
import os
from app.config.base import BaseConfig
from app import db

class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = 'mysql://root:iamgroot@127.0.0.1:3307/test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    RESERVATION_TIME = timedelta(minutes=15)

    SECRET_KEY = os.urandom(24)
    SESSION_SQLALCHEMY_TABLE = 'SessionsDB'
    SESSION_KEY_PREFIX = ''
    SESSION_TYPE = 'sqlalchemy'
    SESSION_SQLALCHEMY = db
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)