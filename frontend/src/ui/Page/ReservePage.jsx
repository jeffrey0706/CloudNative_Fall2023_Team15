import './ReservePage.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import ParkingStatus from '../Component/ParkingStatus';
import ReserveButton from '../Component/ReserveButton';
import moment from 'moment';
import { API } from '../Api';
import { UserStatusTransfer } from '../Constants'; // TODO: Remove fake userId


const EXPIRE_TYPE = {
    RESERVED: {
        infoType: INFO_TYPE.NONE,
        text: 'Cancel the Reservation',
        color: 'dark',
        outline: true,
    },
    EXPIRE: {
        infoType: INFO_TYPE.EXPIRE,
        text: 'Back to Home page',
        color: 'danger',
        outline: false,
    },
}

const RESERVATION_DATA = {
    License_plate: '',
    Location: '',
    Parking_spot: '',
    Expired_time: '',
}

const PARKING_INFO= {
    parkingLotId: '',
    parkingArea: '',
    parkingFloor: '',
}


function ReservePage() {
    const navigate = useNavigate();
    const { userId, carId } = useSelector((state) => state.login);

    const [reservationData, setReservationData] = useState(RESERVATION_DATA);
    const [parkingInfo, setParkingInfo] = useState(PARKING_INFO); 
    const [expired, setExpired] = useState(EXPIRE_TYPE.RESERVED);
    const [map, setMap] = useState([]);


    useEffect(() => {
        const userStatusPromise = API.user_status.get(userId);
        const reservationPromise = API.reservation.get(carId);
        Promise.all([userStatusPromise, reservationPromise])
            .then(([userStatusRes, reservationRes]) => {
                if (UserStatusTransfer(userStatusRes.data) === "RESERVED") {
                    setExpired(EXPIRE_TYPE.RESERVED);
                } else if (UserStatusTransfer(userStatusRes.data) === "EXPIRED") {
                    setExpired(EXPIRE_TYPE.EXPIRE);
                }

                setReservationData({
                    License_plate: reservationRes.data.car_license,
                    Location: reservationRes.data.parking_lot_name,
                    Parking_spot: 
                        reservationRes.data.area_name +
                        reservationRes.data.parking_spot_number.toLocaleString(undefined, {minimumIntegerDigits: 2}) +
                        ' (Floor ' + reservationRes.data.area_floor + ')',
                    Expired_time: moment.utc(reservationRes.data.expired_time).format('YYYY/MM/DD HH:mm:ss'),
                });
                setParkingInfo({
                    parkingLotId: reservationRes.data.parking_lot_id,
                    parkingArea: reservationRes.data.area_name,
                    parkingFloor: reservationRes.data.area_floor,
                });
            })
            .catch((err) => {
                console.log('Error: Failed to fetch data');
                navigate('/error');
            });
    }, []);

    useEffect(() => {
        if (parkingInfo.parkingLotId !== '' && parkingInfo.parkingFloor !== '') {
            API.map.get(parkingInfo.parkingLotId, parkingInfo.parkingFloor)
                .then((res) => {
                    let { data } = res;
                    data = data.filter(d => d.area_name === parkingInfo.parkingArea).map(d => d.status);
                    setMap(data);
                })
                .catch((err) => {
                    console.log('Error: Failed to fetch data');
                })
        }
    }, [parkingInfo.parkingLotId, parkingInfo.parkingArea, parkingInfo.parkingFloor]);

    const deleteRsv = () => {
        API.reservation.delete(carId)
            .then((res) => navigate('/'))
            .catch((err) => console.log(err));
    };

    
    return (
        <>
            <Header togglerType={TOGGLER_TYPE.COLLAPSE} />
            <div className='body-wrapper'>
                <div>
                    <SubHeader BACK_ICON={false} LEFT_STR="Reservation" RHS_INFO={expired.infoType} />
                    {/* <ViewLotsSet SECTION={parkingInfo.parkingArea} LOTs_STATUS={map} /> */}
                    <ViewLotsSet LOTs_STATUS={map} />
                    <ParkingStatus parking_status={reservationData} />
                </div>
                <ReserveButton text={expired.text} color={expired.color} outline={expired.outline} onClick={deleteRsv} />
            </div>
        </>
    );
}

export default ReservePage;