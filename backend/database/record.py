from api import db

class Record(db.Model):
    car_id = db.Column(db.Integer, db.ForeignKey('car.car_id'), nullable=False)
    parking_spot_id = db.Column(db.Integer, db.ForeignKey('parking_spot.parking_spot_id'), nullabe=False)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)