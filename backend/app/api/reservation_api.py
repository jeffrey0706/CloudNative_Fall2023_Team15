from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
import datetime
from typing import List

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
            parking_lot_id: int,
        }
    Response
        {
            car_id: int,
            car_license: string,
            parking_spot_number: int,
            parking_spot_id: int,
            area_name: string,
            area_floor: int,
            parking_lot_name: string,
            reservation_time: datetime,
            expired_time: datetime, 
        }
    '''
    data = request.get_json()

    if 'car_id' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: car_id'
        }), 400
    if 'parking_lot_id' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: parking_lot_id'
        }), 400

    car_id = data.get('car_id')
    parking_lot_id = data.get('parking_lot_id')

    car: Car = Car.query.filter_by(CarID=car_id).first()
    if car is None:
        return jsonify({'message': 'Car not found'}), 404
    
    parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=parking_lot_id).first()
    if parking_lot is None:
        return jsonify({'message': 'Parking lot not found'}), 404
    
    areas: List[Area] = Area.query.filter_by(ParkingLotID=parking_lot_id).all()
    parking_spots: List[ParkingSpot] = ParkingSpot.query.filter(ParkingSpot.AreaID.in_([a.AreaID for a in areas])).all()
    reservations: List[Reservation] = Reservation.query.filter(Reservation.ParkingSpotID.in_([ps.ParkingSpotID for ps in parking_spots])).all()
    attendances: List[Attendance] = Attendance.query.filter(Attendance.ParkingSpotID.in_([ps.ParkingSpotID for ps in parking_spots])).all()

    areas = {a.AreaID: a for a in areas}
    reservations = {r.ParkingSpotID: r for r in reservations}
    attendances = {a.ParkingSpotID: a for a in attendances}

    # Check available parking spots
    available_spots = []
    for ps in parking_spots:
        if ps.ParkingSpotID in reservations or ps.ParkingSpotID in attendances:
            continue
        available_spots.append(ps)

    if len(available_spots) == 0:
        return jsonify({'message': 'No available parking spot'}), 409
    
    # Randomly choose a parking spot
    parking_spot = available_spots[0]

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

        return jsonify({
            'car_id': reservation.CarID,
            'car_license': car.Lisence,
            'parking_spot_number': parking_spot.Number,
            'parking_spot_id': parking_spot.ParkingSpotID,
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
        parking_spot_id: int,
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
                'parking_spot_id': parking_spot.ParkingSpotID,
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
