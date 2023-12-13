import './SubHeader.css';
import React from 'react';
import { CiCalendar } from "react-icons/ci";
import analysisImage from '../../assets/Analysis.svg';
import { IoIosArrowRoundBack } from "react-icons/io";

export const INFO_TYPE = {
  NONE: 0,
  DATE: 1,
  EXPIRE: 2,
  ANALYSIS: 3,
};

function SubHeader({ BACK_ICON = false, LEFT_STR = 'LOREM', RHS_INFO = INFO_TYPE.NONE, onBackIconClick=()=>{} }) {

  const render_right = (RHS_INFO) => {
    switch (RHS_INFO) {

      case INFO_TYPE.DATE:
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1; // Months are 0-indexed
        let day = now.getDate();

        // Pad the month and day with a leading zero if they are less than 10
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        let currentDate = `${year}/${month}/${day}`;

        return (
          <div className="DashBoard-Subtitle">
            <CiCalendar /> {currentDate}
          </div>

        )
      case INFO_TYPE.EXPIRE:
        return (
          <div className="DashBoard-Subtitle">
            Expired
          </div>
        )
      case INFO_TYPE.ANALYSIS:
        return (
          <div className="DashBoard-Subtitle">
            <img className='AnalysisImg' src={analysisImage} alt="" />
          </div >
        )
      default:
        return (<></>)
    }
  }


  const render_left = (BACK_ICON, LEFT_STR) => {
    if (BACK_ICON) {
      return (
        <div className="DashBoard-Title">
          <IoIosArrowRoundBack onClick={onBackIconClick}/>
          {LEFT_STR}
        </div>
      )
    }
    else {
      return (<div className="DashBoard-Title">{LEFT_STR}</div>)
    }
  }

  return (
    <div className="DashBoard-Header">
      {render_left(BACK_ICON, LEFT_STR)}
      {render_right(RHS_INFO)}
    </div >
  );
}

export default SubHeader;
