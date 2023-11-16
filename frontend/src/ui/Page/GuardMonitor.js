import {
  Table,
  Row,
  Col
} from 'reactstrap';
import React from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLots, { CARS_STATUS } from '../Component/ViewLots';
import { v4 as uuidv4 } from 'uuid';

import './GuardMonitor.css';
// import autos from './utils/Autos_6x.svg';
import RoadLineVertical from './utils/RoadLineVertical.svg';
import RoadLineHorizontal from './utils/RoadLineHorizontal.svg';


function GuardMonitor() {

  const render_lots = (sect) => {
    let array = [];
    for (let i = 0; i < 6; i++) {
      let randomNumber = Math.floor(Math.random() * 4); // Generates a random number between 0 and 3
      array.push(randomNumber);
    }
    return (
      <div className="wrap-lots-container-1x">
        <ViewLots SECTION={sect} LOTs_STATUS={array} />
        {/* <img className='AutosImg' src={autos} alt="" /> */}
      </div>
    )
  }

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR="Parking Slot 1" RHS_INFO={INFO_TYPE.NONE} />

      <img className='RoadLineVertical' src={RoadLineVertical} alt="" />
      <img className='RoadLineHorizontal' src={RoadLineHorizontal} alt="" />

      <div className="wrap-lots-container-4x">
        <div className="wrap-lots-container-2x">
          {render_lots('D')}
          {render_lots('C')}
        </div>

        <div className="wrap-lots-container-2x">
          {render_lots('B')}
          {render_lots('A')}
        </div>
      </div>


      <div className="floors-container">
        <div className="floor">1F</div>
        <div className="floor">2F</div>
        <div className="floor">3F</div>
        <div className="floor">4F</div>
      </div>

    </>
  );
}

export default GuardMonitor;
