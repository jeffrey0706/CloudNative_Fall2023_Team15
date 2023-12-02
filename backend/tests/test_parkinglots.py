import unittest
from tests.base import SettingBase

class CheckParkingLotAPI(SettingBase):
    def test_get_parkinglots(self):
        response = self.client.get('/parkinglots')
        self.assert200(response, '`GET /parkinglots` is unavailable')

if __name__ == '__main__':
    unittest.main()