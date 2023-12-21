import './ReservePage.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import ParkingStatus from '../Component/ParkingStatus';
import ReserveButton from '../Component/ReserveButton';
import ErrorModal from '../Component/ErrorModal';
import moment from 'moment';
import { API } from '../Api';
import { UserStatusTransfer } from '../Constants';
import { logout } from '../store';


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
    const dispatch = useDispatch();
    const { userId, carId } = useSelector((state) => state.login);

    const [reservationData, setReservationData] = useState(RESERVATION_DATA);
    const [userStatus, setUserStatus] = useState(null);
    const [parkingInfo, setParkingInfo] = useState(PARKING_INFO); 
    const [expired, setExpired] = useState(EXPIRE_TYPE.RESERVED);
    const [map, setMap] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStatusPromise = API.user_status.get(userId);
        const reservationPromise = API.reservation.get(carId);
        Promise.all([userStatusPromise, reservationPromise])
            .then(([userStatusRes, reservationRes]) => {
                if (UserStatusTransfer(userStatusRes.data.status) === "RESERVED") {
                    setExpired(EXPIRE_TYPE.RESERVED);
                } else if (UserStatusTransfer(userStatusRes.data.status) === "EXPIRED") {
                    setExpired(EXPIRE_TYPE.EXPIRE);
                }

                setUserStatus(userStatusRes.data.status);
                setReservationData({
                    License_plate: reservationRes.data.car_license,
                    Location: reservationRes.data.parking_lot_name,
                    Parking_spot: 
                        reservationRes.data.area_name +
                        reservationRes.data.parking_spot_number.toLocaleString(undefined, {minimumIntegerDigits: 2}) +
                        ' (Floor ' + reservationRes.data.area_floor + ')',
                    Expired_time: moment.utc(reservationRes.data.expired_time).local().format('YYYY/MM/DD HH:mm:ss'),
                });
                setParkingInfo({
                    parkingLotId: reservationRes.data.parking_lot_id,
                    parkingArea: reservationRes.data.area_name,
                    parkingFloor: reservationRes.data.area_floor,
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    dispatch(logout());
                    navigate('/login');
                }
                else {
                    navigate('/error');
                }
            });
    }, [carId, userId, navigate, dispatch]);

    useEffect(() => {
        if (parkingInfo.parkingLotId !== '' && parkingInfo.parkingFloor !== '') {
            API.map.get(parkingInfo.parkingLotId, parkingInfo.parkingFloor)
                .then((res) => {
                    let { data } = res;
                    data = data.filter(d => d.area_name === parkingInfo.parkingArea).map(d => {
                        if (d.spot_number === parkingInfo.parkingLotId) {
                            return d.status
                        }
                        else {
                            return 0;
                        }
                    });
                    setMap(data);
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        dispatch(logout());
                        navigate('/login');
                    }
                    else {
                        navigate('/error');
                    }
                })
        }
    }, [parkingInfo.parkingLotId, parkingInfo.parkingArea, parkingInfo.parkingFloor, navigate, dispatch]);

    useEffect(() => {
        if (reservationData !== RESERVATION_DATA && map.length !== 0) {
            setLoading(false);
        }
    }, [reservationData, map]);

    const deleteRsv = () => {
        API.reservation.delete(carId)
            .then((res) => navigate('/'))
            .catch((err) => setError(err));
    };

    
    return (
        <>
            <Header togglerType={TOGGLER_TYPE.COLLAPSE} userStatus={userStatus}/>
            <ErrorModal error={error} setError={setError} />
            {!loading &&
                <div className='body-wrapper'>
                    <div>
                        <SubHeader BACK_ICON={false} LEFT_STR="Reservation" RHS_INFO={expired.infoType} />
                        <ViewLotsSet SECTION={parkingInfo.parkingArea} LOTs_STATUS={map} />
                        <ParkingStatus parking_status={reservationData} />
                    </div>
                    <ReserveButton text={expired.text} color={expired.color} outline={expired.outline} onClick={deleteRsv} />
                </div>
            }
        </>
    );
}

export default ReservePage;