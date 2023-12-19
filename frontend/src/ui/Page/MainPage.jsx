import './MainPage.css';
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import Location from '../Component/Location';
import LocationList from '../Component/LocationList';
import ReserveButton from '../Component/ReserveButton';

// Production API
import { API } from '../Api';
// Testing constants
import { userId, reservationId as carId, UserStatusTransfer } from '../Constants';

function MainPage() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [userStatus, setUserStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.profile.get(userId)
      .then((res) => {
        const { data } = res;
        setCurrentLocation({
          'name': data.preference_lot_name,
          'parkinglot_id': data.preference_lot_id,
        });
      })
      .catch((err) => setError(err));
  }, []);
  
  useEffect(() => {
    API.parking_lots.get()
      .then((res) => setLocations(res.data))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {  
    API.user_status.get(userId)
    .then((res) => {
      setUserStatus(res.data.status); 
    })
    .catch((err) => setError(err));
  }, []);

  const reserve = () => {
    console.log("inside func", currentLocation);
    API.reservation.post(userId, currentLocation.parkinglot_id)
      .then((res) => navigate(`/reservation?carId=${carId}`))
      .catch((err) => {setError(err); console.log('Error: ', err);});
  };
  const newReserve = async() => {
    await API.reservation.delete(carId)
      .then(() => console.log('Reservation deleted'))
      .catch((err) => setError(err));
    reserve();
  };
  const mapBtnClick = () => navigate('/map');
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
        return () => navigate(`/reservation?carId=${carId}`);
      case 2: // PARKED
        return () => navigate(`/mycar?userId=${userId}`);
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
          (UserStatusTransfer(userStatus) === "RESERVED" || UserStatusTransfer(userStatus) === "PARKED") && 
          <ReserveButton text='Reserve a new one' color='danger' outline={true} onClick={newReserve} />
        }
        </div>
      </div>
    </>
  );
}

export default MainPage;
