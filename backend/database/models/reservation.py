from api import db

class Reservation(db.Model):
    __tablename__ = 'Reservations'
    
    CarID = db.Column(db.Integer, db.ForeignKey('Cars.CarID'), nullable=False, primary_key=True)
    ParkingSpotID = db.Column(db.Integer, db.ForeignKey('ParkingSpots.ParkingSpotID'), nullable=False, primary_key=True)
    ReservationTime = db.Column(db.DateTime)
    ExpiredTime = db.Column(db.DateTime)

    # __table_args__ = (
    #     db.PrimaryKeyConstraint(['CarID'], ['ParkingSpotID'])
    # )

    def __init__(self, **kwargs):
        super(Reservation, self).__init__(**kwargs)