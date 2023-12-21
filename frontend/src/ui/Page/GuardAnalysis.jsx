import './GuardAnalysis.css';
import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import Floors from '../Component/Floors';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { allFakeGuardAnalysisData } from '../Constants';
import { API } from '../Api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function GuardAnalysis() {

  const navigate = useNavigate();
  const location = useLocation();

  const [locations, setLocations] = useState(location.state.locations);
  const [fakeGuardAnalysisData, setFakeGuardAnalysisData] = useState(allFakeGuardAnalysisData[0][0]);

  const onBackIconClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    }
    else {
      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    if (!locations) {
      API.parking_lots.get()
        .then((res) => setLocations(res.data))
        .catch((err) => console.log(err));
    }
  }, [locations]);

  const data = {
    labels: [
      // from 00 to 24 hr
      '00', '03', '06', '09', '12', '15', '18', '21', '24'
    ],
    datasets: [
      {
        label: 'All',
        data: fakeGuardAnalysisData[0].map((_, col) => fakeGuardAnalysisData.reduce((sum, row) => sum + row[col], 0) / 4),
        fill: false,
        borderColor: 'rgb(41, 44, 51)',
        tension: 0.1,
      },
      {
        label: 'Area A',
        data: fakeGuardAnalysisData[0],
        fill: false,
        borderColor: 'rgb(109, 189, 191)',
        tension: 0.1
      },
      {
        label: 'Area B',
        data: fakeGuardAnalysisData[1],
        fill: false,
        borderColor: 'rgb(241, 163, 84)',
        tension: 0.1
      },
      {
        label: 'Area C',
        data: fakeGuardAnalysisData[2],
        fill: false,
        borderColor: 'rgb(87, 160, 229)',
        tension: 0.1
      },
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    plugins: {
      legend: {
        position: 'bottom', // Positioning the legend at the bottom
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          padding: 18,
        },
      }
    }
  };


  const floors = ['1F', '2F', '3F', '4F'];
  const [currentFloor, setCurrentFloor] = useState(floors[0]);
  const onFloorBtnClick = (event) => {
    setCurrentFloor(event.target.innerText);
  }


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");
  const [selectedItemId, setSelectedItemId] = useState(0);

  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
  }

  const handleSelect = (item_id, item_name) => {
    setSelectedItem(item_name);
    setSelectedItemId(item_id);
  };


  useEffect(() => {
    const floorIndex = parseInt(currentFloor) - 1;
    const newData = allFakeGuardAnalysisData[selectedItemId][floorIndex];
    setFakeGuardAnalysisData(newData);
  }, [currentFloor, selectedItemId]);

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.COLLAPSE_GUARD} />
      <SubHeader BACK_ICON={true} LEFT_STR='Analysis' RHS_INFO={INFO_TYPE.DATE} onBackIconClick={onBackIconClick} />

      <div className="dropdown-wrapper">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret className="custom-dropdown-toggle" color="light">
            {selectedItem}
          </DropdownToggle>
          <DropdownMenu className="custom-dropdown-menu">
            {selectedItem !== "All" && <>
              <DropdownItem className="drop-down-item" key="All" onClick={() => handleSelect(0, "All")} >All</DropdownItem>
              <DropdownItem divider />
            </>
            }
            {locations?.map((item, index) => (
              <div key={index}>
                <DropdownItem className="drop-down-item" key={item.name} onClick={() => handleSelect(item.parkinglot_id, item.name)} >{item.name}</DropdownItem>
                {index !== locations.length - 1 && <DropdownItem divider />}
              </div>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="line-chart-wrapper">
        <Line data={data} options={options} />
      </div>
      <Floors floors={floors} currentFloor={currentFloor} onClick={onFloorBtnClick} />
    </>
  );
}

export default GuardAnalysis;
