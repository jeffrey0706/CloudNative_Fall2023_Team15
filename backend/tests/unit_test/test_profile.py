from unittest.mock import patch

from tests.unit_test.base import UnitTestSettingBase
from app.models import ParkingLot, Reservation, ParkingSpot, Area, Attendance, User

class CheckProfileAPI(UnitTestSettingBase):
    @patch('app.api.profile_api.User')
    def test_get_profile_no_user_error(self, 
                                       mock_user):
        mock_user.query.filter_by.return_value.one_or_none.return_value = None
        response = self.client.get('/profile/1')
        self.assert404(response, 'profile not found should return 404 error code')

    @patch('app.api.profile_api.ParkingLot')
    @patch('app.api.profile_api.Area')
    @patch('app.api.profile_api.User')
    def test_get_profile_successful(self, 
                                       mock_user,
                                       mock_area,
                                       mock_parkinglot):
        mock_user.query.filter_by.return_value.one_or_none.return_value = User(UserID=1, Preference=1, Role='Employee', Priority='Normal', Expired=None)
        mock_area.query.filter_by.return_value.one.return_value = Area(AreaID=1, ParkingLotID=1, Name='Test Area', Floor=1)
        mock_parkinglot.query.filter_by.return_value.one.return_value = ParkingLot(ParkingLotID=1, Name='Test Parkinglot', SpotCounts=10)
        
        response = self.client.get('/profile/1')
        self.assert200(response)
        result = response.get_json()
        expected_result = {
            'id': 1,
            'preference_lot_id': 1,
            'preference_lot_name': 'Test Parkinglot',
            'preference_area_id': 1,
            'preference_area_name': 'Test Area',
            'role': 'Employee',
            'priority': 'Normal',
            'expired': None,
        }
        self.assertEqual(result, expected_result)

    def test_put_profile_no_json_body_error(self):
        response = self.client.put('/profile/1')
        self.assertEqual(response.status_code, 415)

    @patch('app.api.profile_api.User')
    def test_put_profile_no_user_error(self, 
                                       mock_user):
        mock_user.query.filter_by.return_value.one_or_none.return_value = None
        response = self.client.put('/profile/1', json={})
        self.assert404(response, 'profile not found should return 404 error code')

    @patch('app.api.profile_api.User')
    def test_put_profile_time_format_error(self, 
                                       mock_user):
        mock_user.query.filter_by.return_value.one_or_none.return_value = User(UserID=1)
        response = self.client.put('/profile/1', json={'expired': '2023/12/01 23:59:59'})
        self.assert400(response, 'expired time should be in `%Y-%m-%d %H:%M:%S` format')

    @patch('app.api.profile_api.User')
    def test_put_profile_successful(self, 
                                       mock_user):
        mock_user.query.filter_by.return_value.one_or_none.return_value = User(UserID=1)
        response = self.client.put('/profile/1', json={
            'preference': 1,
            'expired': '2023-12-01 23:59:59',
            'role': 'Employee',
            'Priority': 'Normal'
            })
        self.assert200(response)
        result = response.get_json()

        self.assertIn('id', result)
        self.assertIn('preference', result)
        self.assertIn('role', result)
        self.assertIn('priority', result)
        self.assertIn('expired', result)


    def test_post_profile_time_format_error(self):
        response = self.client.post('/profile', json={
            'preference': 1,
            'expired': '2023/12/01 23:59:59',
            'role': 'Employee',
            'Priority': 'Normal'
            })
        self.assert400(response, 'expired time should be in `%Y-%m-%d %H:%M:%S` format')