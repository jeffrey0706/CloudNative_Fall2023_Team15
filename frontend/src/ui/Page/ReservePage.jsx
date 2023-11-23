import React, { useEffect, useState } from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import { LOT_STATUS } from '../Component/ViewLots';
import ParkingStatus from '../Component/ParkingStatus';
import ReserveButton from '../Component/ReserveButton';
import axios from 'axios';

// Production constants
import { BASE_URL } from '../Constants';
// Testing constants
import { reservationId } from '../Constants';

const LAYOUT_TYPE = {
    NONE: {
        text: 'Cancel the Reservation',
        color: 'dark',
        outline: true,
    },
    EXPIRE: {
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
    const [infoType, setInfoType] = useState(INFO_TYPE.NONE);
    const [layout, setLayout] = useState(LAYOUT_TYPE.NONE);

    useEffect(() => {
        const reservation = axios.get(BASE_URL + '/reservation/' + reservationId);
        const parkingSpot = reservation.then((res) => axios.get(BASE_URL + '/parking_spot/' + res.data.parking_spot_id));
        const area = parkingSpot.then((res) => axios.get(BASE_URL + '/area/' + res.data.area_id));
        const parkingLot = area.then((res) => axios.get(BASE_URL + '/parking_lot/' + res.data.parking_lot_id));
        Promise.all([reservation, parkingSpot, area, parkingLot]).then(([reservation, parkingSpot, area, parkingLot]) => {
            const now = new Date();
            const expire = new Date(reservation.data.end_time);
            if (now > expire) {
                setInfoType(INFO_TYPE.EXPIRE);
                setLayout(LAYOUT_TYPE.EXPIRE);
            }
            else {
                setInfoType(INFO_TYPE.NONE);
                setLayout(LAYOUT_TYPE.NONE);
            }
            setParkingData({
                License_plate: reservation.data.car_id,
                Location: parkingLot.data.name,
                Parking_spot: area.data.name + parkingSpot.data.number + ' (Floor ' + area.data.floor + ')',
                Expired_time: reservation.data.end_time,
            });
        }).catch(() => {
            console.log('Error: Failed to fetch data');
            setInfoType(INFO_TYPE.EXPIRE);
            setLayout(LAYOUT_TYPE.EXPIRE);
            setParkingData(INITIAL_PARKING_DATA);
        });
    }, []); // TODO: Modify this after changing the API

    const [array, setArray] = useState([]);
    useEffect(() => {
        let tmpArray = [];
        for (let i = 0; i < 6; i++) {
            let randomNumber = Math.floor(Math.random() * Object.keys(LOT_STATUS).length); // Generates a random number between 0 and 3
            tmpArray.push(randomNumber);
        }
        setArray(tmpArray);
    }, []);

    return (
        <>
            <Header togglerType={TOGGLER_TYPE.EXIT} />
            <SubHeader BACK_ICON={false} LEFT_STR="Reservation" RHS_INFO={infoType} />
            <ViewLotsSet SECTION={'A'} LOTs_STATUS={array} />
            <ParkingStatus parking_status={parkingData} />
            <ReserveButton text={layout.text} color={layout.color} outline={layout.outline} />
        </>
    );
}

export default ReservePage;