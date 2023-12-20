// import './MapView.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReserveButton from '../Component/ReserveButton';
import { Button } from 'reactstrap';

// Production API
// import { API } from '../Api';

// Testing constants
import { fakeApiKey } from '../Constants';
import MapContainer from '../Component/Map';
import ReserveFooter from '../Component/ReserveFooter';
import { IoIosArrowRoundBack } from "react-icons/io";
import "./MapView.css";
import { API } from '../Api';
import { CiBowlNoodles } from 'react-icons/ci';

// import { API_KEY } from '../../credentials';
// const API_KEY = 'YOU_NEED_CREDENTIALS_FILE';

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

    useEffect(() => {
        API.parking_lots.get()
            .then((res) => {
                setLocations(res.data);
            })
            .catch((err) => console.log('Error: ', err));
    }, []);

    useEffect(() => {
        if (locations.length > 0) {
            setIsLoading(false);
            let parkingLot = locations.find(({ parkinglot_id }) => parkinglot_id === Number(parkingLotId));
            setCenter({ lat: parkingLot.latitude, lng: parkingLot.longitude });
        }
    }, [locations]);

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

    const reserveBtnClick = () => navigate('/reservation');
    const getCenter = (locations) => {
        const lat = locations.reduce((acc, cur) => acc + cur.latitude, 0) / locations.length;
        const lng = locations.reduce((acc, cur) => acc + cur.longitude, 0) / locations.length;
        return { lat, lng };
    }
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
                            <ReserveButton text='Reserve' color='danger' outline={false} onClick={reserveBtnClick} />

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
