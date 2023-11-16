import './MainPage.css';
import React from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import Location from '../Component/Location';
import LocationList from '../Component/LocationList';
import ReserveButton from '../Component/ReserveButton';

function MainPage() {
  return (
    <>
        <Header togglerType={TOGGLER_TYPE.COLLAPSE}/>
        <Location currentPlace='Parking Lot 1'/>
        <LocationList />
        <ReserveButton text='Reserve' color='danger'/>
    </>
  );
}

export default MainPage;
