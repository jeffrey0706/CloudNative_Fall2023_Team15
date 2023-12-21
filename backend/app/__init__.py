from flask_sqlalchemy import SQLAlchemy
from flask_session import Session

db: SQLAlchemy = SQLAlchemy()
sess: Session = Session()