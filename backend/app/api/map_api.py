from enum import IntEnum
from typing import List
from flask import Blueprint, jsonify, request

from app.models import ParkingLot, Area, Attendance, ParkingSpot, Car, User, Reservation

class SpotStatus(IntEnum):
    EMPTY = 0
    OCCUPIED = 1
    APPROACHING = 2
    PARKED = 3

map_bp = Blueprint('map', __name__)

@map_bp.route('/map', methods=['GET'])
def get_map():
    '''
    // GET /map?parkinglot_id=&floor=
    [
        {
            spot_id: int,
            spot_number: int,
            area_id: int
            area_name: string,
            status: int // EMPTY(0), OCCUPIED(1), APPROACHING(2), PARKED(3)
        }
    ]
    '''    
    parkinglot_id = request.args.get('parkinglot_id', None)
    floor = request.args.get('floor', None)

    if not parkinglot_id or not floor:
        return jsonify({'error': 'missing query parameter `parkinglot_id` and `floor`'}), 400

    try:
        parkinglot_id = int(parkinglot_id)
        floor = int(floor)
    except ValueError:
        return jsonify({'error': "Invalid 'parkinglot_id', 'floor' parameter, must be an integer"}), 400

    parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=parkinglot_id).one_or_none()
    if not parking_lot:
        return jsonify({'error': "parking lot not found"}), 404

    areas: List[Area] = Area.query.filter_by(ParkingLotID=parkinglot_id, Floor=floor).all()
    parking_spots: List[ParkingSpot] = ParkingSpot.query.filter(ParkingSpot.AreaID.in_([a.AreaID for a in areas])).all()
    reservations: List[Reservation] = Reservation.query.filter(Reservation.ParkingSpotID.in_([ps.ParkingSpotID for ps in parking_spots])).all()
    attendances: List[Attendance] = Attendance.query.filter(Attendance.ParkingSpotID.in_([ps.ParkingSpotID for ps in parking_spots])).all()

    areas = {a.AreaID: a for a in areas}
    reservations = {r.ParkingSpotID: r for r in reservations}
    attendances = {a.ParkingSpotID: a for a in attendances}

    results = []
    for ps in parking_spots:
        status = SpotStatus.EMPTY
        if ps.ParkingSpotID in reservations:
            status = SpotStatus.APPROACHING
        if ps.ParkingSpotID in attendances:
            status = SpotStatus.PARKED
        res = {
            'spot_id': ps.ParkingSpotID,
            'spot_number': ps.Number,
            'area_id': ps.AreaID,
            'area_name': areas[ps.AreaID].Name,
            'status': status
        }
        results.append(res)

    return jsonify(results)
