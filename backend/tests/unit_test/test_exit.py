from unittest.mock import patch
import sqlalchemy

from tests.unit_test.base import UnitTestSettingBase
from app.models import Attendance

class CheckExitAPI(UnitTestSettingBase):
    def test_delete_exited_no_json_body_error(self):
        response = self.client.delete('/exited')
        self.assertEqual(response.status_code, 415)

    def test_delete_exited_missing_car_id_error(self):
        response = self.client.delete('/exited', json={})
        self.assert400(response)

    def test_delete_exited_missing_exited_time_error(self):
        response = self.client.delete('/exited', json={
            'car_id': 1
        })
        self.assert400(response)

    def test_delete_exited_time_format_error(self):
        response = self.client.delete('/exited', json={
            'car_id': 1,
            'exit_time': '2023/11/19 23:59:59'
        })
        self.assert400(response)

    def test_delete_exited_wrong_type_error(self):
        response = self.client.delete('/exited', json={
            'car_id': 'AGE-6277',
            'exit_time': '2023/11/19 23:59:59'
        })
        self.assert400(response)

    @patch('app.api.exited_api.Attendance')
    def test_delete_exited_attendance_not_found_error(self, mock_attendance):
        mock_attendance.query.filter_by.return_value.one_or_none.return_value = None

        response = self.client.delete('/exited', json={
            'car_id': 1,
            'exit_time': '2023-11-19 23:59:59'
        })
        self.assert404(response)

    @patch('app.api.exited_api.db')
    @patch('app.api.exited_api.Attendance')
    def test_delete_exited_integrity_error(self, mock_attendance, mock_db):
        mock_attendance.query.filter_by.return_value.one_or_none.return_value = Attendance()
        mock_db.session.commit.side_effect = sqlalchemy.exc.IntegrityError(None, None, None)

        response = self.client.delete('/exited', json={
            'car_id': 1,
            'exit_time': '2023-11-19 23:59:59'
        })
        self.assertEqual(response.status_code, 503)

    @patch('app.api.exited_api.db')
    @patch('app.api.exited_api.Attendance')
    def test_delete_exited_successful(self, mock_attendance, mock_db):
        mock_attendance.query.filter_by.return_value.one_or_none.return_value = Attendance()
        mock_db.session.commit.return_value = None

        response = self.client.delete('/exited', json={
            'car_id': 1,
            'exit_time': '2023-11-19 23:59:59'
        })
        self.assert200(response)