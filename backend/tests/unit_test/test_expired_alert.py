from unittest.mock import patch
from datetime import datetime, timedelta

from tests.unit_test.base import UnitTestSettingBase
from app.models import Attendance, ParkingSpot, Area, ParkingLot, Car

class CheckExpiredAlertAPI(UnitTestSettingBase):
    @patch('app.api.expired_alert_api.ParkingLot')
    @patch('app.api.expired_alert_api.Area')
    @patch('app.api.expired_alert_api.ParkingSpot')
    @patch('app.api.expired_alert_api.Car')
    @patch('app.api.expired_alert_api.Attendance')
    def test_get_expired_alert_successful(self,
                                          mock_attendance, 
                                          mock_car,
                                          mocK_parkingspot,
                                          mock_area,
                                          mock_parkinglot):
        response = self.client.get('/expired_alert')
        self.assert200(response)
        self.assertEqual(response.get_json(), [])

    @patch('app.api.expired_alert_api.ParkingLot')
    @patch('app.api.expired_alert_api.Area')
    @patch('app.api.expired_alert_api.ParkingSpot')
    @patch('app.api.expired_alert_api.Car')
    @patch('app.api.expired_alert_api.Attendance')
    def test_get_expired_alert_successful_with_list(self,
                                          mock_attendance, 
                                          mock_car,
                                          mocK_parkingspot,
                                          mock_area,
                                          mock_parkinglot):
        mock_attendance.query.all.return_value = [
            Attendance(CarID=1, ParkingSpotID=1, ParkTime=datetime.now() - timedelta(days=4)),
            Attendance(CarID=2, ParkingSpotID=2, ParkTime=datetime.now() - timedelta(days=2)),
            Attendance(CarID=3, ParkingSpotID=3, ParkTime=datetime.now() - timedelta(days=1)),
        ]
        mock_car.query.filter_by.return_value.first.side_effect = [
            Car(CarID=1, Lisence='test1'),
            Car(CarID=2, Lisence='test2'),
            Car(CarID=3, Lisence='test3'),
        ]
        mocK_parkingspot.query.filter_by.return_value.first.side_effect = [
            ParkingSpot(ParkingSpotID=1, Number=1),
            ParkingSpot(ParkingSpotID=2, Number=2),
            ParkingSpot(ParkingSpotID=3, Number=3),
        ]
        mock_area.query.filter_by.return_value.first.side_effect = [
            Area(AreaID=1, Name='test1', Floor=1),
            Area(AreaID=2, Name='test2', Floor=1),
            Area(AreaID=3, Name='test3', Floor=1),
        ]
        mock_parkinglot.query.filter_by.return_value.first.side_effect = [
            ParkingLot(ParkingLotID=1, Name='test1'),
            ParkingLot(ParkingLotID=2, Name='test2'),
            ParkingLot(ParkingLotID=3, Name='test3'),
        ]
        response = self.client.get('/expired_alert')
        self.assert200(response)
        self.assertEqual(len(response.get_json()), 1)


    