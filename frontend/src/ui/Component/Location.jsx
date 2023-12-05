import './Location.css';
import { 
  Badge,
  Row,
  Col,
  Container
} from 'reactstrap';
import React from 'react';
import { FiMap } from 'react-icons/fi';
import { SlTarget } from "react-icons/sl";

function Location({currentPlace}) {
  return (
    <Container className='loc-div'>
      <Row className='location'>
          <Col xs={{ size: 8 }} sm={{ size: 9 }} className='location-col'><Badge className='text-dark now-location'>{currentPlace || <i>Failed to load location</i>}</Badge></Col>
          <Col xs={{ size: 2 }} sm={{ size: 1 }} className='map-icon-col'><Badge color='dark' className='map-icon'><FiMap size={20}/></Badge></Col>
      </Row>
      <Row>
        <Col xs={{ offset: 1, size: 10 }}>
          <SlTarget size={12} color='#52585e' className='target-icon'/>
          <span className='hint-span' style={{fontSize: "12px"}}>Automatically select the preferred space</span>
        </Col>
      </Row>
    </Container>
  );
}

export default Location;
