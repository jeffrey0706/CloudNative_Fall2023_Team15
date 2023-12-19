from datetime import timedelta
import os
from app.config.base import BaseConfig
from app import db

class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = 'mysql://root:iamgroot@127.0.0.1:3307/test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    RESERVATION_TIME = timedelta(minutes=15)