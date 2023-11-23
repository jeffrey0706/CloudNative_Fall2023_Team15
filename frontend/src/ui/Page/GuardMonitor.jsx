import './GuardMonitor.css';
import { Button } from 'reactstrap';
import React, { useState } from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ViewLots, { CARS_STATUS } from '../Component/ViewLots';
import RoadLineVertical from '../../assets/RoadLineVertical.svg';
import RoadLineHorizontal from '../../assets/RoadLineHorizontal.svg';


function GuardMonitor() {

  const floors = ['1F', '2F', '3F', '4F'];
  const [clicked_floor, setFloor] = useState('1F');
  const togglerClicked = (event) => {
    setFloor(event.target.textContent);
  }

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
        {floors.map((floor, index) => (
          <Button
            key={index}
            outline={clicked_floor !== floor}
            color='dark'
            className={`floor ${clicked_floor === floor ? 'clicked_floor' : ''}`}
            onClick={(e) => togglerClicked(e)}
          >
            {floor}
          </Button>
        ))}
      </div >

    </>
  );
}

export default GuardMonitor;
