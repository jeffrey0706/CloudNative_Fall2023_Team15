import './GuardAnalysis.css';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import Floors from '../Component/Floors';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fakeGuardAnalysisData } from '../Constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function GuardAnalysis() {

  const navigate = useNavigate();
  const location = useLocation();

  const { AllPKLotName } = location.state || {};

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
      {
        label: 'Area D',
        data: fakeGuardAnalysisData[3],
        fill: false,
        borderColor: 'rgb(247, 207, 107)',
        tension: 0.1
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
  }

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR='Analysis' RHS_INFO={INFO_TYPE.DATE} onBackIconClick={onBackIconClick} />

      <div className="dropdown-wrapper">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret className="custom-dropdown-toggle" color="light">
            {selectedItem}
          </DropdownToggle>
          <DropdownMenu className="custom-dropdown-menu">
            {selectedItem !== "All" && <>
              <DropdownItem className="drop-down-item" key="All" onClick={(e) => handleSelect("All", e)} >All</DropdownItem>
              <DropdownItem divider />
            </>
            }
            {AllPKLotName.map((item, index) => (
              <div key={index}>
                <DropdownItem className="drop-down-item" onClick={(e) => handleSelect(item.name, e)} >{item.name}</DropdownItem>
                {index !== AllPKLotName.length - 1 && <DropdownItem divider />}
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
