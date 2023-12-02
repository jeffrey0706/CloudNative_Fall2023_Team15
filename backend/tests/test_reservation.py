import unittest
from tests.base import SettingBase

class CheckReservationAPI(SettingBase):
    def test_post_reservation(self):
        response = self.client.post('/reservation', 
                                    json={
                                        'car_id': 1,
                                        'parking_spot_id': 1
                                    })
        self.assert200(response, '`POST /reservation` endpoint is unavailable')

    # def test_get_reservation(self):
    #     response = self.client.get('/parkinglots')
    #     self.assert200(response, '/parkinglots endpoint is unavailable')

if __name__ == '__main__':
    unittest.main()