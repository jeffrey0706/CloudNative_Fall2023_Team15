import './ReserveButton.css';
import { Button, Row, Col, Container } from 'reactstrap';
import React from 'react';

function ReserveButton({text='Reserve', onClick=() => {}, color='danger', outline=false}) {
  return (
    <Container className='reserve-button-container'>
      <Row>
          <Col xs={{ offset: 1, size: 10 }}>
            <Button className='reserve-button' outline={outline} color={color} onClick={onClick}>{text}</Button>
          </Col>
      </Row>
    </Container>
  );
};

export default ReserveButton;
