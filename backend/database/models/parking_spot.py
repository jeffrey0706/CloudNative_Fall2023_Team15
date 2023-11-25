from api import db

class ParkingSpot(db.Model):
    __tablename__ = 'ParkingSpots'
    ParkingSpotID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    AreaID = db.Column(db.Integer, db.ForeignKey('Areas.AreaID'), nullable=False)
    Number = db.Column(db.Integer, nullable=False)
    Available = db.Column(db.Boolean)
    Priority = db.Column(db.String(255))

    def __init__(self, **kwargs):
        super(ParkingSpot, self).__init__(**kwargs)
    