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
import { userId, reservationId as carId } from '../Constants';

function MainPage() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [userStatus, setUserStatus] = useState(null);
  const [error, setError] = useState(null);
  const [statusButton, setStatusButton] = useState(null);

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
      switch (userStatus) {
        case 1: // RESERVED
        setStatusButton(
            <div>
              <ReserveButton text='My Reservation' color='danger' outline={false} onClick={() => navigate(`/reservation?carId=${carId}`)} />
              <ReserveButton text='Reserve a new one' color='danger' outline={true} onClick={newReserve} />
            </div>
          );
          break;
        case 2: // PARKED
        setStatusButton(
            <div>
              <ReserveButton text='My Car' color='danger' outline={false} onClick={() => navigate(`/mycar?userId=${userId}`)} />
              <ReserveButton text='Reserve a new one' color='danger' outline={true} onClick={newReserve} />
            </div>
          );
          break;
        default: // NONE, EXPIRED
        setStatusButton(<ReserveButton text='Reserve' color='danger' outline={false} onClick={reserve} />);
      }
    })
    .catch((err) => setError(err));
  }, [userStatus]);

  const reserve = () => {
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
        {statusButton}
      </div>
    </>
  );
}

export default MainPage;
