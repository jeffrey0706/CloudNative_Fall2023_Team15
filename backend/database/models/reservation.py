from api import db

class Reservation(db.Model):
    __tablename__ = 'Reservations'
    ReservationID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CarID = db.Column(db.Integer, db.ForeignKey('Cars.CarID'), nullable=False)
    ParkingSpotID = db.Column(db.Integer, db.ForeignKey('ParkingSpots.ParkingSpotID'), nullable=False)
    StartTime = db.Column(db.DateTime)
    EndTime = db.Column(db.DateTime)
