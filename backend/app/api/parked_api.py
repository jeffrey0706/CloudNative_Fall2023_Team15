from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from datetime import datetime

from app.models import Reservation, Attendance
from app import db

parked_bp = Blueprint('parked', __name__)

@parked_bp.route('/parked', methods=['POST'])
def parked():
    '''
    Request
        POST /parked
        {
            car_id: int,
            park_time: datetime,
        }
    Response
        {
            message: string
        }
    '''
    data = request.get_json()

    if 'car_id' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: car_id'
        }), 400
    if 'park_time' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: park_time'
        }), 400
    
    car_id = data.get('car_id')
    park_time = data.get('park_time')

    try:
        park_time = datetime.strptime(park_time, '%Y-%m-%d %H:%M:%S')
        park_time = park_time.replace(tzinfo=None)
    except (ValueError, TypeError):
        return jsonify({'message': '`park_time` should be in `%Y-%m-%d %H:%M:%S` format'}), 400

    try:
        car_id = int(car_id)
    except ValueError:
        return jsonify({'error': "Invalid `car_id` parameter, must be an integer"}), 400

    reservation: Reservation = Reservation.query.filter_by(CarID=car_id).one_or_none()
    if not reservation:
        return jsonify({'error': 'reservation not found'}), 404
    
    # Delete reservation
    try:
        db.session.delete(reservation)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to delete reservation, caused by {e.orig}'}), 503
    
    # Add attendance
    attendance = Attendance()
    attendance.CarID = car_id
    attendance.ParkingSpotID = reservation.ParkingSpotID
    attendance.ParkTime = park_time
    attendance.ExitTime = None
    try:
        db.session.add(attendance)
        db.session.commit()
        return jsonify({'message': 'Successfully parked'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update attendance, caused by {e.orig}'}), 503


    