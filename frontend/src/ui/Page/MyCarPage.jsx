import './MyCarPage.css';
import React from "react";
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader from '../Component/SubHeader';
import carGIF from '../../assets/giphy.gif';


function MyCarPage() {
    return (
        <>
            <Header togglerType={TOGGLER_TYPE.COLLAPSE} />
            <SubHeader BACK_ICON={false} LEFT_STR="My Car" />
            <div className="content">
                <img src={carGIF} alt="Car gif" height="250" width="350" />
                <h4>There's no parked car...</h4>
            </div>
        </>
    )
}

export default MyCarPage;
