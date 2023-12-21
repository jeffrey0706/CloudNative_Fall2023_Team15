import './Floors.css';
import { Button } from 'reactstrap';
import React from 'react';


function Floors({ floors=[], currentFloor='', onClick=()=>{} }) {
  return (
    <div className="floors-container">
      {
        floors.map((floor, index) => (
          <Button
          key={index}
          outline={currentFloor !== floor}
          color='dark'
          className={`floor ${currentFloor === floor ? 'clicked_floor' : ''}`}
          onClick={onClick}
          >
            {floor}
          </Button>
        ))
      }
    </div>
  );
}

export default Floors;
