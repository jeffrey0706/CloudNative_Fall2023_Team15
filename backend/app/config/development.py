from datetime import timedelta
import os
from app.config.base import BaseConfig
from app import db
from os import getenv
from dotenv import load_dotenv

class DevelopmentConfig(BaseConfig):
    load_dotenv()

    db_host = getenv('DB_HOST')
    db_user = getenv('DB_USER')
    db_password = getenv('DB_PASSWORD')
    db_ip = getenv('DB_IP')
    db_name = getenv('DB_NAME')
    db_port = getenv('DB_PORT')
    db_ssl_ca = getenv('DB_SSL_CA')

    SQLALCHEMY_DATABASE_URI = f'mysql://{db_user}:{db_password}@{db_ip}:{db_port}/{db_name}'
    if db_host == 'azure':
        SQLALCHEMY_DATABASE_URI += f'?ssl_ca={db_ssl_ca}'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    RESERVATION_TIME = timedelta(minutes=15)