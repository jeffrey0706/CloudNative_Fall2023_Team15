import './ViewLots.css';
import React from 'react';
import CarImg from '../../assets/Car.svg';

export const LOT_STATUS = {
    EMPTY: 0,
    OCCUPIED: 1,
    APPROACHING: 2,
    PARKED: 3,
};

function ViewLots({ LotPosition, SECTION = 'A', LOTs_STATUS = [2, 2, 3, 2, 1, 1], onClick = () => { }, FONT_SIZE = 18 }) {
    const getStatusContent = (status, index) => {
        let lot_code = `${SECTION}0${index + 1}`;
        switch (status) {
            case LOT_STATUS.EMPTY:
                return '';
            case LOT_STATUS.OCCUPIED:
                return <img src={CarImg} alt="Occupied" />;
            case LOT_STATUS.APPROACHING:
                return (
                    <div className="approaching">
                        {lot_code}
                    </div>
                );
            case LOT_STATUS.PARKED:
                return (
                    <div className="parked">
                        {lot_code}
                    </div>
                );
            default:
                return '';
        }
    };

    return (
        <div className="lots-container">
            {
                LOTs_STATUS.map((status, index) => (
                    <div key={index} id={`${LotPosition} -> ${SECTION}0${index + 1}`} onClick={onClick} className={`grid-item status-${status}`} style={{ fontSize: `${FONT_SIZE}px` }}>
                        {getStatusContent(status, index)}
                    </div>
                ))
            }
        </div >
    );
}

export default ViewLots;
