from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from datetime import datetime

from app.models import Reservation, Area, ParkingSpot, ParkingLot, Car
from app import db

reservation_bp = Blueprint('reservation', __name__)

def configure_reservation(app_conig):
    @reservation_bp.route('/reservation', methods=['POST'])
    def create_reservation():
        '''
        Request
            POST /reservation
            {
                car_id: int,
                parking_spot_id: int,
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

        reservation: Reservation = Reservation(
            CarID=data.get('car_id'),
            ParkingSpotID=data.get('parking_spot_id'),
            ReservationTime=datetime.now(),
            ExpiredTime=datetime.now() + app_conig.RESERVATION_TIME,
        )

        try:
            db.session.add(reservation)
            db.session.commit()

            reservation_id = f'({reservation.CarID}, {reservation.ParkingSpotID})'

            return jsonify({'reservation_id': reservation_id})
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'message': f'Failed to create new reservation, caused by {e.orig}'})  


    @reservation_bp.route('/reservation/<int:car_id>', methods=['DELETE', 'GET'])
    def reservation(car_id):
        '''
        // GET: /reservation/{car_id}
        {
            car_id: int,
            parking_spot_number: int,
            area_name: string,
            area_floor: int,
            parking_lot_name: string,
            reservation_time: datetime,
            expired_time: datetime, 
        }

        // DELETE: /reservation/{car_id}
        {
            message: string,
        }
        '''
        # Check if car_id exist
        car: Car = Car.query.filter_by(CarID=car_id).first()

        if not car:
            return jsonify({'message': 'Car not found'})

        if request.method == 'GET':
            reservation: Reservation = Reservation.query.filter_by(CarID=car_id).first()

            if reservation:

                parking_spot: ParkingSpot = ParkingSpot.query.filter_by(ParkingSpotID=reservation.ParkingSpotID).first()
                area: Area = Area.query.filter_by(AreaID=parking_spot.AreaID).first()
                parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=area.ParkingLotID).first()

                return jsonify({
                    'car_id': reservation.CarID,
                    'parking_spot_number': parking_spot.Number,
                    'area_name': area.Name,
                    'area_floor': area.Floor,
                    'parking_lot_name': parking_lot.Name,
                    'reservation_time': reservation.ReservationTime,
                    'expired_time': reservation.ExpiredTime,
                })
            else:
                return jsonify({'message': 'Reservation not found'})
        elif request.method == 'DELETE':
            reservation: Reservation = Reservation.query.filter_by(CarID=car_id).first()

            if reservation:
                try:
                    db.session.delete(reservation)
                    db.session.commit()

                    return jsonify({'message': 'Reservation deleted'})
                except IntegrityError as e:
                    db.session.rollback()
                    return jsonify({'message': f'Failed to delete reservation, caused by {e.orig}'})
            else:
                return jsonify({'message': 'Reservation not found'})
