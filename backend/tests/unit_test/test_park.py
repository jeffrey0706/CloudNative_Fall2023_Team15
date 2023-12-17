from unittest.mock import patch
import sqlalchemy

from tests.unit_test.base import UnitTestSettingBase
from app.models import Reservation

class CheckParkAPI(UnitTestSettingBase):
    def test_post_parked_no_json_body_error(self):
        response = self.client.post('/parked')
        self.assertEqual(response.status_code, 415)

    def test_post_parked_missing_car_id_error(self):
        response = self.client.post('/parked', json={})
        self.assert400(response)

    def test_post_parked_missing_parked_time_error(self):
        response = self.client.post('/parked', json={
            'car_id': 1
        })
        self.assert400(response)

    def test_post_parked_time_format_error(self):
        response = self.client.post('/parked', json={
            'car_id': 1,
            'parked_time': '2023/11/19 23:59:59'
        })
        self.assert400(response)

    def test_post_parked_wrong_type_error(self):
        response = self.client.post('/parked', json={
            'car_id': 'AGE-6277',
            'parked_time': '2023/11/19 23:59:59'
        })
        self.assert400(response)

    @patch('app.api.parked_api.Reservation')
    def test_post_parked_reservation_not_found_error(self, mock_reservation):
        mock_reservation.query.filter_by.return_value.one_or_none.return_value = None

        response = self.client.post('/parked', json={
            'car_id': 1,
            'parked_time': '2023-11-19 23:59:59'
        })
        self.assert404(response)

    @patch('app.api.parked_api.db')
    @patch('app.api.parked_api.Reservation')
    def test_post_parked_integrity_error(self, mock_reservation, mock_db):
        mock_reservation.query.filter_by.return_value.one_or_none.return_value = Reservation()
        mock_db.session.commit.side_effect = sqlalchemy.exc.IntegrityError(None, None, None)

        response = self.client.post('/parked', json={
            'car_id': 1,
            'parked_time': '2023-11-19 23:59:59'
        })
        self.assertEqual(response.status_code, 503)

    @patch('app.api.parked_api.db')
    @patch('app.api.parked_api.Reservation')
    def test_post_parked_successful(self, mock_reservation, mock_db):
        mock_reservation.query.filter_by.return_value.one_or_none.return_value = Reservation()
        mock_db.session.commit.return_value = None

        response = self.client.post('/parked', json={
            'car_id': 1,
            'parked_time': '2023-11-19 23:59:59'
        })
        self.assert200(response)