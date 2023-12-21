import './ReserveButton.css';
import { Button, Row, Col, Container } from 'reactstrap';
import React from 'react';

function ReserveButton({ text = 'Reserve', onClick = () => { }, color = 'danger', outline = false, up_shift = false }) {
  return (
    <Container className={`reserve-button-container ${up_shift ? 'up_shift' : ''}`}>
      <Row>
        <Col xs={{ offset: 1, size: 10 }} md={{ offset: 3, size: 6 }}>
          <Button className='reserve-button' outline={outline} color={color} onClick={onClick}>{text}</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReserveButton;
