from unittest.mock import patch
from datetime import datetime

from tests.unit_test.base import UnitTestSettingBase
from app.models import Car, User, Reservation, Attendance

class TestUserStatusAPI(UnitTestSettingBase):
    @patch('app.api.user_status_api.User')
    def test_get_user_status_no_user_error(self,
                                           mock_user):
        mock_user.query.filter_by.return_value.first.return_value = None
        response = self.client.get('/user_status/1')
        self.assert404(response)

    @patch('app.api.user_status_api.Car')
    @patch('app.api.user_status_api.User')
    def test_get_user_status_successful_with_no_car(self,
                                           mock_user,
                                           mock_car):
        mock_user.query.filter_by.return_value.first.return_value = User()
        mock_car.query.filter_by.return_value.first.return_value = None
        response = self.client.get('/user_status/1')
        self.assert200(response)

    @patch('app.api.user_status_api.Attendance')
    @patch('app.api.user_status_api.Reservation')
    @patch('app.api.user_status_api.Car')
    @patch('app.api.user_status_api.User')
    def test_get_user_status_successful_with_none_status(self,
                                           mock_user,
                                           mock_car,
                                           mock_reservation,
                                           mock_attendance):
        mock_user.query.filter_by.return_value.first.return_value = User()
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_reservation.query.filter_by.return_value.first.return_value = None
        mock_attendance.query.filter_by.return_value.first.return_value = None
        response = self.client.get('/user_status/1')
        self.assert200(response)
        result = response.get_json()
        self.assertIn('status', result)
        self.assertEqual(result['status'], 0)

    @patch('app.api.user_status_api.datetime')
    @patch('app.api.user_status_api.Attendance')
    @patch('app.api.user_status_api.Reservation')
    @patch('app.api.user_status_api.Car')
    @patch('app.api.user_status_api.User')
    def test_get_user_status_successful_with_reserved_status(self,
                                           mock_user,
                                           mock_car,
                                           mock_reservation,
                                           mock_attendance,
                                           mock_datetime):
        mock_user.query.filter_by.return_value.first.return_value = User()
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_reservation.query.filter_by.return_value.first.return_value = Reservation(ExpiredTime=datetime(2023, 12, 12, 12, 5, 0))
        mock_attendance.query.filter_by.return_value.first.return_value = None
        mock_datetime.now.return_value = datetime(2023, 12, 12, 12, 0, 0)

        response = self.client.get('/user_status/1')
        self.assert200(response)
        result = response.get_json()
        self.assertIn('status', result)
        self.assertEqual(result['status'], 1)

    @patch('app.api.user_status_api.Attendance')
    @patch('app.api.user_status_api.Reservation')
    @patch('app.api.user_status_api.Car')
    @patch('app.api.user_status_api.User')
    def test_get_user_status_successful_with_parked_status(self,
                                           mock_user,
                                           mock_car,
                                           mock_reservation,
                                           mock_attendance):
        mock_user.query.filter_by.return_value.first.return_value = User()
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_reservation.query.filter_by.return_value.first.return_value = None
        mock_attendance.query.filter_by.return_value.first.return_value = Attendance()

        response = self.client.get('/user_status/1')
        self.assert200(response)
        result = response.get_json()
        self.assertIn('status', result)
        self.assertEqual(result['status'], 2)

    @patch('app.api.user_status_api.datetime')
    @patch('app.api.user_status_api.Attendance')
    @patch('app.api.user_status_api.Reservation')
    @patch('app.api.user_status_api.Car')
    @patch('app.api.user_status_api.User')
    def test_get_user_status_successful_with_expired_status(self,
                                           mock_user,
                                           mock_car,
                                           mock_reservation,
                                           mock_attendance,
                                           mock_datetime):
        mock_user.query.filter_by.return_value.first.return_value = User()
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_reservation.query.filter_by.return_value.first.return_value = Reservation(ExpiredTime=datetime(2023, 12, 12, 11, 55, 0))
        mock_attendance.query.filter_by.return_value.first.return_value = None
        mock_datetime.now.return_value = datetime(2023, 12, 12, 12, 0, 0)

        response = self.client.get('/user_status/1')
        self.assert200(response)
        result = response.get_json()
        self.assertIn('status', result)
        self.assertEqual(result['status'], 3)