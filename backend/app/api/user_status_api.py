from flask import Blueprint, jsonify

from datetime import datetime

from app.models import User, Car, Reservation, Attendance

user_status_bp = Blueprint('user_status', __name__)

@user_status_bp.route('/user_status/<int:uuid>', methods=['GET'])
def user_status(uuid):
    '''
    // GET: /user_status/{user_id}
    {
        status: string, // NONE, RESERVED, PARKED, EXPIRED
    }
    '''
    # if user not exist, return NONE
    user: User = User.query.filter_by(UserID=uuid).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    car = Car.query.filter_by(UserID=uuid).first()
    if not car:
        return jsonify({'message': 'This user does not have a car'})
    car_id = car.CarID
    
    # Check reservation or Attendance by car_id
    reservation: Reservation = Reservation.query.filter_by(CarID=car_id).first()
    attendance: Attendance = Attendance.query.filter_by(CarID=car_id).first()
    
    if attendance:
        return jsonify({'status': 'PARKED'})
    elif reservation:
        if reservation.ExpiredTime < datetime.now():
            return jsonify({'status': 'EXPIRED'})
        else:
            return jsonify({'status': 'RESERVED'})
    else:
        return jsonify({'status': 'NONE'})