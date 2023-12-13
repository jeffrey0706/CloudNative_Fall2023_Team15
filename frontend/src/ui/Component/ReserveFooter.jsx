import './LocationList.css';
import React from 'react';
import { PiWheelchairFill } from "react-icons/pi";
import { fakeAddress } from '../Constants';
import './ReserveFooter.css';

function ReserveFooter({ location }) {
    return (
        <div className='PreviewFooterWrapper'>
            <div className='PreviewFooterHeader'>
                <div className='PreviewFooterTitle'> {location.name} </div>
                <div className='PreviewFooterSubTitle'>
                    <span style={{ fontWeight: "500", fontSize: "18px" }}>{location.maximum_capacity - location.current_capacity}&nbsp;</span>
                    <span>/{location.maximum_capacity} spots</span>
                </div>
            </div>

            <div className="addressWrapper">
                {fakeAddress}
            </div>

            <div className="priorityWrapper">
                {1 && <PiWheelchairFill className='disable-icon' size={20} />}
            </div>
        </div >
    );
}

export default ReserveFooter;