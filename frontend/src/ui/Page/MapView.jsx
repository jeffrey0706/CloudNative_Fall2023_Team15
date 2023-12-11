// import './MapView.css';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReserveButton from '../Component/ReserveButton';


import { Button } from 'reactstrap';

// Production API
// import { API } from '../Api';
// Testing constants
import { fakeMapCenter, fakeLocationsCoordinate } from '../Constants';
import MapContainer from '../Component/Map';
import ReserveFooter from '../Component/ReserveFooter';
import { IoIosArrowRoundBack } from "react-icons/io";
import "./MapView.css"

function MapView() {

    const navigate = useNavigate();

    const [selectedPKLot, setSelectedPKLot] = useState('Parking Lot 3');

    const mapRef = useRef(null)

    const onGoogleApiLoaded = ({ map, maps }) => {
        mapRef.current = map
    }

    const onMarkerClick = (markerId) => {
        console.log('This is ->', markerId)
        setSelectedPKLot(markerId);
        // mapRef.current.setCenter({ lat, lng })
    }

    const onBackIconClick = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        }
        else {
            navigate('/', { replace: true });
        }
    }

    return (
        <>
            <MapContainer
                fakeLocations_coordinate={fakeLocationsCoordinate}
                center={fakeMapCenter}
                selectedPKLot={selectedPKLot}
                onMarkerClick={onMarkerClick}
                onGoogleApiLoaded={onGoogleApiLoaded}
            />
            <ReserveFooter location={fakeLocationsCoordinate.find(({ name }) => name === selectedPKLot)} />
            <ReserveButton text='Reserve' color='danger' outline={false} onClick={() => { throw new Error("Connection with backend API is not yet done!"); }} />

            <Button color='none' className='back-btn' onClick={onBackIconClick}>
                <IoIosArrowRoundBack style={{ color: 'white' }} size={34} />
            </Button>
        </>
    );
}

export default MapView;
