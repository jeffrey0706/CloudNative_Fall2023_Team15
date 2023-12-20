import './MainPage.css';
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import Location from '../Component/Location';
import LocationList from '../Component/LocationList';
import ReserveButton from '../Component/ReserveButton';

// Production API
import { API } from '../Api';
// Testing constants
import { UserStatusTransfer } from '../Constants';

function MainPage() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [userStatus, setUserStatus] = useState(null);
  const [error, setError] = useState(null);
  const { userId, carId } = useSelector((state) => state.login);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    const locationPromise = API.profile.get(userId)
    const parkingLotsPromise = API.parking_lots.get();
    const userStatusPromise = API.user_status.get(userId);

    Promise.all([locationPromise, parkingLotsPromise, userStatusPromise])
      .then(([locationRes, parkingLotsRes, userStatusRes]) => {
        setCurrentLocation({
          'name': locationRes.data.preference_lot_name,
          'parkinglot_id': locationRes.data.preference_lot_id,
        });
        setLocations(parkingLotsRes.data);
        setUserStatus(userStatusRes.data.status);
      })
      .catch((err) => setError(err));
  }, []);

  const reserve = () => {
    API.reservation.post(carId, currentLocation.parkinglot_id)
      .then((res) => navigate('/reservation'))
      .catch((err) => {setError(err); console.log('Error: ', err);});
  };
  
  const newReserve = () => {
    API.reservation.delete(carId)
      .then(reserve)
      .catch((err) => setError(err));
  };
  const mapBtnClick = () => navigate(`/map?originalParkingLotId=${currentLocation.parkinglot_id}`);
  const onModalClose = () => setError(null);
  const reserveButtonText = (status) => {
    switch (status) {
      case 1: // RESERVED
        return 'My Reservation';
      case 2: // PARKED
        return 'My Car';
      default: // NONE, EXPIRED
        return 'Reserve';
    }
  };
  const reserveButtonFunction = (status) => {
    switch (status) {
      case 1: // RESERVED
        return () => navigate('/reservation');
      case 2: // PARKED
        return () => navigate(`/mycar`);
      default: // NONE, EXPIRED
        return reserve;
    }
  };


  return (
    <>
      <Header togglerType={TOGGLER_TYPE.COLLAPSE} />
      {error && <Modal isOpen={error !== null} toggle={onModalClose}>
        <ModalBody style={{ backgroundColor: 'rgb(243, 216, 218)', color: 'rgb(121, 40, 44)' }}>
            {error.message}
        </ModalBody>
      </Modal>}
      <div className='body-wrapper'>
        <div>
          <Location currentPlace={currentLocation.name} onClick={mapBtnClick} />
          <LocationList locations={locations} setCurrentLocation={setCurrentLocation} />
        </div>
        <div>
        <ReserveButton text={reserveButtonText(userStatus)} color='danger' outline={false} onClick={reserveButtonFunction(userStatus)} />
        {
          (UserStatusTransfer(userStatus) === "RESERVED") && 
          <ReserveButton text='Reserve a new one' color='danger' outline={true} onClick={newReserve} />
        }
        </div>
      </div>
    </>
  );
}

export default MainPage;
