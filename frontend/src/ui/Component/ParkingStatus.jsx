import './ParkingStatus.css';
import React from 'react';

function ParkingStatus({ parking_status }) {

    const keys = Object.keys(parking_status).map(key => (
        <div key={key} className="item-key">
            {key.replace(/_/g, ' ')}
        </div>
    ));

    const values = Object.keys(parking_status).map(key => (
        <div key={key} className="item-value">
            {parking_status[key]}
        </div>
    ));

    return (
        <div className="wrap-container">
            <div className="parking-status">
                <div className="keys-container">{keys}</div>
                <div className="values-container">{values}</div>
            </div>
        </div>
    );
}

export default ParkingStatus;
