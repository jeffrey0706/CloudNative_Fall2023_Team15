import unittest
from tests.functional_test.base import FunctionalTestSettingBase

class CheckReservationAPI(FunctionalTestSettingBase):
    def test_post_reservation(self):
        response = self.client.post('/reservation', 
                                    json={
                                        'car_id': 1,
                                        'parking_spot_id': 1
                                    })
        self.assert200(response, '`POST /reservation` endpoint is unavailable')

    def test_post_reservation_not_json(self):
        response = self.client.post('/reservation')
        self.assert_status(response, 415, f'`POST /reservation` method is required to be application/json')

    def test_get_reservation(self):
        car_id = 1
        spot_id = 1
        response = self.client.post('/reservation',
                                    json={
                                        'car_id': car_id,
                                        'parking_spot_id': spot_id
                                    })
        self.assert200(response, '`POST /reservation` endpoint is unavailable')
        response = self.client.get(f'/reservation/{car_id}')
        self.assert200(response, f'`GET /reservation` endpoint is unavailable')

    def test_get_reservation_car_not_found(self):
        car_id = 3
        spot_id = 1
        response = self.client.get('/reservation')

if __name__ == '__main__':
    unittest.main()