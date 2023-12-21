from flask import Blueprint, jsonify

from typing import List

from app.models import ParkingSpot, Record, Car, Attendance
from app import db

spot_history_bp = Blueprint('spot_history', __name__)

@spot_history_bp.route('/history/<int:spot_id>', methods=['GET'])
def spot_history(spot_id):
    '''
    // GET /history/{spot_id}
    [
        {
            type: string,       // ATTENDANCE, RECORD
            user_id: int,
            license: string,
            start_time: datetime,
            end_time: datetime,
        }
    ]
    '''

    parking_spot: ParkingSpot = ParkingSpot.query.get(spot_id)
    
    if parking_spot is None:
        return jsonify({'message': 'spot id does not exist'}), 404

    results = []

    records: List[Record] = Record.query.filter(Record.ParkingSpotID == spot_id).all()
    car_ids = [r.CarID for r in records]
    records_with_car = db.session.query(Record, Car).join(Car).filter(Record.CarID.in_(car_ids)).all()

    records = [
        {
            'type': 'RECORD',
            'user_id': c.UserID,
            'license': c.Lisence,
            'reservation_time': r.ReservationTime,
            'expired_time': r.ExpiredTime,
            'park_time': r.ParkTime,
            'exit_time': r.ExitTime,
        } for r, c in records_with_car
    ]

    attenances: List[Attendance] = Attendance.query.filter(Attendance.ParkingSpotID == spot_id).all()
    car_ids = [r.CarID for r in attenances]
    attenances_with_car = db.session.query(Attendance, Car).join(Car).filter(Attendance.CarID.in_(car_ids)).all()

    attenances = [
        {
            'type': 'ATTENDANCE',
            'user_id': c.UserID,
            'license': c.Lisence,
            'park_time': a.ParkTime,
            'exit_time': a.ExitTime,
        } for a, c in attenances_with_car
    ]

    results = records + attenances
    return jsonify(results)