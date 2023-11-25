from flask import Flask, jsonify, request
import sqlalchemy
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from api import *
from database.models import *

app = Flask(__name__)
# SQLALCHEMY_DATABASE_URI -> user_name:password@host:port/db_name
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:iamgroot@127.0.0.1:3307/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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
    // GET: /parking_lot
    {
        id: int,
        name: string,
        spot_count: int,
    }
    '''
    parking_lots: parking_lots = ParkingLot.query.all()
    return jsonify([{
        'id': parking_lot.parking_lot,
        'name': parking_lot.name,
        'spot_count': parking_lot.spot_counts,
    } for parking_lot in parking_lots])

@app.route('/parkinglot/<int:lot_id>', methods=['GET'])
def parking_spot(lot_id):
    '''
    Get all parking spots in a parking lot?
    // GET: /parking_lot/<int:lot_id>
    {
        id: int,
        name: string,
        spot_count: int,
    }
    '''
    parking_lot: parking_lot = ParkingLot.query.get(lot_id)
    if parking_lot:
        return jsonify({
            'id': parking_lot.parking_lot,
            'name': parking_lot.name,
            'spot_count': parking_lot.spot_counts,
        })
    else:
        return jsonify({'message': 'Parking lot not found'})

@app.route('/reservation', methods=['POST'])
def create_reservation():
    '''
    POST /reservation
    {
        car_id: int,
        parking_spot_id: int,
    }
    '''
    data = request.get_json()

    reservation: Reservation = Reservation(
        CarID=data.get('car_id'),
        ParkingSpotID=data.get('parking_spot_id'),
        StartTime=datetime.now(),
        EndTIme=datetime.now() + RESERVATION_TIME,
    )

    try:
        db.session.add(reservation)
        db.session.commit()

        reservation_id = reservation.reservation_id

        return jsonify({'id': reservation_id})
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
    if request.method == 'GET':
        reservation: Reservation = Reservation.query.get(car_id)

        if reservation:

            parking_spot: ParkingSpot = ParkingSpot.query.get(reservation.ParkingSpotID)
            area: Area = Area.query.get(parking_spot.AreaID)
            parking_lot: ParkingLot = ParkingLot.query.get(area.ParkingLotID)

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
        reservation: Reservation = Reservation.query.get(car_id)

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


@app.route('/mycar/<int:car_id>', methods=['GET'])
def cars(car_id):
    '''
    // GET: /my_car/{user_id}
    {
        id: int,
        user_id: int,
    }
    '''
    car: Car = Car.query.get(car_id)
    if car:
        return jsonify({
            'id': car.car_id,
            'user_id': car.user_id,
        })
    else:
        return jsonify({'message': 'Car not found'})

@app.route('/user_status/<int:uuid>', methods=['GET'])
def user_status(uuid):
    '''
    // GET: /user_status/{user_id}
    {
        status: string, // NONE, RESERVED, PARKED, EXPIRED
    }
    '''
    car_id = Car.query.filter_by(user_id=uuid).first().car_id
    
    # Check reservation or record by car_id
    reservation = Reservation.query.filter_by(car_id=car_id).first()
    record = Record.query.filter_by(car_id=car_id).first()
    
    if reservation:
        if reservation.end_time < datetime.datetime.now():
            return jsonify({'status': 'EXPIRED'})
        else:
            return jsonify({'status': 'RESERVED'})
    elif record:
        if record.end_time < datetime.datetime.now():
            return jsonify({'status': 'EXPIRED'})
        else:
            return jsonify({'status': 'PARKED'})
    else:
        return jsonify({'status': 'NONE'})

if __name__ == '__main__':
    db.init_app(app)
    app.run()