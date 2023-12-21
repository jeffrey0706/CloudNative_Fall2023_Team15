from app import db

class ParkingLot(db.Model):
    __tablename__ = 'ParkingLots'
    
    ParkingLotID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(255))
    SpotCounts = db.Column(db.Integer)
    Longitude = db.Column(db.Float)
    Latitude = db.Column(db.Float)
    
    def __init__(self, **kwargs):
        super(ParkingLot, self).__init__(**kwargs)