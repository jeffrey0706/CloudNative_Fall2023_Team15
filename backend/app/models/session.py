from app import db

class Session(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'SessionsDB'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(255), unique=True)
    data = db.Column(db.LargeBinary)
    expiry = db.Column(db.DateTime)