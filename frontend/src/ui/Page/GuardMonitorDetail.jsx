// import './GuardMonitorDetail.css';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import GuardMonitorDetailBlock from '../Component/GuardMonitorDetailBlock';

function GuardMonitorDetail() {

  const navigate = useNavigate();

  const location = useLocation();
  const { LotInfo, history } = location.state;
  const section = LotInfo.split(" -> ")[1];

  const onBackIconClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    }
    else {
      navigate('/', { replace: true });
    }
  }

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={true} LEFT_STR={section} RHS_INFO={INFO_TYPE.DATE} onBackIconClick={onBackIconClick} />

      {/* for each fake History create a GuardMonitorBlock */}
      {history.map((history, index) => (
        <div key={index} style={{ display: "flex", justifyContent: "center" }}>
          <GuardMonitorDetailBlock parking_status={history} />
        </div>
      ))}
    </>
  );
}

export default GuardMonitorDetail;
