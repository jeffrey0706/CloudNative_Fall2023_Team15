from unittest.mock import patch

from tests.unit_test.base import UnitTestSettingBase
from app.models import Car, ParkingSpot, Record

class TestSpotHistoryAPI(UnitTestSettingBase):
    @patch('app.api.spot_history_api.ParkingSpot')
    def test_get_spot_history_no_parkingspot_error(self,
                                            mock_parkingspot):
        mock_parkingspot.query.get.return_value = None
        response = self.client.get('/history/1')
        self.assert404(response)

    @patch('app.api.spot_history_api.Car')
    @patch('app.api.spot_history_api.Record')
    @patch('app.api.spot_history_api.ParkingSpot')
    def test_get_spot_history_record_assertion_error(self,
                                            mock_parkingspot,
                                            mock_record,
                                            mock_car):
        mock_parkingspot.query.get.return_value = ParkingSpot()
        mock_record.query.filter_by.return_value.all.return_value = [Record(), Record()]
        mock_car.query.filter_by.return_value.all.return_value = [Car(), Car(), Car()]
        response = self.client.get('/history/1')
        self.assertEqual(response.status_code, 503)