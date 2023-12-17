from flask import Blueprint, jsonify, request

import datetime
from typing import List

from app.models import ParkingSpot, Record, Car, Attendance, Area

utility_bp = Blueprint('util', __name__)

@utility_bp.route('/utilities', methods=['GET'])
def utility():
    '''
    // GET: /utilities?parkinglot_id={parkinglot_id}&floor={floor}
    [
        {
            area_id: int,
            area_name: string,
            area_utilities: [float, float, ...] // indicate utilities of each hour in last 24 hours
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

    current_time = datetime.datetime.now()
    target_time = current_time - datetime.timedelta(days=1)

    areas: List[Area] = Area.query.filter_by(ParkingLotID=parkinglot_id, Floor=floor).all()
    parking_spots: List[ParkingSpot] = ParkingSpot.query.filter(ParkingSpot.AreaID.in_([a.AreaID for a in areas])).all()
    attendances: List[Attendance] = Attendance.query.filter(Attendance.ParkingSpotID.in_([ps.ParkingSpotID for ps in parking_spots])).all()
    records: List[Record] = Record.query.filter(Record.ParkingSpotID.in_([ps.ParkingSpotID for ps in parking_spots]), Record.ExitTime > target_time).all()

    parking_spots_dict = {ps.ParkingSpotID: [] for ps in parking_spots}

    for begin_time in range(target_time, current_time + datetime.timedelta(hours=1), datetime.timedelta(hours=1)):
        end_time = begin_time + datetime.timedelta(hours=1)
        attendances_in_range: List[Attendance] = [a for a in attendances if a.EnterTime >= begin_time and a.ExitTime < end_time]
        records_in_range: List[Record] = [r for r in records if r.EnterTime >= begin_time and r.ExitTime < end_time]
        
        history = {ps.ParkingSpotID: 0 for ps in parking_spots}
        for att in attendances_in_range:
            history[att.ParkingSpotID] = 1
        for rec in records_in_range:
            history[rec.ParkingSpotID] = 1

        for ps_id, state in history.items():
            parking_spots_dict[ps_id].append(state)

    result = []

    for area in areas:
        spots_in_area = [ps for ps in parking_spots if ps.AreaID == area.AreaID]
        spots_history = [parking_spots_dict[ps.ParkingSpotID] for ps in spots_in_area]
        area_info = {
            'area_id': area.AreaID,
            'area_name': area.Name,
            'area_utilities': [],
        }
        for i in range(24):
            area_utilities = 0
            for sh in spots_history:
                area_utilities += sh[i]
            area_utilities /= len(spots_history)
            area_info['area_utilities'].append(area_utilities)
        result.append(area_info)

    return jsonify(result)

