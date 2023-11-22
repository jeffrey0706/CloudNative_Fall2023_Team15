import React, { useState, useEffect } from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import LocationList, { LOCATION_LIST_MODE } from '../Component/LocationList';
import ProgressBar from '../Component/ProgressBar';
import axios from 'axios';
import './Dashboard.css';

// Production constants
import { BASE_URL } from '../Constants';
// Testing constants
import { fakeLocations } from '../Constants';

function Dashboard() {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + '/parking_lots')
      .then((res) => setLocations(res.data))
      .catch(() => setLocations(fakeLocations)); // TODO: Change this for production
  }, []);

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={false} LEFT_STR="Dashboard" RHS_INFO={INFO_TYPE.ANALYSIS} />
      <ProgressBar locations={locations} />
      <LocationList mode={LOCATION_LIST_MODE.FRACTION} locations={locations} />
    </>
  );
}

export default Dashboard;