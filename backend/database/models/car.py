from api import db

class Car(db.Model):
    __tablename__ = 'Cars'

    CarID = db.Column(db.Integer, primary_key=True, nullable=False)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID'), nullable=False)

    def __init__(self, **kwargs):
        super(Car, self).__init__(**kwargs)