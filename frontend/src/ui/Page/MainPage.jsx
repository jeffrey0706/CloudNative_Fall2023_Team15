import './MainPage.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import Location from '../Component/Location';
import LocationList from '../Component/LocationList';
import ReserveButton from '../Component/ReserveButton';

// Production API
import { API } from '../Api';
// Testing constants
import { userId, fakeLocations } from '../Constants';

function MainPage() {

  const navigate = useNavigate();

  const [currentPlace, setCurrentPlace] = React.useState('');
  useEffect(() => {
    API.profile.get(userId)
      .then((res) => setCurrentPlace(res.data.preference_lot_name))
      .catch(() => setCurrentPlace(''));
  }, []);

  const [locations, setLocations] = React.useState([]);
  useEffect(() => {
    API.parking_lots.get()
      .then((res) => setLocations(res.data))
      .catch(() => setLocations(fakeLocations)); // TODO: Change this for production
  }, []);

  const reserveBtnClick = () => navigate('/reservation');
  const mapBtnClick = () => navigate('/map');

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.COLLAPSE} />
      <div className='body-wrapper'>
        <Location currentPlace={currentPlace} onClick={mapBtnClick} />
        <LocationList locations={locations} />
        <ReserveButton text='Reserve' color='danger' outline={false} onClick={reserveBtnClick} />
      </div>
    </>
  );
}

export default MainPage;
