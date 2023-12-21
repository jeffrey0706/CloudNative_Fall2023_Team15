from flask import Blueprint, jsonify, request
import sqlalchemy
from sqlalchemy.exc import IntegrityError

from datetime import datetime

from app.models import User, Area, ParkingLot
from app import db

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['POST'])
def create_profile():
    data = request.get_json()
    try:
        user: User = User(
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
        return jsonify({'message': f'Failed to create new profile, caused by {e.orig}'}), 503
    except (ValueError, TypeError) as e:
        return jsonify({'message': 'expired time should be in `%Y-%m-%d %H:%M:%S` format'}), 400

@profile_bp.route('/profile/<int:uuid>', methods=['POST', 'GET', 'PUT'])
def profile(uuid):
    if request.method == 'GET':
        try:
            user: User = User.query.filter_by(UserID=uuid).one_or_none()
            if user:
                area: Area = Area.query.filter_by(AreaID=user.Preference).one()
                parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=area.ParkingLotID).one()                    
                return jsonify({
                    'id': user.UserID,
                    'preference_lot_id': parking_lot.ParkingLotID,
                    'preference_lot_name': parking_lot.Name,
                    'preference_area_id': area.AreaID,
                    'preference_area_name': area.Name,
                    'role': user.Role,
                    'priority': user.Priority,
                    'expired': user.Expired,
                })
            else:
                return jsonify({'message': 'Profile not found'}), 404
        except sqlalchemy.orm.exc.MultipleResultsFound:
            return jsonify({'message': 'duplicate uuid, please check database'}), 503
        
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
                return jsonify({'message': 'Profile not found'}), 404
        except sqlalchemy.orm.exc.MultipleResultsFound:
            return jsonify({'message': 'duplicate uuid, please check database'}), 503
        except (ValueError, TypeError):
            return jsonify({'message': 'expired time should be in `%Y-%m-%d %H:%M:%S` format'}), 400       
