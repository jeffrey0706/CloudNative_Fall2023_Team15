import './ViewLotsSet.css';
import React, { useState, useEffect } from 'react';
import ViewLots from './ViewLots';
import RoadLineDirection from '../../assets/RoadLineDirection.svg'

function ViewLotsSet({ SECTION = 'A', LOTs_STATUS = [2, 2, 3, 2, 1, 1] }) {

    const [sectionImg, setSectionImg] = useState(null);

    useEffect(() => {
        import(`../../assets/section${SECTION}.svg`)
            .then((sectionImgPath) => setSectionImg(sectionImgPath.default))
    }, [SECTION]);

    return (
        <div className="wrap-container">
            <div className="wrap-lots-container">
                <div className="wrap-dir-container">
                    <div className="temp-container">
                        {/* Temp. */}
                        {sectionImg && <img className='SectionImg' src={sectionImg} alt={`${SECTION}`} />}
                    </div>
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
