from app import db

class Record(db.Model):
    __tablename__ = 'Records'

    RecordID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CarID = db.Column(db.Integer, db.ForeignKey('Cars.CarID'), nullable=False)
    ParkingSpotID = db.Column(db.Integer, db.ForeignKey('ParkingSpots.ParkingSpotID'), nullable=False)
    ReservationTime = db.Column(db.DateTime)
    ExpiredTime = db.Column(db.DateTime)
    ParkTime = db.Column(db.DateTime)
    ExitTime = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super(Record, self).__init__(**kwargs)