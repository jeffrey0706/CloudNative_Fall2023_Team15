from flask import jsonify, request

from app import sess

from .car_api import car_bp
from .login_api import login_bp
from .parkinglot_api import parkinglot_bp
from .profile_api import profile_bp
from .register_api import register_bp
from .reservation_api import reservation_bp
from .spot_history_api import spot_history_bp
from .map_api import map_bp
# from .reservation_api import configure_reservation
from .user_status_api import user_status_bp
from .parked_api import parked_bp
from .exited_api import exited_bp
from .expired_alert_api import expired_alert_bp
from .utility_api import utility_bp

@car_bp.before_request
@parkinglot_bp.before_request
@profile_bp.before_request
@reservation_bp.before_request
@spot_history_bp.before_request
@map_bp.before_request 
@user_status_bp.before_request
@parked_bp.before_request
@exited_bp.before_request
@expired_alert_bp.before_request
@utility_bp.before_request
def check_session():
    if request.method == 'OPTIONS':
        return
    session_id = request.cookies.get('session')
    cookie = sess.app.session_interface.sql_session_model.query.filter_by(session_id=session_id).first()
    if cookie is None:
        return jsonify({'message': 'User not logged in'}), 401

@car_bp.after_request
@parkinglot_bp.after_request
@profile_bp.after_request
@reservation_bp.after_request
@spot_history_bp.after_request
@map_bp.after_request 
@user_status_bp.after_request
@parked_bp.after_request
@exited_bp.after_request
@expired_alert_bp.after_request
@utility_bp.after_request
@login_bp.after_request
def add_samesite_to_cookies(response):
    # Set the SameSite attribute for all cookies
    response.headers.add('Access-Control-Allow-Credentials', 'true')

    return response
