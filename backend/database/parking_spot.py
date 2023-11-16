from api import db

class ParkingSpot(db.model):
    parking_spot_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    area_id = db.Column(db.Integer, db.ForeignKey('area.area_id'), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean)
    priority = db.Column(db.String(255))
    