import './GuardAnalysis.css';
import React, { useState } from 'react';
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
        label: '1F',
        data: fakeGuardAnalysisData[0],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '2F',
        data: fakeGuardAnalysisData[1],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '3F',
        data: fakeGuardAnalysisData[2],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '4F',
        data: fakeGuardAnalysisData[3],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
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
      }
    }
  };

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR='Analysis' RHS_INFO={INFO_TYPE.DATE} onBackIconClick={onBackIconClick} />
      <div className="line-chart-wrapper">
        <Line data={data} options={options} />
      </div>
      <Floors floors={floors} currentFloor={currentFloor} onClick={onFloorBtnClick} />
    </>
  );
}

export default GuardAnalysis;
