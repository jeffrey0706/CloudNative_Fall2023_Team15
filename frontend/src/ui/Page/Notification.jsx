// import './Notification.css';
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import NotifyList from '../Component/NotifyList';

// Production API
import { API } from '../Api';
import { fakeReservation } from '../Constants';

function Notification() {

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    API.expired_alert.get()
      .then((res) => {
        console.log(res.data)
        setNotifications(res.data)
        if (notifications.length === 0) {
          setNotifications(fakeReservation)
        }
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <Header togglerType={TOGGLER_TYPE.COLLAPSE_GUARD} currPage="notification" />
      <SubHeader BACK_ICON={false} LEFT_STR="Notification" RHS_INFO={INFO_TYPE.NONE} />
      <NotifyList notifications={notifications} />
    </>
  );
}

export default Notification;