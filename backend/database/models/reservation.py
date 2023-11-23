from api import db

class Reservation(db.Model):
    car_id = db.Column(db.Integer, db.ForeignKey('car.car_id'), nullable=False)
    parking_spot_id = db.Column(db.Integer, db.foreignKey('parking_spot.parking_spot_id'), nullable=False)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
