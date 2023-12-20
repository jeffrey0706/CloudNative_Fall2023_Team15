// import './Notification.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import NotifyList from '../Component/NotifyList';

// Production API
import { API } from '../Api';

function Notification() {
  const navigate = useNavigate();

  // const [locations, setLocations] = useState([]);
  // useEffect(() => {
  //   API.parking_lots.get()
  //     .then((res) => setLocations(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const notifications = [{ position: "Parking lot 1 - 2F A03", overtime: "33hr 03min" }, { position: "Parking lot 2 - 4F C04", overtime: "24hr 03min" }]


  return (
    <>
      <Header togglerType={TOGGLER_TYPE.COLLAPSE_GUARD} />
      <SubHeader BACK_ICON={false} LEFT_STR="Notification" RHS_INFO={INFO_TYPE.NONE} />
      <NotifyList notifications={notifications} />
    </>
  );
}

export default Notification;