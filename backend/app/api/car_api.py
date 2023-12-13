from flask import Blueprint, jsonify

from app.models import ParkingLot, Area, Attendance, ParkingSpot, Car, User, Appointment

car_bp = Blueprint('car', __name__)

@car_bp.route('/mycar/<int:user_id>', methods=['GET'])
def cars(user_id):
    '''
    // GET: /mycar/{user_id}
    {
        car_id: int,
        parking_spot_number: int,
        area_name: string,
        area_floor: int,
        parking_lot_name: string,
        start_time: datetime,
    }
    '''
    if not User.query.filter_by(UserID=user_id).first():
        return jsonify({'message': 'User not found'}), 404

    car = Car.query.filter_by(UserID=user_id).first()
    if not car:
        return jsonify({'message': 'This user does not have a car'}), 404
    car_id = car.CarID

    # attendance: Attendance = Attendance.query.filter_by(CarID=car_id).first()
    attendance: Appointment = Appointment.query.filter(Appointment.CarID==car_id, Appointment.ParkTime!=None).first()
    if attendance:
        parking_spot: ParkingSpot = ParkingSpot.query.filter_by(ParkingSpotID=attendance.ParkingSpotID).first()
        area: Area = Area.query.filter_by(AreaID=parking_spot.AreaID).first()
        parking_lot: ParkingLot = ParkingLot.query.filter_by(ParkingLotID=area.ParkingLotID).first()
        return jsonify({
            'car_id': attendance.CarID,
            'parking_spot_number': parking_spot.Number,
            'area_name': area.Name,
            'area_floor': area.Floor,
            'parking_lot_name': parking_lot.Name,
            'start_time': attendance.ParkTime,
        }), 200
    else:
        return jsonify({'message': 'Car not parked'}), 200