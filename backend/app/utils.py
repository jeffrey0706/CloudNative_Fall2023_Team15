from flask import Flask, jsonify, session
from flask_cors import CORS

from app.config import config
from app import db, sess
from app.api import *

def create_app(config_name='testing'):
    conf = config[config_name]

    app = Flask(__name__)
    app.config.from_object(conf)

    db.init_app(app)
    sess.init_app(app)

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

    CORS(app)

    return app