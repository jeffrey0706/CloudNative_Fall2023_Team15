from flask import Blueprint, jsonify
from typing import List

from app.models import ParkingLot, Reservation, Area, Attendance, ParkingSpot

parkinglot_bp = Blueprint('parkinglot', __name__)

@parkinglot_bp.route('/parkinglots', methods=['GET'])
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

    return jsonify(results)