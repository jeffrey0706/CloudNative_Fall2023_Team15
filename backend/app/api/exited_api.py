from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from datetime import datetime

from app.models import Attendance
from app import db

exited_bp = Blueprint('exited', __name__)

@exited_bp.route('/exited', methods=['DELETE'])
def exited():
    '''
    Request
        DELETE /exited
        {
            car_id: int,
            exit_time: datetime,
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
    if 'exit_time' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: exit_time'
        }), 400
    
    car_id = data.get('car_id')
    exit_time = data.get('exit_time')

    try:
        exit_time = datetime.strptime(exit_time, '%Y-%m-%d %H:%M:%S')
        exit_time = exit_time.replace(tzinfo=None)
    except (ValueError, TypeError):
        return jsonify({'message': '`exit_time` should be in `%Y-%m-%d %H:%M:%S` format'}), 400

    try:
        car_id = int(car_id)
    except ValueError:
        return jsonify({'error': "Invalid 'car_id` parameter, must be an integer"}), 400

    attendance: Attendance = Attendance.query.filter_by(CarID=car_id).one_or_none()
    if not attendance:
        return jsonify({'error': 'attendance not found'}), 404
    
    # Update attendance
    try:
        attendance.ExitTime = exit_time
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update attendance, caused by {e.orig}'}), 503

    # Delete attendance
    try:
        db.session.delete(attendance)
        db.session.commit()
        return jsonify({f'message': f'car_id {car_id} exited successfully'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to delete attendance, caused by {e.orig}'}), 503