from api import db

class User(db.model):
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    preference = db.Column(db.Integer, db.ForeignKey('area.area_id'), nullable=False)
    role = db.Column(db.String(255))
    priority = db.Column(db.String(255))
    expired = db.Column(db.DateTime)