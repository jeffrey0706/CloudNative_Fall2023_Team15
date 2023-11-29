from app import db

class Attendance(db.Model):
    __tablename__ = 'Attendances'
    
    # ReservationID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CarID = db.Column(db.Integer, db.ForeignKey('Cars.CarID'), nullable=False, primary_key=True)
    ParkingSpotID = db.Column(db.Integer, db.ForeignKey('ParkingSpots.ParkingSpotID'), nullable=False, primary_key=True)
    ParkTime = db.Column(db.DateTime)
    ExitTime = db.Column(db.DateTime)

    # __table_args__ = (
    #     db.PrimaryKeyConstraint('CarID', 'ParkingSpotID')
    # )

    def __init__(self, **kwargs):
        super(Attendance, self).__init__(**kwargs)