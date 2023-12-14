from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from datetime import datetime, timedelta

from app.models import Attendance, Car, Reservation, Area, ParkingSpot, ParkingLot
from app import db

expired_alert_bp = Blueprint('expired_alert', __name__)

Expired_time_threshold = timedelta(days=3)

@expired_alert_bp.route('/expired_alert', methods=['GET'])
def expired_alert():
    '''
    Request
        GET /expired_alert
    Response
        [
            {
                car_id: int,
                car_license: string,
                parking_spot_number: int,
                area_name: string,
                area_floor: int,
                parking_lot_name: string,
                park_time: datetime,
                TotalTime: timedelta,
            }
        ]
    '''
    attendances: Attendance = Attendance.query.all()
    expired_alerts = []

    for attendance in attendances:
        if datetime.now() - attendance.ParkTime > Expired_time_threshold:
            car: Car = Car.query.filter_by(CarID=attendance.CarID).first()
            parking_spot: ParkingSpot = ParkingSpot.query.filter_by(ParkingSpotID=attendance.ParkingSpotID).first()
            area: Area = Area.query.filter_by(AreaID=parking_spot.AreaID).first()
            parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=area.ParkingLotID).first()

            expired_alerts.append({
                'car_id': attendance.CarID,
                'car_license': car.Lisence,
                'parking_spot_number':  parking_spot.Number,
                'area_name': area.Name,
                'area_floor': area.Floor,
                'parking_lot_name': parking_lot.Name,
                'park_time': attendance.ParkTime,
                'TotalTime': datetime.now() - attendance.ParkTime,
            })

    return jsonify(expired_alerts)