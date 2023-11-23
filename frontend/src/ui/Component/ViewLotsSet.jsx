import './ViewLotsSet.css';
import React from 'react';
import ViewLots from './ViewLots';
import RoadLineDirection from '../../assets/RoadLineDirection.svg'

function ViewLotsSet({ SECTION = 'A', LOTs_STATUS = [2, 2, 3, 2, 1, 1] }) {
    return (
        <div className="wrap-container">
            <div className="wrap-lots-container">
                <div className="wrap-dir-container">
                    <div className="temp-container">Temp.</div>
                    <img className='RoadLineDirection' src={RoadLineDirection} alt="" />
                </div>

                <div className="View-Lots-container">
                    <ViewLots SECTION={SECTION} LOTs_STATUS={LOTs_STATUS} />
                </div>
            </div>
            <div className="divider"></div>
        </div>
    );
}

export default ViewLotsSet;
