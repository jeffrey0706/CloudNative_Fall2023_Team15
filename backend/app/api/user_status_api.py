from enum import IntEnum
from flask import Blueprint, jsonify
from datetime import datetime

from app.models import User, Car, Reservation, Attendance, Record, Appointment

class UserStatus(IntEnum):
    NONE = 0
    RESERVED = 1
    PARKED = 2
    EXPIRED = 3

user_status_bp = Blueprint('user_status', __name__)

@user_status_bp.route('/user_status/<int:uuid>', methods=['GET'])
def user_status(uuid):
    '''
    // GET: /user_status/{user_id}
    {
        status: int, // NONE(0), RESERVED(1), PARKED(2), EXPIRED(3)
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
    # reservation: Reservation = Reservation.query.filter_by(CarID=car_id).first()
    # attendance: Attendance = Attendance.query.filter_by(CarID=car_id).first()
    reservation: Appointment = Appointment.query.filter(Appointment.CarID==car_id, Appointment.ExpiredTime==None).first()
    attendance: Appointment = Appointment.query.filter(Appointment.CarID==car_id, Appointment.ExpiredTime!=None).first()

    if attendance:
        return jsonify({'status': UserStatus.PARKED})
    elif reservation:
        if reservation.ExpiredTime < datetime.now():
            return jsonify({'status': UserStatus.EXPIRED})
        else:
            return jsonify({'status': UserStatus.RESERVED})
    else:
        return jsonify({'status': UserStatus.NONE})