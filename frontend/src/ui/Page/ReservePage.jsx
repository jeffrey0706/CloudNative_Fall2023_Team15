import './ReservePage.css'
import React, { useEffect, useState } from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import { LOT_STATUS } from '../Component/ViewLots';
import ParkingStatus from '../Component/ParkingStatus';
import ReserveButton from '../Component/ReserveButton';

// Production API
import { API } from '../Api';
// Testing constants
import { reservationId } from '../Constants';

const EXPIRE_TYPE = {
    NONE: {
        infoType: INFO_TYPE.NONE,
        text: 'Cancel the Reservation',
        color: 'dark',
        outline: true,
    },
    EXPIRE: {
        infoType: INFO_TYPE.EXPIRE,
        text: 'Reserve a New One',
        color: 'danger',
        outline: false,
    },
}

const INITIAL_PARKING_DATA = {
    License_plate: '',
    Location: '',
    Parking_spot: '',
    Expired_time: '',
}

function ReservePage() {

    const [parkingData, setParkingData] = useState(INITIAL_PARKING_DATA);
    const [expired, setExpired] = useState(EXPIRE_TYPE.NONE);

    useEffect(() => {
        API.reservation.get(reservationId)
            .then((res) => {
                // Check if the reservation is expired
                const now = new Date();
                const expire = new Date(res.data.expired_time);
                if (now > expire)
                    setExpired(EXPIRE_TYPE.EXPIRE);
                else
                    setExpired(EXPIRE_TYPE.NONE);
                
                // Set parking data
                setParkingData({
                    License_plate: res.data.car_id,
                    Location: res.data.parking_lot_name,
                    Parking_spot: res.data.area_name + res.data.parking_spot_number + ' (Floor ' + res.data.area_floor + ')',
                    Expired_time: res.data.expired_time,
                })
            })
            .catch(() => {
                console.log('Error: Failed to fetch data');
                setExpired(EXPIRE_TYPE.EXPIRE);
                setParkingData(INITIAL_PARKING_DATA);
            });
    }, []);

    const [array, setArray] = useState([]);
    useEffect(() => {
        let tmpArray = [];
        for (let i = 0; i < 6; i++) {
            let randomNumber = Math.floor(Math.random() * Object.keys(LOT_STATUS).length);
            tmpArray.push(randomNumber);
        }
        setArray(tmpArray);
    }, []); // TODO: Change this after the API for parking map is implemented

    return (
        <>
            <Header togglerType={TOGGLER_TYPE.COLLAPSE} />
            <SubHeader BACK_ICON={false} LEFT_STR="Reservation" RHS_INFO={expired.infoType} />
            <ViewLotsSet SECTION={'A'} LOTs_STATUS={array} />
            <ParkingStatus parking_status={parkingData} />
            <ReserveButton text={expired.text} color={expired.color} outline={expired.outline} />
        </>
    );
}

export default ReservePage;