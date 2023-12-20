import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import ParkingLot from '../Component/ParkingLot';
import Floors from '../Component/Floors';
import { API } from '../Api';

const layout = [['A', 'B'], ['C', 'D']];
const floors = ['1F', '2F', '3F', '4F'];

function GuardMonitor() { // TODO: How to access the data

  const navigate = useNavigate();

  const location = useLocation();
  const { PKLotName, PKLotId } = location.state || {};
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
    const LotInfo = event.target.parentNode.id || event.target.id
    navigate('/guard/monitor/detail', { state: { LotInfo: LotInfo } })
  }

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR={PKLotName} RHS_INFO={INFO_TYPE.NONE} onBackIconClick={onBackIconClick} />
      {
        loading ?
          (
            <div style={{
              height: "100vmin",
              width: "100vmin",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}>
              <Spinner color='primary' style={{ height: "30vmin", width: "30vmin" }} />
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
