import './MyCarPage.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLotsSet from '../Component/ViewLotsSet';
import ParkingStatus from '../Component/ParkingStatus';
import moment from 'moment';
import { API } from '../Api';
import { UserStatusTransfer } from '../Constants'; // TODO: Remove fake userId

const INITIAL_MY_CAR_INFO= {
    Location: '',
    Parking_Spot: '',
    Start_Time: '',
    Duration: '',
}

function MyCarPage() {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.login.userId);
    const [userStatus, setUserStatus] = useState(null);
    const [myCarInfo, setMyCarInfo] = useState(INITIAL_MY_CAR_INFO); 
    const [map, setMap] = useState([]);

    useEffect(() => {
        API.user_status.get(userId)
            .then((res) => {
                if (UserStatusTransfer(res.data.status) !== "PARKED") {
                    return Promise.reject('User hasn\'t parked yet.');
                }
                setUserStatus(res.data.status);

                const myCarPromise = API.my_car.get(userId);
                const mapPromise = myCarPromise.then((res) => API.map.get(res.data.parking_lot_id, res.data.area_floor));
                Promise.all([myCarPromise, mapPromise])
                    .then(([myCarRes, mapRes]) => {
                        const startTime = moment.utc(myCarRes.data.park_time).local();
                        const now = moment.utc().local();
                        const duration = moment.duration(now.diff(startTime));
                        const hourString =
                            duration.hours() > 1 ? `${duration.hours()} hrs ` :
                                duration.hours() > 0 ? `${duration.hours()} hr ` : '';
                        const minuteString =
                            duration.minutes() > 1 ? `${duration.minutes()} mins` :
                                duration.minutes() > 0 ? `${duration.minutes()} min` : '';
                        setMyCarInfo({
                            Location: myCarRes.data.parking_lot_name,
                            parkingArea: myCarRes.data.area_name,
                            Parking_Spot: 
                                myCarRes.data.area_name +
                                myCarRes.data.parking_spot_number.toLocaleString(undefined, {minimumIntegerDigits: 2}) +
                                ' (Floor ' + myCarRes.data.area_floor + ')',
                            Start_Time: startTime.format('YYYY/MM/DD HH:mm:ss'),
                            Duration: duration.asMinutes() < 1 ? 'Less than 1 minute' : hourString + minuteString
                        });
                        setMap(mapRes.data.filter(d => d.area_name === myCarRes.data.area_name).map(d => d.status));
                    });
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
                navigate('/error');
            });
    }, [navigate, userId]);

    return (
        <>
            <Header togglerType={TOGGLER_TYPE.COLLAPSE} userStatus={userStatus} />
            <div className='body-wrapper'>
                <div>
                    <SubHeader BACK_ICON={false} LEFT_STR="My Car" RHS_INFO={INFO_TYPE.NONE} />
                    <ViewLotsSet SECTION={myCarInfo.parkingArea} LOTs_STATUS={map} />
                    <ParkingStatus parking_status={myCarInfo} />
                </div>
            </div>
        </>
    );
}

export default MyCarPage;