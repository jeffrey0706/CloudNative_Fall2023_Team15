import './Location.css';
import { 
  Badge,
  Row,
  Col
} from 'reactstrap';
import React, { useState } from 'react';
import { FiMap } from 'react-icons/fi';
import { SlTarget } from "react-icons/sl";

function Location() {

  // eslint-disable-next-line
  const [currentPlace, setCurrentPlace] = useState("Parking Lot 1");

  return (
    <div className='loc-div'>
      <Row className='location'>
          <Col xs={{ size: 8 }} className='location-col'><Badge className='text-dark now-location'>{currentPlace}</Badge></Col>
          <Col xs={{ size: 2 }} className='map-icon-col'><Badge color='dark' className='map-icon'><FiMap size={20}/></Badge></Col>
      </Row>
      <Row>
        <Col xs={{ offset: 1, size: 8 }}>
          <SlTarget size={12} color='#52585e' className='target-icon'/>
          <span className='hint-span'>Automatically select the closest space</span>
        </Col>
      </Row>
    </div>
  );
}

export default Location;
