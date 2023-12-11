from unittest.mock import patch

from tests.unit_test.base import UnitTestSettingBase
from app.models import ParkingLot, Reservation, ParkingSpot, Area, Attendance

class CheckParkingLotAPI(UnitTestSettingBase):
    @patch('app.api.parkinglot_api.Attendance')
    @patch('app.api.parkinglot_api.Area')
    @patch('app.api.parkinglot_api.ParkingSpot')
    @patch('app.api.parkinglot_api.Reservation')
    @patch('app.api.parkinglot_api.ParkingLot')
    def test_get_parkinglots(self,
                             mock_parkinglot,
                             mock_reservation,
                             mock_parkingspot,
                             mock_area,
                             mock_attendance):
        mock_parkinglot.query.all.return_value = [ParkingLot(ParkingLotID=1, Name='Test', SpotCounts=10)]
        mock_reservation.query.return_value.all.return_value = [Reservation(ParkingSpotID=1)]
        mock_parkingspot.query.filter.return_value.all.return_value = [ParkingSpot(AreaID=1)]
        # use side effect to assign two different return value for each call
        mock_area.query.filter.return_value.all.side_effect = [[Area(ParkingLotID=1)], [Area(ParkingLotID=1), Area(ParkingLotID=1)]]
        mock_attendance.query.return_value.all.return_value = [Attendance(ParkingSpotID=1)]

        response = self.client.get('/parkinglots')
        self.assert200(response)
        result = response.get_json()

        expected_result = [
            {
                'parkinglot_id': 1,
                'name': 'Test',
                'current_capacity': 7,
                'maximum_capacity': 10,
            }
        ]

        self.assertEqual(result, expected_result)


