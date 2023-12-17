import './ReservePage.css'
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import ParkingStatus from '../Component/ParkingStatus';
import ReserveButton from '../Component/ReserveButton';
import moment from 'moment';
import { API } from '../Api';
import { userId, codeToStatus } from '../Constants'; // TODO: Remove fake userId


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
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const carId = param.get('carId');

    const [reservationData, setReservationData] = useState(RESERVATION_DATA);
    const [parkingInfo, setParkingInfo] = useState(PARKING_INFO); 
    const [expired, setExpired] = useState(EXPIRE_TYPE.RESERVED);
    const [map, setMap] = useState([]);


    useEffect(() => {
        API.user_status.get(userId)
            .then((res) => {
                const { status } = res.data;
                if (codeToStatus(status) === "RESERVED") {
                    setExpired(EXPIRE_TYPE.RESERVED);
                } else if (codeToStatus(status) === "EXPIRED") {
                    setExpired(EXPIRE_TYPE.EXPIRE);
                }
                API.reservation.get(carId)
                    .then((res) => {
                        const { data } = res;
                        setReservationData({
                            License_plate: data.car_license,
                            Location: data.parking_lot_name,
                            Parking_spot: 
                                data.area_name +
                                data.parking_spot_number.toLocaleString(undefined, {minimumIntegerDigits: 2}) +
                                ' (Floor ' + data.area_floor + ')',
                            Expired_time: moment.utc(data.expired_time).format('YYYY/MM/DD HH:mm:ss'),
                        });
                        setParkingInfo({
                            parkingLotId: data.parking_lot_id,
                            parkingArea: data.area_name,
                            parkingFloor: data.area_floor,
                        });
                    })
                    .catch((err) => {
                        console.log('Error: Failed to fetch data');
                        navigate('/error');
                    });
            });
    }, [carId]);

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

    // useEffect(() => {
    //     API.reservation.get(carId)
    //         .then((res) => {
    //             // Check if the reservation is expired
    //             const now = new Date();
    //             const expire = new Date(res.data.expired_time);
    //             const expireTime = moment().format('YYYY/MM/DD HH:mm:ss');
    //             // if (now > expire)
    //             //     setExpired(EXPIRE_TYPE.EXPIRE);
    //             // else
    //             //     setExpired(EXPIRE_TYPE.NONE);
                
    //             // Set parking data
    //             setParkingData({
    //                 License_plate: res.data.car_license,
    //                 Location: res.data.parking_lot_name,
    //                 Parking_spot: 
    //                     res.data.area_name +
    //                     res.data.parking_spot_number.toLocaleString(undefined, {minimumIntegerDigits: 2}) +
    //                     ' (Floor ' + res.data.area_floor + ')',
    //                 Expired_time: expireTime,
    //             });
    //         })
    //         .catch(() => {
    //             console.log('Error: Failed to fetch data');
    //             setExpired(EXPIRE_TYPE.EXPIRE);
    //             setParkingData(INITIAL_PARKING_DATA);
    //         });
    // }, [location.search, carId]);

    // useEffect(() => {
    //     let tmpArray = [];
    //     for (let i = 0; i < 6; i++) {
    //         let randomNumber = Math.floor(Math.random() * Object.keys(LOT_STATUS).length);
    //         tmpArray.push(randomNumber);
    //     }
    //     setArray(tmpArray);
    // }, []); // TODO: Change this after the API for parking map is implemented

    const deleteRsv = () => {
        API.reservation.delete(carId)
            .then((res) => console.log("Reservation deleted", res))
            .catch((err) => console.log(err));
        navigate('/');
    };

    
    return (
        <>
            <Header togglerType={TOGGLER_TYPE.COLLAPSE} />
            <SubHeader BACK_ICON={false} LEFT_STR="Reservation" RHS_INFO={expired.infoType} />
            {/* <ViewLotsSet SECTION={parkingInfo.parkingArea} LOTs_STATUS={map} /> */}
            <ViewLotsSet LOTs_STATUS={map} />
            <ParkingStatus parking_status={reservationData} />
            <ReserveButton text={expired.text} color={expired.color} outline={expired.outline} onClick={deleteRsv} />
        </>
    );
}

export default ReservePage;