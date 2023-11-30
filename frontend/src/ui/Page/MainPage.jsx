import './MainPage.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import Location from '../Component/Location';
import LocationList from '../Component/LocationList';
import ReserveButton from '../Component/ReserveButton';
import axios from 'axios';

// Production constants
import { BASE_URL } from '../Constants';
// Testing constants
import { userId, fakeLocations } from '../Constants';

function MainPage() {

  const navigate = useNavigate();

  const [currentPlace, setCurrentPlace] = React.useState('');
  useEffect(() => {
    axios
      .get(BASE_URL + '/profile/' + userId)
      .then((res) => axios.get(BASE_URL + '/parking_lot/' + res.data.preference))
      .then((res) => setCurrentPlace(res.data.name))
      .catch(() => setCurrentPlace(''));
  }, []);

  const [locations, setLocations] = React.useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + '/parking_lots')
      .then((res) => setLocations(res.data))
      .catch(() => setLocations(fakeLocations)); // TODO: Change this for production
  }, []);

  const reserveBtnClick = () => navigate('/reservation');

  return (
    <>
        <Header togglerType={TOGGLER_TYPE.COLLAPSE}/>
        <div className='body-wrapper'>
          <Location currentPlace={currentPlace}/>
          <LocationList locations={locations}/>
          <ReserveButton text='Reserve' color='danger' outline={false} onClick={reserveBtnClick}/>
        </div>
    </>
  );
}

export default MainPage;
