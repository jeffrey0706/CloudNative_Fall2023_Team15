from flask import Blueprint, jsonify, request, session

import hashlib

from app.models import User, Car

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    '''
    Request
        POST /login
        {
            username: str,
            password: str,
        }
    Response
        {
            user_id: int,
            user_role: string,
            car_id: int,
        }
    '''
    data = request.get_json()

    if 'username' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: username'
        }), 400
    if 'password' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: password'
        }), 400

    user: User = User.query.filter_by(UserName=data.get('username')).one_or_none()
    if not user:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Invalid username, user does not exist in database'
        }), 400
    
    hash = hashlib.sha512()
    hash.update(data.get('password').encode("utf-8") + user.Salt.encode("utf-8"))

    if hash.hexdigest() != user.HashedSaltedPassword:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Invalid password'
        }), 400
    
    car: Car = Car.query.filter_by(UserID=user.UserID).first()
    
    return jsonify({
            'user_id': user.UserID, 
            'user_role': user.Role,
            'car_id': car.CarID if car else None
        })