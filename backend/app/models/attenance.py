from app import db

class Attendance(db.Model):
    __tablename__ = 'Attendances'
    
    CarID = db.Column(db.Integer, db.ForeignKey('Cars.CarID'), nullable=False, primary_key=True)
    ParkingSpotID = db.Column(db.Integer, db.ForeignKey('ParkingSpots.ParkingSpotID'), nullable=False, unique=True)
    ParkTime = db.Column(db.DateTime)
    ExitTime = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super(Attendance, self).__init__(**kwargs)