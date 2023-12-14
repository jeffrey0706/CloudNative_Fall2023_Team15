from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
import datetime

from app.models import Reservation, Area, ParkingSpot, ParkingLot, Car, Attendance
from app import db

reservation_bp = Blueprint('reservation', __name__)

RESERVATION_TIME = datetime.timedelta(minutes=15)

# def configure_reservation(app_conig):
@reservation_bp.route('/reservation', methods=['POST'])
def create_reservation():
    '''
    Request
        POST /reservation
        {
            car_id: int,
            car_license: string,
            parking_spot_number: int,
            area_name: string,
            area_floor: int,
            parking_lot_name: string,
            reservation_time: datetime,
            expired_time: datetime, 
        }
    Response
        {
            reservation_id: int
        }
    '''
    data = request.get_json()

    if 'car_id' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: car_id'
        }), 400
    if 'parking_spot_id' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: parking_spot_id'
        }), 400

    car: Car = Car.query.filter_by(CarID=data.get('car_id')).first()
    if car is None:
        return jsonify({'message': 'Car not found'}), 404
    
    parking_spot: ParkingSpot = ParkingSpot.query.filter_by(ParkingSpotID=data.get('parking_spot_id')).first()
    if parking_spot is None:
        return jsonify({'message': 'Parking spot not found'}), 404
    
    current_spot_reservation: Reservation = Reservation.query.filter_by(ParkingSpotID=data.get('parking_spot_id')).first()
    current_spot_attendance: Attendance = Attendance.query.filter_by(ParkingSpotID=data.get('parking_spot_id')).first()
    if current_spot_reservation or current_spot_attendance:
        return jsonify({'message': 'This parking spot is not available'}), 409

    current_car_reservation: Reservation = Reservation.query.filter_by(CarID=data.get('car_id')).first()
    current_car_attendance: Attendance = Attendance.query.filter_by(CarID=data.get('car_id')).first()
    if current_car_reservation or current_car_attendance:
        return jsonify({'message': 'This car has already reserved an spot or parked'}), 409

    reservation: Reservation = Reservation(
        CarID=data.get('car_id'),
        ParkingSpotID=data.get('parking_spot_id'),
        ReservationTime=datetime.datetime.now(),
        ExpiredTime=datetime.datetime.now() + RESERVATION_TIME,
    )

    try:
        db.session.add(reservation)
        db.session.commit()
        
        area: Area = Area.query.filter_by(AreaID=parking_spot.AreaID).first()
        parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=area.ParkingLotID).first()

        return jsonify({
            'car_id': reservation.CarID,
            'car_license': car.Lisence,
            'parking_spot_number': parking_spot.Number,
            'parking_lot_name': parking_lot.Name,
            'area_name': area.Name,
            'area_floor': area.Floor,
            'reservation_time': reservation.ReservationTime,
            'expired_time': reservation.ExpiredTime,
        })
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to create new reservation, caused by {e.orig}'}), 503 


@reservation_bp.route('/reservation/<int:car_id>', methods=['DELETE', 'GET'])
def reservation(car_id):
    '''
    // GET: /reservation/{car_id}
    {
        car_id: int,
        car_license: string,
        parking_spot_number: int,
        area_name: string,
        area_floor: int,
        parking_lot_name: string,
        reservation_time: datetime,
        expired_time: datetime, 
    }

    // DELETE: /reservation/{car_id}
    error code:
        404 means reservation not exist,
        504 means some error happend when accessing database
    {
        message: string,
    }
    '''
    # Check if car_id exist
    car: Car = Car.query.filter_by(CarID=car_id).first()

    if car is None:
        return jsonify({'message': 'Car not found'}), 404

    if request.method == 'GET':
        reservation: Reservation = Reservation.query.filter_by(CarID=car_id).first()

        if reservation:

            parking_spot: ParkingSpot = ParkingSpot.query.filter_by(ParkingSpotID=reservation.ParkingSpotID).first()
            area: Area = Area.query.filter_by(AreaID=parking_spot.AreaID).first()
            parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=area.ParkingLotID).first()

            return jsonify({
                'car_id': reservation.CarID,
                'car_license': car.Lisence,
                'parking_spot_number': parking_spot.Number,
                'area_name': area.Name,
                'area_floor': area.Floor,
                'parking_lot_name': parking_lot.Name,
                'reservation_time': reservation.ReservationTime,
                'expired_time': reservation.ExpiredTime,
            })
        else:
            return jsonify({'message': 'Reservation not found'}), 404
    elif request.method == 'DELETE':
        reservation: Reservation = Reservation.query.filter_by(CarID=car_id).first()

        if reservation:
            try:
                db.session.delete(reservation)
                db.session.commit()

                return jsonify({'message': 'Reservation deleted'})
            except IntegrityError as e:
                db.session.rollback()
                return jsonify({'message': f'Failed to delete reservation, caused by {e.orig}'}), 503
        else:
            return jsonify({'message': 'Reservation not found'}), 404
