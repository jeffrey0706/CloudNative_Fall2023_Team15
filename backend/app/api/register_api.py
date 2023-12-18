from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from datetime import datetime
import hashlib
import random
import string

from app.models import User
from app import db

register_bp = Blueprint('register', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    '''
    Request
        POST /register
        {
            username: str,
            password: str,
            preference: int,
            role: str,
            priority: str
        }
    Response
        {
            user_id: int
        }
    '''
    data = request.get_json()

    if 'username' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: user_name'
        }), 400
    if 'password' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: password'
        }), 400
    if 'preference' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: preference'
        }), 400
    if 'role' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: role'
        }), 400
    if 'priority' not in data:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Missing required parameter: priority'
        }), 400
    
    if len(User.query.filter_by(UserName=data.get('username')).all()) != 0:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Invalid username, user already exists in database'
        }), 400
    
    salt = ''.join([random.choice(string.ascii_letters + string.digits + string.punctuation) for n in range(6)])

    hash = hashlib.sha512()
    hash.update(data.get('password').encode("utf-8") + salt.encode("utf-8"))

    current_time = datetime.now()
    expired_time = current_time.replace(year=current_time.year + 10)

    user: User = User(
        UserName=data.get('username'),
        Password=data.get('password'),
        Salt=salt,
        HashedSaltedPassword=hash.hexdigest(),
        Preference=data.get('preference'),
        Role=data.get('role'),
        Priority=data.get('priority'),
        Expired=expired_time
    )

    try:
        db.session.add(user)
        db.session.commit()

        return jsonify({'user_id': user.UserID})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to register a new user, caused by {e.orig}'}), 503