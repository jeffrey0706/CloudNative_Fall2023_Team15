from datetime import timedelta
import os

from app import db

class BaseConfig(object):
        SECRET_KEY = os.urandom(24)
        SESSION_SQLALCHEMY_TABLE = 'SessionsDB'
        SESSION_KEY_PREFIX = ''
        SESSION_TYPE = 'sqlalchemy'
        SESSION_SQLALCHEMY = db
        SESSION_COOKIE_SAMESITE = 'None'
        SESSION_COOKIE_SECURE = True
        PERMANENT_SESSION_LIFETIME = timedelta(days=1)