import './GuardMonitor.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ParkingLot from '../Component/ParkingLot';
import Floors from '../Component/Floors';
import { fakePKLotName } from '../Constants';

function GuardMonitor() { // TODO: How to access the data

  const navigate = useNavigate();

  const floors = ['1F', '2F', '3F', '4F'];
  const layout = [['A', 'B'], ['C', 'D']];
  const [currentFloor, setCurrentFloor] = useState(floors[0]);
  const onFloorBtnClick = (event) => {
    setCurrentFloor(event.target.innerText);
    LotPosition = fakePKLotName + ' -> ' + currentFloor;
  }
  const onBackIconClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    }
    else {
      navigate('/', { replace: true });
    }
  }

  const onLotClick = (event) => {
    // console.log(event.target.parentNode.id || event.target.id);
    const LotInfo = event.target.parentNode.id || event.target.id
    navigate('/guard/detail', { state: { LotInfo: LotInfo } })
  }

  let LotPosition = fakePKLotName + ' -> ' + currentFloor;

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR={fakePKLotName} RHS_INFO={INFO_TYPE.NONE} onBackIconClick={onBackIconClick} />
      <ParkingLot layout={layout} LotPosition={LotPosition} onClick={onLotClick} />
      <Floors floors={floors} currentFloor={currentFloor} onClick={onFloorBtnClick} />
    </>
  );
}

export default GuardMonitor;
