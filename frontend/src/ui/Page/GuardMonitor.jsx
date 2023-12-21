import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ParkingLot from '../Component/ParkingLot';
import Floors from '../Component/Floors';
import moment from 'moment';
import { API } from '../Api';

const layout = [['A', 'B'], ['C', 'D']];
const floors = ['1F', '2F', '3F', '4F'];
const toLocalTime = (utcTime) => {
  if (utcTime) {
    const localTime = moment.utc(utcTime).local();
    return localTime.format('YYYY/MM/DD HH:mm:ss');
  }
  else {
    return "";
  }
}

function GuardMonitor() { // TODO: How to access the data

  const navigate = useNavigate();

  const location = useLocation();
  const { PKLotName, PKLotId } = location.state || {};
  const [monitorMap, setMonitorMap] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(floors[0]);
  const [lotPosition, setLotPosition] = useState('');
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([[[], []], [[], []]]);

  const gatherData = (spots, col) => {
    const unsorted = [];
    spots.forEach((spot) => {
      if (spot.area_name === col) {
        unsorted.push(spot);
      }
    })
    unsorted.sort((a, b) => a.spot_number - b.spot_number);

    const occipied = unsorted.map((spot) => Number(spot.status));
    return occipied;
  }

  useEffect(() => {
    API.map.get(PKLotId, Number(currentFloor.replace('F', '')))
      .then((res) => {
        const datas = [];
        layout.forEach((row, rowIdx) => {
          const rowData = [];
          row.forEach((col, colIdx) => {
            const colData = gatherData(res.data, col);
            rowData.push(colData);
          })
          datas.push(rowData);
        })
        setMonitorMap(res.data);
        setDatas(datas);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [PKLotName, PKLotId, currentFloor]);

  const onFloorBtnClick = (event) => {
    setCurrentFloor(event.target.innerText);
    setLotPosition(PKLotName + ' -> ' + event.target.innerText);
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
    const LotInfo = event.target.parentNode.id || event.target.id;
    const area = LotInfo.split(" -> ").at(-1).substr(0, 1);
    const number = Number(LotInfo.split(" -> ").at(-1).substr(1));
    const spotId = monitorMap.find((spot) => spot.area_name === area && spot.spot_number === number).spot_id;
    API.history.get(spotId)
      .then((res) => {
        // const compress = res.data.reduce((result, cur) => {
        //   const existingGroup = result.find(group => group.id === cur.user_id);
        //   if (existingGroup) {
        //     existingGroup.data = {...existingGroup.data, ...cur};
        //   } else {
        //     result.push({
        //       id: cur.user_id,
        //       data: cur,
        //     });
        //   }
        //   return result;
        // }, []);
        const history = res.data.map((d) => {
          if (d.park_time && d.reservation_time) {
            return {
              License: d.license,
              User: d.user_id,
              Reservation: toLocalTime(d.reservation_time),
              Expired: toLocalTime(d.expired_time),
              Aparture: toLocalTime(d.park_time),
              Departure: toLocalTime(d.exit_time),
            }
          }
          else if (d.reservation_time) {
            return {
              License: d.license,
              User: d.user_id,
              Reservation: toLocalTime(d.reservation_time),
              Expired: toLocalTime(d.expired_time),
            }
          }
          else {
            return {
              License: d.license,
              User: d.user_id,
              Aparture: toLocalTime(d.park_time),
              Departure: toLocalTime(d.exit_time),
            }
          }
        });
        navigate('/guard/monitor/detail', { state: { LotInfo, history }});
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.COLLAPSE_GUARD} />
      <SubHeader BACK_ICON={true} LEFT_STR={PKLotName} RHS_INFO={INFO_TYPE.NONE} onBackIconClick={onBackIconClick} />
      {
        loading ?
          (
            <div style={{
              height: "100vmin",
              width: "100vmin",
              justifyContent: "center",
              display: "flex",
            }}>
              <Spinner color='warning' style={{ height: "45vmin", width: "45vmin" }} />
            </div>
          )
          :
          (<ParkingLot layout={layout} LotPosition={lotPosition} onClick={onLotClick} datas={datas} />)
      }
      <Floors floors={floors} currentFloor={currentFloor} onClick={onFloorBtnClick} />
    </>
  );
}

export default GuardMonitor;
