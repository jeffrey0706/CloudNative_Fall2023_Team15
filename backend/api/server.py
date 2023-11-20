from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

from database import *

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/profile/<int:uuid>', methods=['POST', 'GET', 'PUT'])
def profile(uuid):
    if request.method == 'GET':
        user: User = User.query.get(uuid)

        if user:
            return jsonify({
                'id': user.user_id,
                'preference': user.preference,
                'role': user.role,
                'priority': user.priority,
                'expired': user.expired,
            })
        else:
            return jsonify({'message': 'Profile not found'})
        
    elif request.method == 'PUT':
        data = request.get_json()

        user: User = User.query.get(uuid)

        if user:
            user.preference = data.get('preference', user.preference)
            user.role = data.get('role', user.role)
            user.priority = data.get('priority', user.priority)

            db.session.commit()

            return jsonify({
                'id': user.user_id,
                'preference': user.preference,
                'role': user.role,
                'priority': user.priority,
                'expired': user.expired,
            })
        else :
            return jsonify({'message': 'Profile not found'})
        
    elif request.method == 'POST':
        data = request.get_json()

        user: User = User(
            # TODO
            # default value set ?
            preference=data.get('preference'),
            role=data.get('role'),
            priority=data.get('priority'),
        )

        try:
            db.session.add(user)
            db.session.commit()

            user_id = user.user_id

            return jsonify({'id': user_id})
        except IntegrityError:
            db.session.rollback()
            return jsonify({'message': 'Failed to create new profile'})


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
    #TODO
    # Not sure what to do here
    pass

@app.route('/reservation/<int:uuid>', methods=['DELETE', 'GET', 'POST'])
def reservation(uuid):
    '''
    // GET: /reservation/{reservation_id}
    {
        car_id: int,
        parking_spot_id: int,
        start_time: timestamp,
        end_time: timestamp,
    }

    // DELETE: /reservation/{reservation_id}
    -> None

    // POST: /reservation
    // request
    {
        user_id: int, ?
        car_id: int,
        parking_spot_id: int, We need this?
    }
    // response
    {
        id: int,
    }
    '''
    if request.method == 'GET':
        reservation: Reservation = Reservation.query.get(uuid)

        if reservation:
            return jsonify({
                'car_id': reservation.car_id,
                'parking_spot_id': reservation.parking_spot_id,
                'start_time': reservation.start_time,
                'end_time': reservation.end_time,
            })
        else:
            return jsonify({'message': 'Reservation not found'})
    elif request.method == 'DELETE':
        reservation: Reservation = Reservation.query.get(uuid)

        if reservation:
            try:
                db.session.delete(reservation)
                db.session.commit()

                return jsonify({'message': 'Reservation deleted'})
            except IntegrityError:
                db.session.rollback()
                return jsonify({'message': 'Failed to delete reservation'})
        else:
            return jsonify({'message': 'Reservation not found'})
    elif request.method == 'POST':
        data = request.get_json()

        reservation: Reservation = Reservation(
            car_id=data.get('car_id'),
            parking_spot_id=data.get('parking_spot_id'),
            start_time=data.get('start_time'), # Backend or Frontend?
            end_time=data.get('end_time'),
        )

        try:
            db.session.add(reservation)
            db.session.commit()

            reservation_id = reservation.reservation_id

            return jsonify({'id': reservation_id})
        except IntegrityError:
            db.session.rollback()
            return jsonify({'message': 'Failed to create new reservation'})  

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

@app.route('/user_status/<int: uuid>', methods=['GET'])
def user_status(uuid):
    '''
    // GET: /user_status/{user_id}
    {
        status: string, // NONE, RESERVED, PARKED, EXPIRED
    }
    '''
    user: User = User.query.get(uuid)
    if user:
        return jsonify({
            'status': user.status,
        })
    else:
        return jsonify({'message': 'User not found'})

if __name__ == '__main__':
    app.run()