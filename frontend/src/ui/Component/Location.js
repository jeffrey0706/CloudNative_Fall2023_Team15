import './Location.css';
import { 
  Badge,
  Row,
  Col
} from 'reactstrap';
import React, { useState } from 'react';
import { FiMap } from 'react-icons/fi';

function Header() {

  const [currentPlace, setCurrentPlace] = useState("Parking Lot 1");

  return (
    <Row className='location'>
        <Col xs={{ offset: 'auto', size: 8 }}><Badge className='text-dark now-location'>{currentPlace}</Badge></Col>
        <Col xs={{ size: 2 }}><Badge color='dark' className='map-icon'><FiMap size={20}/></Badge></Col>
    </Row>
  );

  // TODO: Add location list and testcase
}

export default Header;
