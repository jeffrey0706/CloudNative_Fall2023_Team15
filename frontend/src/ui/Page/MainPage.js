import './MainPage.css';
import React from 'react';
import Header from '../Component/Header';
import Location from '../Component/Location';
import LocationList from '../Component/LocationList';
import ReserveButton from '../Component/ReserveButton';

function MainPage() {
  return (
    <>
        <Header />
        <Location currentPlace='Parking Lot 1'/>
        <LocationList />
        <ReserveButton text='Reserve' color='danger'/>
    </>
  );
}

export default MainPage;
