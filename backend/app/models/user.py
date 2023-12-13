from app import db

class User(db.Model):
    __tablename__ = 'Users'
    
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserName = db.Column(db.String(255), nullable=False)
    Password = db.Column(db.String(255), nullable=False)
    Salt = db.Column(db.String(255), nullable=False)
    HashedSaltedPassword = db.Column(db.String(255), nullable=False)
    Preference = db.Column(db.Integer, db.ForeignKey('Areas.AreaID'), nullable=False)
    Role = db.Column(db.String(255))
    Priority = db.Column(db.String(255))
    Expired = db.Column(db.DateTime, nullable=True)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)