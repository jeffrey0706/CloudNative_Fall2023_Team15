from api import db

class Area(db.Model):
    area_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    parking_lot_id = db.Column(db.Integer, db.ForeignKey('parking_lot.parking_lot_id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    floor = db.Column(db.Integer)
    preference = db.Column(db.Integer)