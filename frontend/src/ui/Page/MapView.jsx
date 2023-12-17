// import './MapView.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReserveButton from '../Component/ReserveButton';
import { Button } from 'reactstrap';

// Production API
// import { API } from '../Api';

// Testing constants
import { fakeMapCenter, fakeLocationsCoordinate, fakeApiKey } from '../Constants';
import MapContainer from '../Component/Map';
import ReserveFooter from '../Component/ReserveFooter';
import { IoIosArrowRoundBack } from "react-icons/io";
import "./MapView.css";

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

    const [selectedPKLot, setSelectedPKLot] = useState('Parking Lot 3');

    const [mapRef, setMapRef] = useState(null);

    const onGoogleApiLoaded = (map) => {
        var bounds = new window.google.maps.LatLngBounds();
        for (var i = 0; i < fakeLocationsCoordinate.length; i++) {
            bounds.extend(fakeLocationsCoordinate[i]);
        }
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
        setMapRef(map);
    }

    const onMarkerClick = (markerId, lat, lng) => {
        // console.log('This is ->', markerId)
        setSelectedPKLot(markerId);
        mapRef?.setZoom(18);
        mapRef?.setCenter({ lat, lng })
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

    return (
        <div className='map-view-wrapper'>
            <MapContainer
                API_KEY={API_KEY}
                fakeLocations_coordinate={fakeLocationsCoordinate}
                center={fakeMapCenter}
                selectedPKLot={selectedPKLot}
                onMarkerClick={onMarkerClick}
                onGoogleApiLoaded={onGoogleApiLoaded}
            />
            <ReserveFooter location={fakeLocationsCoordinate.find(({ name }) => name === selectedPKLot)} />
            <ReserveButton text='Reserve' color='danger' outline={false} onClick={reserveBtnClick} />

            <Button color='none' className='back-btn' onClick={onBackIconClick}>
                <IoIosArrowRoundBack style={{ color: 'white' }} size={34} />
            </Button>
        </div>
    );
}

export default MapView;
