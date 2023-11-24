from api import db

class User(db.Model):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True, nullable=False)
    Preference = db.Column(db.Integer, db.ForeignKey('Areas.AreaID'), nullable=False)
    Role = db.Column(db.String(255))
    Priority = db.Column(db.String(255))
    Expired = db.Column(db.DateTime, nullable=True)