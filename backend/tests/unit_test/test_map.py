from unittest.mock import patch

from tests.unit_test.base import UnitTestSettingBase
from app.models import User, Car, Attendance, ParkingSpot, Area, ParkingLot, Reservation

class CheckMapAPI(UnitTestSettingBase):
    def test_get_map_missing_parameter_error(self):
        response = self.client.get('/map')
        self.assert400(response)
        response = self.client.get('/map', query_string={
            'parkinglot_id': 1,
        })
        self.assert400(response)
        response = self.client.get('/map', query_string={
            'floor': 1,
        })
        self.assert400(response)

    def test_get_map_wrong_type_error(self):

        response = self.client.get('/map', query_string={
            'parkinglot_id': 'test',
            'floor': 1,
        })
        self.assert400(response)
        response = self.client.get('/map', query_string={
            'parkinglot_id': 1,
            'floor': 'test',
        })
        self.assert400(response)
        response = self.client.get('/map', query_string={
            'parkinglot_id': 'test',
            'floor': 'test',
        })
        self.assert400(response)

    @patch('app.api.map_api.ParkingLot')
    def test_get_map_no_parkinglot_error(self,
                                         mock_parkinglot):
        mock_parkinglot.query.filter_by.return_value.one_or_none.return_value = None
        response = self.client.get('/map', query_string={
            'parkinglot_id': 1,
            'floor': 1,
        })
        self.assert404(response)

    @patch('app.api.map_api.Attendance')
    @patch('app.api.map_api.Reservation')
    @patch('app.api.map_api.ParkingSpot')
    @patch('app.api.map_api.Area')
    @patch('app.api.map_api.ParkingLot')
    def test_get_map_successful(self,
                                mock_parkinglot,
                                mock_area,
                                mock_parkingspot,
                                mock_reservation,
                                mock_attendance):
        mock_parkinglot.query.filter_by.return_value.one_or_none.return_value = ParkingLot(ParkingLotID=1)
        mock_area.query.filter_by.return_value.all.return_value = [
            Area(AreaID=1, ParkingLotID=1, Name='Test Area 1', Floor=1),
            Area(AreaID=2, ParkingLotID=1, Name='Test Area 2', Floor=1),
        ]
        mock_parkingspot.query.filter.return_value.all.return_value = [
            ParkingSpot(ParkingSpotID=1, AreaID=1, Number=10),
            ParkingSpot(ParkingSpotID=2, AreaID=1, Number=11),
            ParkingSpot(ParkingSpotID=3, AreaID=2, Number=8),
            ParkingSpot(ParkingSpotID=4, AreaID=2, Number=4),
        ]
        mock_reservation.query.filter.return_value.all.return_value = [
            Reservation(ParkingSpotID=1),
            Reservation(ParkingSpotID=3)
        ]
        mock_attendance.query.filter.return_value.all.return_value = [
            Attendance(ParkingSpotID=4)
        ]
        
        response = self.client.get('/map', query_string={
            'parkinglot_id': 1,
            'floor': 1,
        })
        self.assert200(response)

        result = response.get_json()
        expected_result = [
            {
                'spot_id': 1,
                'spot_number': 10,
                'area_id': 1,
                'area_name': 'Test Area 1',
                'status': 2
            },
            {
                'spot_id': 2,
                'spot_number': 11,
                'area_id': 1,
                'area_name': 'Test Area 1',
                'status': 0
            },
            {
                'spot_id': 3,
                'spot_number': 8,
                'area_id': 2,
                'area_name': 'Test Area 2',
                'status': 2
            },
            {
                'spot_id': 4,
                'spot_number': 4,
                'area_id': 2,
                'area_name': 'Test Area 2',
                'status': 3
            }
        ]
        self.assertEqual(result, expected_result)
