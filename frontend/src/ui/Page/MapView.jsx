// import './MapView.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReserveButton from '../Component/ReserveButton';
import { Button } from 'reactstrap';

// Testing constants
import { fakeApiKey } from '../Constants';
import MapContainer from '../Component/Map';
import ReserveFooter from '../Component/ReserveFooter';
import { IoIosArrowRoundBack } from "react-icons/io";
import "./MapView.css";
import { API } from '../Api';

// import { API_KEY } from '../../credentials';
// const API_KEY = 'YOU_NEED_CREDENTIALS_FILE';

const reserveButtonText = (status) => {
    switch (status) {
      case 1: // RESERVED
      case 3: // EXPIRED
        return 'Reserve a new one';
      case 2: // PARKED
        return 'My Car';
      default: // NONE
        return 'Reserve';
    }
};
const reserveButtonOutline = (status) => {
    switch (status) {
    case 1: // RESERVED
    case 3: // EXPIRED
        return true;
    default: // NONE
        return false;
    }
};

function MapView() {

    let API_KEY;
    try {
        API_KEY = require('../../credentials').API_KEY;
    } catch (error) {
        console.log('No credentials file found. Using fake API key.')
        API_KEY = fakeApiKey
    }

    const navigate = useNavigate();
    const location = useLocation();
    const originalParkingLotId = parseInt(new URLSearchParams(location.search).get('originalParkingLotId'));
    const [parkingLotId, setParkingLotId] = useState(originalParkingLotId);
    const [isLoading, setIsLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [userStatus, setUserStatus] = useState(null);
    const { userId, carId } = useSelector((state) => state.login);

    useEffect(() => {
        const parkingLotsPromise = API.parking_lots.get();
        const userStatusPromise = API.user_status.get(userId);
        Promise.all([parkingLotsPromise, userStatusPromise])
            .then(([parkingRes, userStatusRes]) => {
                setUserStatus(userStatusRes.data.status);
                setLocations(parkingRes.data);
            })
            .catch((err) => console.log('Error: ', err));
    }, [userId]);

    useEffect(() => {
        if (locations.length > 0) {
            setIsLoading(false);
            const parkingLot = locations.find(({ parkinglot_id }) => parkinglot_id === Number(parkingLotId));
            setCenter({ lat: parkingLot.latitude, lng: parkingLot.longitude });
        }
    }, [locations, parkingLotId]);

    const [mapRef, setMapRef] = useState(null);
    const onGoogleApiLoaded = (map) => {
        setMapRef(map);
    }

    const onMarkerClick = (parkinglot_id, latitude, longitude) => {
        setParkingLotId(parkinglot_id);
        mapRef?.setZoom(15);
        setCenter({ lat: latitude, lng: longitude });
        setTimeout(() => {
            mapRef?.setZoom(16);
        }, 400);

    }

    const onBackIconClick = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        }
        else {
            navigate('/', { replace: true });
        }
    }
    const reserveButtonFunction = (status) => {
        switch (status) {
            case 1: // RESERVED
            case 3: // EXPIRED
            return () => {
                API.reservation.delete(userId)
                    .then(() => API.reservation.post(carId, parkingLotId))
                    .then(() => navigate('/reservation'))
                    .catch((err) => console.log('Error: ', err));
            }
            case 2: // PARKED
            return () => navigate(`/mycar`);
            default: // NONE
            return () => {
                API.reservation.post(carId, parkingLotId)
                    .then(() => navigate('/reservation'))
                    .catch((err) => console.log('Error: ', err));
            };
        }
    };
    return (
        <div className='map-view-wrapper'>
            {
                (!isLoading && locations.length > 0) ?
                    (
                        <>
                            <MapContainer
                                API_KEY={API_KEY}
                                locations={locations}
                                center={center}
                                selectedPKLot={parkingLotId}
                                onMarkerClick={onMarkerClick}
                                onGoogleApiLoaded={onGoogleApiLoaded}
                            />
                            <ReserveFooter location={locations.find(({ parkinglot_id }) => parkinglot_id === Number(parkingLotId))} />
                            <ReserveButton text={reserveButtonText(userStatus)} color='danger' outline={reserveButtonOutline(userStatus)} onClick={reserveButtonFunction(userStatus)} />

                            <Button color='none' className='back-btn' onClick={onBackIconClick}>
                                <IoIosArrowRoundBack style={{ color: 'white' }} size={34} />
                            </Button>
                        </>
                    ) : (<></>)
            }
        </div>
    );
}

export default MapView;
