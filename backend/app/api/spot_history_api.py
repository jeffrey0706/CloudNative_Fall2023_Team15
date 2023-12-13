from flask import Blueprint, jsonify

from typing import List

from app.models import ParkingSpot, Record, Car, Attendance, Appointment

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
    try:
        parking_spot: ParkingSpot = ParkingSpot.query.get(spot_id)
        
        if parking_spot is None:
            return jsonify({'message': 'spot id does not exist'}), 404

        results = []

        records: List[Record] = Record.query.filter_by(ParkingSpotID=spot_id).all()
        car_ids = [r.CarID for r in records]
        cars: List[Car] = Car.query.filter(Car.CarID.in_(car_ids)).all()

        assert len(cars) == len(records)

        records = [
            {
                'type': 'RECORD',
                'user_id': c.UserID,
                'license': c.Lisence,
                'start_time': r.ParkTime,
                'end_time': r.ExitTime,
            } for c, r in zip(cars, records)
        ]

        attenances: List[Appointment] = Appointment.query.filter(Appointment.ParkingSpotID==spot_id, Appointment.ParkTime!=None).all()
        car_ids = [r.CarID for r in attenances]
        cars: List[Car] = Car.query.filter(Car.CarID.in_(car_ids)).all()

        assert len(cars) == len(attenances)

        attenances = [
            {
                'type': 'ATTENDANCE',
                'user_id': c.UserID,
                'license': c.Lisence,
                'start_time': a.ParkTime,
                'end_time': a.ExitTime,
            } for c, a in zip(cars, attenances)
        ]

        results = records + attenances
        return jsonify(results)
    except AssertionError as e:
        return jsonify({'message': 'length of cars is not same as length records'}), 503