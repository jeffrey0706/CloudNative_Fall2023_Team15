from flask import Flask
from flask import jsonify, request
import sqlalchemy
from sqlalchemy.exc import IntegrityError

from datetime import datetime
from typing import List

from app.config import config
from app.models import *
from app import db

from app.api import *

def create_app(config_name='testing'):
    conf = config[config_name]

    app = Flask(__name__)
    app.config.from_object(conf)

    app.register_blueprint(car_bp)    
    app.register_blueprint(parkinglot_bp)
    app.register_blueprint(profile_bp)
    configure_reservation(conf)
    app.register_blueprint(reservation_bp)
    app.register_blueprint(spot_history_bp)
    app.register_blueprint(user_status_bp)

    db.init_app(app)

    return app