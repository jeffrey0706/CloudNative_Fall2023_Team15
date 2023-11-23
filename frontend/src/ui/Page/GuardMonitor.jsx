import './GuardMonitor.css';
import React, { useState } from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ParkingLot from '../Component/ParkingLot';
import Floors from '../Component/Floors';


function GuardMonitor() {

  const floors = ['1F', '2F', '3F', '4F'];
  const layout = [['A', 'B'], ['C', 'D']];
  const [currentFloor, setCurrentFloor] = useState(floors[0]);
  const onClick = (event) => {
    setCurrentFloor(event.target.innerText);
  }

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR="Parking Slot 1" RHS_INFO={INFO_TYPE.NONE} />
      <ParkingLot layout={layout}/>
      <Floors floors={floors} currentFloor={currentFloor} onClick={onClick}/>
    </>
  );
}

export default GuardMonitor;
