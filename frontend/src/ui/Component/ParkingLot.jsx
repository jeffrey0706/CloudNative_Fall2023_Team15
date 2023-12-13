import './ParkingLot.css';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import React from 'react';
import ViewLots, { LOT_STATUS } from '../Component/ViewLots';
import RoadLineVertical from '../../assets/RoadLineVertical.svg';
import RoadLineHorizontal from '../../assets/RoadLineHorizontal.svg';


function ParkingLot({ layout = [['A', 'B'], ['C', 'D']], LotPosition, onClick = () => { } }) {

  if (layout.length === 0) {
    throw new Error('Layout error, it should be a 2D array');
  }
  else {
    for (let i = 0; i < layout.length; i++) {
      if (!Array.isArray(layout[i])) {
        throw new Error('Layout error, it should be a 2D array');
      }
    }
  }

  const render_lots = (LotPosition, sect) => {
    let array = [];
    for (let i = 0; i < 6; i++) {
      let randomNumber = Math.floor(Math.random() * Object.keys(LOT_STATUS).length); // Generates a random number between 0 and 3
      array.push(randomNumber);
    }
    return (
      <div className="wrap-lots-container-1x">
        <ViewLots LotPosition={LotPosition} SECTION={sect} LOTs_STATUS={array} onClick={onClick} FONT_SIZE={12} />
      </div>
    )
  }

  return (
    <div className='parking-lot-root'>
      <img className='RoadLineVertical' src={RoadLineVertical} alt="" />
      <img className='RoadLineHorizontal' src={RoadLineHorizontal} alt="" />
      <Container className="wrap-lots-container-4x">
        {
          layout.map((row, rowIndex) => (
            <Row className="wrap-lots-container-2x" key={rowIndex}>
              {
                row.map((col, colIndex) => (
                  <Col key={colIndex}>
                    {render_lots(LotPosition, col)}
                  </Col>
                ))
              }
            </Row>
          ))
        }
      </Container>
    </div>
  );
}

export default ParkingLot;
