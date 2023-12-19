import copy
from flask import Blueprint, jsonify, session
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
                longitude: float,
                latitude: float,
                current_capacity: int,
                maximum_capacity: int,
                current_handicap_capacity: int,
                maximum_handicap_capacity: int,
            }
        ]

    #TODO address should be add into database
    '''
    all_parking_lots: List[ParkingLot] = ParkingLot.query.all()
    current_capacity = {p.ParkingLotID: p.SpotCounts for p in all_parking_lots}

    parking_spots: List[ParkingSpot] = ParkingSpot.query.all()
    areas: List[Area] = Area.query.filter(Area.AreaID.in_([ps.AreaID for ps in parking_spots])).all()
    maximum_handicap_capacity = {p.ParkingLotID: 0 for p in all_parking_lots}
    for parking_spot, area in zip(parking_spots, areas):
        if parking_spot.Priority != 'Normal':
            maximum_handicap_capacity[area.ParkingLotID] += 1
    current_handicap_capacity = copy.deepcopy(maximum_handicap_capacity)
    
    # query current reservation and compute current capacity
    reservations: List[Reservation] = Reservation.query.all()
    parking_spot_ids = [r.ParkingSpotID for r in reservations]
    parking_spots: List[parking_spot] = ParkingSpot.query.filter(ParkingSpot.ParkingSpotID.in_(parking_spot_ids)).all()
    area_ids = [p.AreaID for p in parking_spots]
    areas: List[Area] = Area.query.filter(Area.AreaID.in_(area_ids)).all()
    for parking_spot, area in zip(parking_spots, areas):
        current_capacity[area.ParkingLotID] -= 1
        if parking_spot.Priority != 'Normal':
            current_handicap_capacity[area.ParkingLotID] -= 1

    # query current attendance and compute current capacity
    attendances: List[Attendance] = Attendance.query.all()
    parking_spot_ids = [r.ParkingSpotID for r in attendances]
    parking_spots: List[ParkingSpot] = ParkingSpot.query.filter(ParkingSpot.ParkingSpotID.in_(parking_spot_ids)).all()
    area_ids = [p.AreaID for p in parking_spots]
    areas: List[Area] = Area.query.filter(Area.AreaID.in_(area_ids)).all()
    for parking_spot, area in zip(parking_spots, areas):
        current_capacity[area.ParkingLotID] -= 1
        if parking_spot.Priority != 'Normal':
            current_handicap_capacity[area.ParkingLotID] -= 1

    results = []
    for parking_lot in all_parking_lots:
        status = {
            'parkinglot_id': parking_lot.ParkingLotID,
            'name': parking_lot.Name,
            'longitude': parking_lot.Longitude,
            'latitude': parking_lot.Latitude,
            'current_capacity': current_capacity[parking_lot.ParkingLotID],
            'maximum_capacity': parking_lot.SpotCounts,
            'current_handicap_capacity': current_handicap_capacity[parking_lot.ParkingLotID],
            'maximum_handicap_capacity': maximum_handicap_capacity[parking_lot.ParkingLotID]
        }
        results.append(status)

    return jsonify(results)