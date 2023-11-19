import React from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import ParkingStatus from '../Component/ParkingStatus';

// import './ReserveExpired.css';
import ReserveButton from '../Component/ReserveButton';


function ReserveExpired() {

    let parking_status = {
        License_plate: 'AAA-1234',
        Location: 'Parking Lot 2',
        Parking_spot: 'A03',
        Expired_time: '2023-11-01 12:00:00',
    }
    let array = [];
    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * 4); // Generates a random number between 0 and 3
        array.push(randomNumber);
    }

    return (
        <div className="DashBoard-Container" >
            <Header togglerType={TOGGLER_TYPE.EXIT} />
            <SubHeader BACK_ICON={false} LEFT_STR="Reservation" RHS_INFO={INFO_TYPE.NONE} />
            <ViewLotsSet SECTION={'A'} LOTs_STATUS={array} />
            <ParkingStatus parking_status={parking_status} />
            <ReserveButton text='Reserve a New One' color='light' />
        </div >
    );
}

export default ReserveExpired;