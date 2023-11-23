from api import db

class ParkingLot(db.Model):
    parking_lot_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    spot_counts = db.Column(db.Integer)