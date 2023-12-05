import unittest
from tests.functional_test.base import FunctionalTestSettingBase

class CheckParkingLotAPI(FunctionalTestSettingBase):
    def test_get_parkinglots(self):
        response = self.client.get('/parkinglots')
        self.assert200(response, '`GET /parkinglots` is unavailable')

if __name__ == '__main__':
    unittest.main()