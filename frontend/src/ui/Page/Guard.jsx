import './Guard.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import LocationList, { LOCATION_LIST_MODE } from '../Component/LocationList';
import ProgressBar from '../Component/ProgressBar';

// Production API
import { API } from '../Api';
// Testing constants
import { fakeLocations } from '../Constants';

function Guard() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    API.parking_lots.get()
      .then((res) => setLocations(res.data))
      .catch(() => setLocations(fakeLocations)); // TODO: Change this for production
  }, []);


  const onPKLotClick = (event) => {
    const PKLotName = event.target.id || event.target.parentNode.id || event.target.parentNode.parentNode.id
    navigate('/guard/monitor', { state: { PKLotName: PKLotName } })
  }


  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={false} LEFT_STR="Dashboard" RHS_INFO={INFO_TYPE.ANALYSIS} />
      <ProgressBar locations={locations} />
      <LocationList mode={LOCATION_LIST_MODE.FRACTION} locations={locations} onClick={onPKLotClick} />
    </>
  );
}

export default Guard;