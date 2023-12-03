from flask import Flask
from flask import jsonify, request
import sqlalchemy
from sqlalchemy.exc import IntegrityError

from datetime import datetime
from typing import List

from app.config import config
from app.models import *
from app import db

def create_app(config_name='testing'):
    conf = config[config_name]

    app = Flask(__name__)
    app.config.from_object(conf)

    @app.route('/profile/<int:uuid>', methods=['POST', 'GET', 'PUT'])
    def profile(uuid):
        if request.method == 'GET':
            try:
                user: User = User.query.filter_by(UserID=uuid).one_or_none()

                if user:
                    return jsonify({
                        'id': user.UserID,
                        'preference': user.Preference,
                        'role': user.Role,
                        'priority': user.Priority,
                        'expired': user.Expired,
                    })
                else:
                    return jsonify({'message': 'Profile not found'})
            except sqlalchemy.orm.exc.MultipleResultsFound:
                return jsonify({'message': 'duplicate uuid, please check database'})
            
        elif request.method == 'PUT':
            data = request.get_json()
            
            try:
                user: User = User.query.filter_by(UserID=uuid).one_or_none()

                if user:
                    user.Preference = data.get('preference', user.Preference)
                    user.Role = data.get('role', user.Role)
                    user.Priority = data.get('priority', user.Priority)
                    # user.Expired = data.get('expired', user.Expired)
                    if 'expired' in data:
                        user.Expired = datetime.strptime(data['expired'], '%Y-%m-%d %H:%M:%S')

                    db.session.commit()

                    return jsonify({
                        'id': user.UserID,
                        'preference': user.Preference,
                        'role': user.Role,
                        'priority': user.Priority,
                        'expired': user.Expired,
                    })
                else :
                    return jsonify({'message': 'Profile not found'})
            except sqlalchemy.orm.exc.MultipleResultsFound:
                return jsonify({'message': 'duplicate uuid, please check database'})
            except (ValueError, TypeError):
                return jsonify({'message': 'expired time should be in `%Y-%m-%d %H:%M:%S` format'})
            
        elif request.method == 'POST':
            data = request.get_json()

            try:
                user: User = User(
                    UserID=uuid,
                    Preference=data.get('preference'),
                    Role=data.get('role'),
                    Priority=data.get('priority'),
                )
                if 'expired' in data:
                    user.Expired = datetime.strptime(data['expired'], '%Y-%m-%d %H:%M:%S')

                db.session.add(user)
                db.session.commit()

                return jsonify({'id': user.UserID})
            except IntegrityError as e:
                # print(e.orig)
                db.session.rollback()
                return jsonify({'message': f'Failed to create new profile, caused by {e.orig}'})
            except (ValueError, TypeError) as e:
                # print(e)
                return jsonify({'message': 'expired time should be in `%Y-%m-%d %H:%M:%S` format'})


    @app.route('/parkinglots', methods=['GET'])
    def parking_lots():
        '''
        Request
            GET: /parkinglots
        Response
            [
                {
                    parkinglot_id: int,
                    name: string,
                    current_capacity: int,
                    maximum_capacity: int,
                }
            ]

        TODO handicap, coordinate and address should be add into database
        '''
        all_parking_lots: List[ParkingLot] = ParkingLot.query.all()
        current_capacity = {p.ParkingLotID: 0 for p in all_parking_lots}

        # query current reservation and compute current capacity
        reservations: List[Reservation] = Reservation.query.all()
        parking_spot_ids = [r.ParkingSpotID for r in reservations]
        parking_spot: List[parking_spot] = ParkingSpot.query.filter(ParkingSpot.ParkingSpotID.in_(parking_spot_ids)).all()
        area_ids = [p.AreaID for p in parking_spot]
        areas: List[Area] = Area.query.filter(Area.AreaID.in_(area_ids)).all()
        parking_lot_ids = [a.ParkingLotID for a in areas]
        for ids in parking_lot_ids:
            current_capacity[ids] += 1

        # query current attendance and compute current capacity
        attendances: List[Attendance] = Attendance.query.all()
        parking_spot_ids = [r.ParkingSpotID for r in attendances]
        parking_spot: List[parking_spot] = ParkingSpot.query.filter(ParkingSpot.ParkingSpotID.in_(parking_spot_ids)).all()
        area_ids = [p.AreaID for p in parking_spot]
        areas: List[Area] = Area.query.filter(Area.AreaID.in_(area_ids)).all()
        parking_lot_ids = [a.ParkingLotID for a in areas]
        for ids in parking_lot_ids:
            current_capacity[ids] += 1

        results = []
        for parking_lot in all_parking_lots:
            status = {
                'parkinglot_id': parking_lot.ParkingLotID,
                'name': parking_lot.Name,
                'current_capacity': parking_lot.SpotCounts - current_capacity[parking_lot.ParkingLotID],
                'maximum_capacity': parking_lot.SpotCounts,
            }
            results.append(status)

        return results

    @app.route('/reservation', methods=['POST'])
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
            ExpiredTime=datetime.now() + conf.RESERVATION_TIME,
        )

        try:
            db.session.add(reservation)
            db.session.commit()

            reservation_id = f'({reservation.CarID}, {reservation.ParkingSpotID})'

            return jsonify({'reservation_id': reservation_id})
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'message': f'Failed to create new reservation, caused by {e.orig}'})  


    @app.route('/reservation/<int:car_id>', methods=['DELETE', 'GET'])
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


    @app.route('/mycar/<int:user_id>', methods=['GET'])
    def cars(user_id):
        '''
        // GET: /mycar/{user_id}
        {
            car_id: int,
            parking_spot_number: int,
            area_name: string,
            area_floor: int,
            parking_lot_name: string,
            start_time: datetime,
        }
        '''
        if not User.query.filter_by(UserID=user_id).first():
            return jsonify({'message': 'User not found'})

        car = Car.query.filter_by(UserID=user_id).first()
        if not car:
            return jsonify({'message': 'This user does not have a car'})
        car_id = car.CarID

        attendance: Attendance = Attendance.query.filter_by(CarID=car_id).first()
        if attendance:
            parking_spot: ParkingSpot = ParkingSpot.query.filter_by(ParkingSpotID=attendance.ParkingSpotID).first()
            area: Area = Area.query.filter_by(AreaID=parking_spot.AreaID).first()
            parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=area.ParkingLotID).first()
            return jsonify({
                'car_id': attendance.CarID,
                'parking_spot_number': parking_spot.Number,
                'area_name': area.Name,
                'area_floor': area.Floor,
                'parking_lot_name': parking_lot.Name,
                'start_time': attendance.ParkTime,
            })
        else:
            return jsonify({'message': 'Car not parked'})

    @app.route('/user_status/<int:uuid>', methods=['GET'])
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
            return jsonify({'message': 'User not found'})

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
        
    @app.route('/history/<int:spot_id>', methods=['GET'])
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
                return jsonify({'message': 'spot id does not exist'})

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

            attenances: List[Attendance] = Attendance.query.filter_by(ParkingSpotID=spot_id).all()
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
            return jsonify({'message': 'length of cars is not same as length records'})

    db.init_app(app)

    return app