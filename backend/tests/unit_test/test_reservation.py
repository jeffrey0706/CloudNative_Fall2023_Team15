import datetime
from unittest.mock import patch
import sqlalchemy

from tests.unit_test.base import UnitTestSettingBase
from app.models import ParkingLot, Area, Car, Reservation, ParkingSpot, Attendance

class CheckReservationAPI(UnitTestSettingBase):
    @patch('app.api.reservation_api.Car')
    def test_get_reservation_no_car_error(self,
                                          mock_car):
        mock_car.query.filter_by.return_value.first.return_value = None
        response = self.client.get('/reservation/1')
        self.assert404(response, 'if there is no corresponding car, response should be 404 error')

    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.Car')
    def test_get_reservation_no_reservation_error(self,
                                                  mock_car,
                                                  mock_reservation):
        mock_car.query.filter_by.return_value.first.return_value = Car(CarID=1, Lisence='AGE-6277', UserID=1)
        mock_reservation.query.filter_by.return_value.first.return_value = None
        response = self.client.get('/reservation/1')
        self.assert404(response, 'if there is no corresponding reservation, response should be 404 error')

    @patch('app.api.reservation_api.ParkingLot')
    @patch('app.api.reservation_api.Area')
    @patch('app.api.reservation_api.ParkingSpot')
    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.Car')
    def test_get_reservation_successful(self,
                                        mock_car,
                                        mock_reservation,
                                        mock_parkingspot,
                                        mock_area,
                                        mock_parkinglot):
        mock_car.query.filter_by.return_value.first.return_value = Car(CarID=1, Lisence='AGE-6277', UserID=1)
        mock_reservation.query.filter_by.return_value.first.return_value = Reservation(CarID=1, ParkingSpotID=1, ReservationTime='2023-11-01 23:59:59', ExpiredTime='2023-11-02 23:59:59')
        mock_parkingspot.query.filter_by.return_value.first.return_value = ParkingSpot(ParkingSpotID=1, AreaID=2, Number=10, Available=True, Priority='Normal')
        mock_area.query.filter_by.return_value.first.return_value = Area(AreaID=2, ParkingLotID=3, Name='Test Area', Floor=2)
        mock_parkinglot.query.filter_by.return_value.first.return_value = ParkingLot(ParkingLotID=3, Name='Test ParkingLot', SpotCounts=20)

        response = self.client.get('/reservation/1')
        self.assert200(response)
        result = response.get_json()
        expected_result = {
            'car_id': 1,
            'car_license': 'AGE-6277',
            'parking_spot_number': 10,
            'parking_spot_id': 1,
            'area_name': 'Test Area',
            'area_floor': 2,
            'parking_lot_name': 'Test ParkingLot',
            'reservation_time': '2023-11-01 23:59:59',
            'expired_time': '2023-11-02 23:59:59',
        }
        self.assertEqual(result, expected_result)

    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.Car')
    def test_delete_reservation_no_reservation_error(self,
                                                  mock_car,
                                                  mock_reservation):
        mock_car.query.filter_by.return_value.first.return_value = Car(CarID=1, Lisence='AGE-6277', UserID=1)
        mock_reservation.query.filter_by.return_value.first.return_value = None
        response = self.client.get('/reservation/1')
        self.assert404(response, 'if there is no corresponding reservation, response should be 404 error')

    @patch('app.api.reservation_api.db')
    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.Car')
    def test_delete_reservation_no_reservation_error(self,
                                                  mock_car,
                                                  mock_reservation,
                                                  mock_db):
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_reservation.query.filter_by.return_value.first.return_value = Reservation()
        mock_db.session.commit.side_effect = sqlalchemy.exc.IntegrityError(None, None, None)
        response = self.client.delete('/reservation/1')
        self.assertEqual(response.status_code, 503)

    @patch('app.api.reservation_api.db')
    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.Car')
    def test_delete_reservation_successful(self,
                                                  mock_car,
                                                  mock_reservation,
                                                  mock_db):
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_reservation.query.filter_by.return_value.first.return_value = Reservation()
        mock_db.session.commit.return_value = None
        response = self.client.delete('/reservation/1')
        self.assert200(response)

    def test_post_reservation_no_json_body_error(self):
        response = self.client.post('/reservation')
        self.assertEqual(response.status_code, 415)

    def test_post_reservation_missing_car_id_error(self):
        response = self.client.post('/reservation', json={})
        self.assert400(response)

    def test_post_reservation_missing_parkingspot_id_error(self):
        response = self.client.post('/reservation', json={
            'car_id': 1,
        })
        self.assert400(response)

    @patch('app.api.reservation_api.Car')
    def test_post_reservation_car_not_found_error(self, mock_car):
        mock_car.query.filter_by.return_value.first.return_value = None
        response = self.client.post('/reservation', json={
            'car_id': 1,
            'parking_lot_id': 1,
        })
        self.assert404(response)

    @patch('app.api.reservation_api.ParkingLot')
    @patch('app.api.reservation_api.Car')
    def test_post_reservation_parkinglot_not_found_error(self, mock_car, mock_parkinglot):
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_parkinglot.query.filter_by.return_value.first.return_value = None
        response = self.client.post('/reservation', json={
            'car_id': 1,
            'parking_lot_id': 1,
        })
        self.assert404(response)

    @patch('app.api.reservation_api.Attendance')
    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.ParkingLot')
    @patch('app.api.reservation_api.Car')
    @patch('app.api.reservation_api.ParkingSpot')
    @patch('app.api.reservation_api.Area')
    def test_post_reservation_no_available_spot_error(self, 
                                                          mock_car, 
                                                          mock_parkinglot,
                                                          mock_area,
                                                          mock_parkingspot,
                                                          mock_reservation,
                                                          mock_attendance):
        mock_car.query.filter_by.return_value.first.return_value = Car()
        mock_parkinglot.query.filter_by.return_value.first.return_value = ParkingLot()
        mock_area.query.filter_by.return_value.all.return_value = [Area(AreaID=1, Name='Test Area', Floor=2, ParkingLotID=1)]
        mock_parkingspot.query.filter.return_value.all.return_value = [ParkingSpot(ParkingSpotID=1, AreaID=1), ParkingSpot(ParkingSpotID=2, AreaID=1)]
        mock_reservation.query.filter.all.return_value = [Reservation(ParkingSpotID=1)]
        mock_attendance.query.filter.all.return_value = [Attendance(ParkingSpotID=2)]

        response = self.client.post('/reservation', json={
            'car_id': 1,
            'parking_lot_id': 1,
        })
        self.assertEqual(response.status_code, 409)

    @patch('app.api.reservation_api.db')
    @patch('app.api.reservation_api.Attendance')
    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.ParkingSpot')
    @patch('app.api.reservation_api.Area')
    @patch('app.api.reservation_api.ParkingLot')
    @patch('app.api.reservation_api.Car')
    def test_post_reservation_integrity_error(self,
                                                mock_car, 
                                                mock_parkinglot,
                                                mock_area,
                                                mock_parkingspot,
                                                mock_reservation,
                                                mock_attendance,
                                                mock_db):
        mock_car.query.filter_by.return_value.first.return_value = Car(CarID=1, Lisence='AGE-6277')
        mock_parkinglot.query.filter_by.return_value.first.return_value = ParkingLot(ParkingLotID=1, Name='Test ParkingLot')
        mock_area.query.filter_by.return_value.all.return_value = [Area(AreaID=1, Name='Test Area', Floor=2, ParkingLotID=1)]
        mock_parkingspot.query.filter.return_value.all.return_value = [ParkingSpot(ParkingSpotID=1, Number=2, AreaID=1)]
        mock_reservation.query.filter.all.return_value = []
        mock_attendance.query.filter.all.return_value = []
        mock_area.query.filter_by.return_value.first.return_value = Area(AreaID=1, Name='Test Area', Floor=2, ParkingLotID=1)
        mock_reservation.return_value = Reservation(CarID=1, ParkingSpotID=1, ReservationTime='2023-11-01 23:59:59', ExpiredTime='2023-11-02 23:59:59')
        mock_db.session.commit.side_effect = sqlalchemy.exc.IntegrityError(None, None, None)
        response = self.client.post('/reservation', json={
            'car_id': 1,
            'parking_lot_id': 1,
        })
        self.assertEqual(response.status_code, 503)

    @patch('app.api.reservation_api.ParkingLot')
    @patch('app.api.reservation_api.Area')
    @patch('app.api.reservation_api.db')
    @patch('app.api.reservation_api.Attendance')
    @patch('app.api.reservation_api.Reservation')
    @patch('app.api.reservation_api.ParkingSpot')
    @patch('app.api.reservation_api.Car')
    def test_post_reservation_successful(self,
                                            mock_car, 
                                            mock_parkingspot,
                                            mock_reservation,
                                            mock_attendance,
                                            _mock_db,
                                            mock_area,
                                            mock_parkinglot):
        mock_car.query.filter_by.return_value.first.return_value = Car(CarID=1, Lisence='AGE-6277')
        mock_parkinglot.query.filter_by.return_value.first.return_value = ParkingLot(ParkingLotID=1, Name='Test ParkingLot')
        mock_area.query.filter_by.return_value.all.return_value = [Area(AreaID=1, Name='Test Area', Floor=2, ParkingLotID=1)]
        mock_parkingspot.query.filter.return_value.all.return_value = [ParkingSpot(ParkingSpotID=1, Number=2, AreaID=1)]
        mock_reservation.query.filter.all.return_value = []
        mock_attendance.query.filter.all.return_value = []
        mock_area.query.filter_by.return_value.first.return_value = Area(AreaID=1, Name='Test Area', Floor=2, ParkingLotID=1)
        mock_reservation.return_value = Reservation(CarID=1, ParkingSpotID=1, ReservationTime='2023-11-01 23:59:59', ExpiredTime='2023-11-02 23:59:59')
        response = self.client.post('/reservation', json={
            'car_id': 1,
            'parking_lot_id': 1,
        })
        self.assert200(response)

        result = response.get_json()
        self.assertIn('car_id', result)
        self.assertIn('car_license', result)
        self.assertIn('parking_spot_number', result)
        self.assertIn('parking_lot_name', result)
        self.assertIn('area_name', result)
        self.assertIn('area_floor', result)
        self.assertIn('reservation_time', result)
        self.assertIn('expired_time', result)
        