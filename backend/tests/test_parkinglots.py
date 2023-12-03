import unittest
from tests.base import SettingBase
from unittest import mock

class CheckParkingLotAPI(SettingBase):
    def test_get_parkinglots(self):
        response = self.client.get('/parkinglots')
        self.assert200(response, '`GET /parkinglots` is unavailable')
    
    @mock.patch('app.models.Reservation.query.all')
    @mock.patch('app.models.ParkingLot.query.all')
    def test_get_parkinglot_refactor_1(self, parkingLotMock, reservationMock):
        '''
        This is a refactor of test_get_parkinglots.
        It would be better to use mock instead of creating a new database.
        Here's the first alternative solution.
        '''
        parkingLotMock.return_value = []
        reservationMock.return_value = []
        
        # Assert something here
        pass

    def test_get_parkinglot_refactor_2(self):
        '''
        This is a refactor of test_get_parkinglots.
        It would be better to use mock instead of creating a new database.
        Here's the second alternative solution.
        '''
        from alchemy_mock.mocking import UnifiedAlchemyMagicMock # Need to install alchemy-mock
        from app.models import ParkingLot

        session = UnifiedAlchemyMagicMock(data=[
            (
                [
                    mock.call.query(),
                ], # This is the query part
                [
                    ParkingLot(ParkingLotID=1, Name='ParkingLot1', SpotCounts=10),
                    ParkingLot(ParkingLotID=2, Name='ParkingLot2', SpotCounts=20),
                ] # This is the result part
            )
        ])
        res = session.query().all()
        assert len(res) == 2
        

if __name__ == '__main__':
    unittest.main()