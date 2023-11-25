from api import db

class Area(db.Model):
    __tablename__ = 'Areas'
    AreaID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ParkingLotID = db.Column(db.Integer, db.ForeignKey('parking_lot.ParkingLotID'), nullable=False)
    Name = db.Column(db.String(255), nullable=False)
    floor = db.Column(db.Integer)
    preference = db.Column(db.Integer)

    def __init__(self, **kwargs):
        super(Area, self).__init__(**kwargs)