import {
  Table,
  Row,
  Col
} from 'reactstrap';
import React from 'react';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { v4 as uuidv4 } from 'uuid';
import ChangingProgressProvider from "./utils/ChangingProgressProvider";
import 'react-circular-progressbar/dist/styles.css';

import './DashBoard.css';



function ProgressBar() {

  let locations = [
    {
      name: 'Parking Lot 2',
      remain: 84,
      cap: 100,
      priority: true
    },
    {
      name: 'Parking Lot 3',
      remain: 62,
      cap: 100,
    },
    {
      name: 'Parking Lot 4',
      remain: 60,
      cap: 100,
    },
    {
      name: 'Parking Lot 5',
      remain: 88,
      cap: 100,
      priority: true
    },
    {
      name: 'Parking Lot 6',
      remain: 66,
      cap: 100,
    },
  ]
  // calculate all the remain spots
  const available = locations.reduce((acc, cur) => acc + cur.remain, 0);
  // calculate all the capacity
  const capacity = locations.reduce((acc, cur) => acc + cur.cap, 0);
  // calculate the percentage
  const percentage = Math.round(available / capacity * 100);

  return (
    <div className="DashBoard-Container" >
      <Header togglerType={TOGGLER_TYPE.EXIT} />
      <SubHeader BACK_ICON={false} LEFT_STR="Dashboard" RHS_INFO={INFO_TYPE.ANALYSIS} />

      <div className="ProgressBar-Container-Outer">
        <div className="ProgressBar-Container">
          <ChangingProgressProvider values={[0, percentage]}>
            {percentage => (
              <CircularProgressbarWithChildren value={percentage} strokeWidth={2} counterClockwise>
                <div className='ProgressTitle'> {`${available} (${percentage}%)`} </div>
                <div className='ProgressSubTitle'> {`out of ${capacity} parking spots used`} </div>
              </CircularProgressbarWithChildren>
            )}
          </ChangingProgressProvider>
          {/* <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={2} counterClockwise />; */}
        </div>
      </div>

      <Row>
        <Col xs={{ size: 10, offset: 1 }} className='loc-list-col'>
          <Table hover className='loc-list-table'>
            <tbody>
              {
                locations.map((location) => (
                  <tr className='loc-list-tr' key={uuidv4()}>
                    <td className='name-td'>{location.name}</td>
                    <td className='remain-td'><b className='count-span'> {`${location.remain} / ${location.cap}`} </b>spots</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </div >
  );
}

export default ProgressBar;