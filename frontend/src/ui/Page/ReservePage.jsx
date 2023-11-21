import React, { useEffect, useState } from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import ParkingStatus from '../Component/ParkingStatus';

import ReserveButton from '../Component/ReserveButton';

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

// The props isExpired is for testing only
function ReservePage({ isExpired = false }) {

    // eslint-disable-next-line no-unused-vars
    const [infoType, setInfoType] = useState(INFO_TYPE.NONE);
    const [layout, setLayout] = useState(LAYOUT_TYPE.NONE);
    useEffect(() => {
        if (isExpired) {
            setInfoType(INFO_TYPE.EXPIRE);
            setLayout(LAYOUT_TYPE.EXPIRE);
        }
        else {
            setInfoType(INFO_TYPE.NONE);
            setLayout(LAYOUT_TYPE.NONE);
        }
    }, [isExpired]);

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
            <SubHeader BACK_ICON={false} LEFT_STR="Reservation" RHS_INFO={infoType} />
            <ViewLotsSet SECTION={'A'} LOTs_STATUS={array} />
            <ParkingStatus parking_status={parking_status} />
            <ReserveButton text={layout.text} color={layout.color} outline={layout.outline}/>
        </div >
    );
}

export default ReservePage;