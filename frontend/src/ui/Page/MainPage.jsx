import './MainPage.css';
import React, { useEffect } from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import Location from '../Component/Location';
import LocationList from '../Component/LocationList';
import ReserveButton from '../Component/ReserveButton';
import axios from 'axios';

const userId = 1;
const BASE_URL = 'http://localhost:5000';

function MainPage() {

  const [currentPlace, setCurrentPlace] = React.useState('');
  useEffect(() => {
    axios
      .get(BASE_URL + '/profile/' + userId)
      .then((res) => axios.get(BASE_URL + '/parking_lot/' + res.data.preference))
      .then((res) =>  setCurrentPlace(res.data.name))
      .catch(() => setCurrentPlace(''));
  }, []);

  return (
    <>
        <Header togglerType={TOGGLER_TYPE.COLLAPSE}/>
        <Location currentPlace={currentPlace}/>
        <LocationList />
        <ReserveButton text='Reserve' color='danger'/>
    </>
  );
}

export default MainPage;
