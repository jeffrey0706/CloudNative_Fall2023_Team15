from flask_sqlalchemy import SQLAlchemy
from flask_testing import TestCase
from app import db
from app.utils import create_app
from app.models import *

class SettingBase(TestCase):
    def create_app(self):
        return create_app('testing')
    
    def setUp(self):
        db.create_all()
        
        create_mock_parking_lots(db)
        create_mock_areas(db)
        create_mock_parking_spots(db)
        create_mock_users(db)
        create_mock_cars(db)  

    def tearDown(self):
        db.session.remove()
        db.drop_all()


def create_mock_parking_lots(db: SQLAlchemy):
    parkinglots = [
        ParkingLot(Name='F1', SpotCounts=12),
        ParkingLot(Name='F2', SpotCounts=18),
        ParkingLot(Name='F3', SpotCounts=6),
    ]
    db.session.add_all(parkinglots)
    db.session.commit()

def create_mock_areas(db: SQLAlchemy):
    areas = [
        Area(ParkingLotID=1, Name='A', Floor=1),
        Area(ParkingLotID=1, Name='B', Floor=1),
        Area(ParkingLotID=2, Name='A', Floor=1),
        Area(ParkingLotID=2, Name='B', Floor=2),
        Area(ParkingLotID=2, Name='C', Floor=2),
        Area(ParkingLotID=3, Name='A', Floor=1),
    ]
    db.session.add_all(areas)
    db.session.commit()

def create_mock_parking_spots(db: SQLAlchemy):
    parking_spots = [
        ParkingSpot(AreaID=1, Number=1, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=1, Number=2, Available=0, Priority='General'),
        ParkingSpot(AreaID=1, Number=3, Available=1, Priority='General'),
        ParkingSpot(AreaID=1, Number=4, Available=0, Priority='General'),
        ParkingSpot(AreaID=1, Number=5, Available=1, Priority='General'),
        ParkingSpot(AreaID=1, Number=6, Available=0, Priority='General'),
        ParkingSpot(AreaID=2, Number=1, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=2, Number=2, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=2, Number=3, Available=0, Priority='General'),
        ParkingSpot(AreaID=2, Number=4, Available=1, Priority='General'),
        ParkingSpot(AreaID=2, Number=5, Available=1, Priority='General'),
        ParkingSpot(AreaID=2, Number=6, Available=1, Priority='General'),
        ParkingSpot(AreaID=3, Number=1, Available=0, Priority='Prority'),
        ParkingSpot(AreaID=3, Number=2, Available=0, Priority='Prority'),
        ParkingSpot(AreaID=3, Number=3, Available=0, Priority='General'),
        ParkingSpot(AreaID=3, Number=4, Available=0, Priority='General'),
        ParkingSpot(AreaID=3, Number=5, Available=0, Priority='General'),
        ParkingSpot(AreaID=3, Number=6, Available=0, Priority='General'),
        ParkingSpot(AreaID=4, Number=1, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=4, Number=2, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=4, Number=3, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=4, Number=4, Available=1, Priority='General'),
        ParkingSpot(AreaID=4, Number=5, Available=1, Priority='General'),
        ParkingSpot(AreaID=4, Number=6, Available=1, Priority='General'),
        ParkingSpot(AreaID=5, Number=1, Available=0, Priority='Prority'),
        ParkingSpot(AreaID=5, Number=2, Available=0, Priority='General'),
        ParkingSpot(AreaID=5, Number=3, Available=1, Priority='General'),
        ParkingSpot(AreaID=5, Number=4, Available=1, Priority='General'),
        ParkingSpot(AreaID=5, Number=5, Available=1, Priority='General'),
        ParkingSpot(AreaID=5, Number=6, Available=1, Priority='General'),
        ParkingSpot(AreaID=6, Number=1, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=6, Number=2, Available=1, Priority='Prority'),
        ParkingSpot(AreaID=6, Number=3, Available=0, Priority='General'),
        ParkingSpot(AreaID=6, Number=4, Available=1, Priority='General'),
        ParkingSpot(AreaID=6, Number=5, Available=1, Priority='General'),
        ParkingSpot(AreaID=6, Number=6, Available=0, Priority='General'),
    ]
    db.session.add_all(parking_spots)
    db.session.commit()

def create_mock_users(db: SQLAlchemy):
    users = [
        User(Preference=1, Role='Employee', Priority='Top'),
        User(Preference=1, Role='Employee', Priority='Normal'),
        User(Preference=2, Role='Attendant', Priority='Normal'),
    ]
    db.session.add_all(users)
    db.session.commit()

def create_mock_cars(db: SQLAlchemy):
    cars = [
        Car(UserID=1, Lisence='AGE-6277'),
        Car(UserID=2, Lisence='GFD-8542'),
    ]
    db.session.add_all(cars)
    db.session.commit()