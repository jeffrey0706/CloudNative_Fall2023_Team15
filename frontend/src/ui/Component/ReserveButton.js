import './ReserveButton.css';
import { Button, Row, Col } from 'reactstrap';
import React from 'react';

function ReserveButton({text='Reserve', onClick=() => {}}) {
  return (
    <Row className='reserve-button-div'>
        <Col xs={{ offset: 'auto', size: 10 }}>
          <Button className='reserve-button' color="danger" onClick={onClick}>{text}</Button>
        </Col>
    </Row>
  );
};

export default ReserveButton;
