from flask import Flask
from flask_cors import CORS

from typing import List

from app.config import config
from app import db
from app.api import *

def create_app(config_name='testing'):
    conf = config[config_name]

    app = Flask(__name__)
    CORS(app)
    app.config.from_object(conf)

    app.register_blueprint(car_bp) 
    app.register_blueprint(login_bp)   
    app.register_blueprint(parkinglot_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(register_bp)
    # configure_reservation(conf)
    app.register_blueprint(reservation_bp)
    app.register_blueprint(spot_history_bp)
    app.register_blueprint(user_status_bp)
    app.register_blueprint(map_bp)
    app.register_blueprint(parked_bp)
    app.register_blueprint(exited_bp)
    app.register_blueprint(expired_alert_bp)
    app.register_blueprint(utility_bp)

    db.init_app(app)

    return app