from datetime import timedelta
from app.config.base import BaseConfig

class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = 'mysql://root:iamgroot@127.0.0.1:3307/test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    RESERVATION_TIME = timedelta(minutes=15)