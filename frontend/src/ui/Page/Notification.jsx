// import './Notification.css';
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import NotifyList from '../Component/NotifyList';
import moment from 'moment';

// Production API
import { API } from '../Api';
import { fakeReservation } from '../Constants';

function Notification() {

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    API.expired_alert.get()
      .then((res) => {
        console.log(res.data)
        if (res.data.length === 0) {
          setNotifications(fakeReservation);
        }
        else {
          setNotifications(res.data.map((item) => {
            const duration = moment.duration(moment.duration(item.total_time, 'seconds'));
            const dayString = duration.days() > 0 ? `${duration.days()}d ` : '';
            const hourString = duration.hours() > 0 ? `${duration.hours()}h ` : '';
            const minuteString = `${duration.minutes()}m`;
            const overtime = dayString + hourString + minuteString;
            return {
              parkingLot: item.parking_lot_name,
              floor: item.area_floor,
              area: item.area_name,
              spot: item.parking_spot_number,
              license: item.car_license,
              overtime: overtime,
            };
          }));
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