import './ErrorPage.css';
import React from "react";
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader from '../Component/SubHeader';
import carGIF from '../../assets/MyCarNotFound.gif';


function ErrorPage() {
    return (
        <>
            <Header togglerType={TOGGLER_TYPE.COLLAPSE} />
            <SubHeader BACK_ICON={false} LEFT_STR="404 Not Found" />
            <div className="content">
                <img src={carGIF} alt="Car gif" height="250" width="350" />
                <h4>Ooops! Something goes wrong...</h4>
            </div>
        </>
    )
}

export default ErrorPage;
