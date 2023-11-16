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
    #TODO

@app.route('/parkinglot/<int:lot_id>', methods=['GET'])
def parking_spot(lot_id):
    #TODO

@app.route('/reservation', methods=['POST'])
def create_reservation():
    #TODO

@app.route('/reservation/<int:uuid>', methods=['DELETE', 'GET', 'POST'])
def reservation(uuid):
    if request.method == 'GET':
        #TODO
    elif request.method == 'DELETE':
        #TODO
    elif request.method == 'POST':
        #TODO   

@app.route('/mycar/<int:car_id>', methods=['GET'])
def cars(car_id):
    #TODO

@app.route('/user_status/<int: uuid>', methods=['GET'])
def user_status(uuid):
    #TODO

if __name__ == '__main__':
    app.run()