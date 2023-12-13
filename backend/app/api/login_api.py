from flask import Blueprint, jsonify, request
import sqlalchemy
from sqlalchemy.exc import IntegrityError

from datetime import datetime
import hashlib

from app.models import User
from app import db

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    '''
    Request
        POST /reservation
        {
            user_name: str,
            password: str,
        }
    Response
        {
            user_id: int
        }
    '''
    data = request.get_json()

    if 'user_name' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: user_name'
        }), 400
    if 'password' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: password'
        }), 400

    user: User = User.query.filter_by(UserName=data.get('user_name')).one_or_none()
    if not user:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Invalid user name, user does not exist in database'
        }), 400
    
    hash = hashlib.sha512()
    hash.update(data.get('password').encode("utf-8") + user.Salt.encode("utf-8"))

    if hash.hexdigest() != user.HashedSaltedPassword:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Invalid password'
        }), 400
    
    return jsonify({'id': user.UserID})