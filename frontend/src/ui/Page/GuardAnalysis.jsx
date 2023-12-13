// import './GuardAnalysis.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import Floors from '../Component/Floors';

function GuardAnalysis() {

  const navigate = useNavigate();

  const onBackIconClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    }
    else {
      navigate('/', { replace: true });
    }
  }

  const floors = ['1F', '2F', '3F', '4F'];
  const [currentFloor, setCurrentFloor] = useState(floors[0]);
  const onFloorBtnClick = (event) => {
    setCurrentFloor(event.target.innerText);
  }

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR='Analysis' RHS_INFO={INFO_TYPE.DATE} onBackIconClick={onBackIconClick} />
      <Floors floors={floors} currentFloor={currentFloor} onClick={onFloorBtnClick} />
    </>
  );
}

export default GuardAnalysis;
