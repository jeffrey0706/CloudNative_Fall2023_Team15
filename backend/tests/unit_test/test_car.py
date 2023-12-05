import unittest
from unittest.mock import patch, MagicMock

from tests.unit_test.base import UnitTestSettingBase

class CarApiTestCase(UnitTestSettingBase):

    @patch('self.app.User.query.filter_by')
    @patch('self.app.Car.query.filter_by')
    @patch('self.app.Attendance.query.filter_by')
    @patch('self.app.ParkingSpot.query.filter_by')
    @patch('self.app.Area.query.filter_by')
    @patch('self.app.ParkingLot.query.filter_by')
    def test_get_car_info_successful(self, 
                                     mock_user_query, 
                                     mock_car_query, 
                                     mock_attendance_query,
                                     mock_parking_spot_query, 
                                     mock_area_query, 
                                     mock_parking_lot_query):
        # Mock the database queries
        mock_user_query.return_value.first.return_value = MagicMock(UserID=1)
        mock_car_query.return_value.first.return_value = MagicMock(UserID=1, CarID=1)
        mock_attendance_query.return_value.first.return_value = MagicMock(CarID=1, ParkingSpotID=1, ParkTime='2023-01-01 12:00:00')
        mock_parking_spot_query.return_value.first.return_value = MagicMock(Number=123, AreaID=1)
        mock_area_query.return_value.first.return_value = MagicMock(Name='Test Area', Floor=1, ParkingLotID=1)
        mock_parking_lot_query.return_value.first.return_value = MagicMock(Name='Test Parking Lot')

        # Perform a GET request to /mycar/1
        response = self.client.get('/mycar/1')

        # Check if the response is successful
        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        # Add assertions to verify the response data
        self.assertIn('car_id', data)
        self.assertIn('parking_spot_number', data)
        self.assertIn('area_name', data)
        self.assertIn('area_floor', data)
        self.assertIn('parking_lot_name', data)
        self.assertIn('start_time', data)

if __name__ == '__main__':
    unittest.main()