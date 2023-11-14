import './LocationList.css';
import { 
  Table,
  Row,
  Col
} from 'reactstrap';
import React from 'react';
import { PiWheelchairFill } from "react-icons/pi";

function LocationList() {  

    var locations = [
        {
            name: 'Parking Lot 2',
            remain: 34,
            priority: true
        },
        {
            name: 'Parking Lot 3',
            remain: 32
        },
        {
            name: 'Parking Lot 4',
            remain: 30
        },
        {
            name: 'Parking Lot 5',
            remain: 28,
            priority: true
        },
        {
            name: 'Parking Lot 6',
            remain: 22
        },
        {
            name: 'Parking Lot 7',
            remain: 20
        },
        {
            name: 'Parking Lot 8',
            remain: 3,
            priority: true
        },
    ]
    return (
        <Row>
            <Col xs={{ size: 10, offset: 1 }} className='loc-list-col'>
                <Table hover className='loc-list-table'>
                    <tbody>
                        {
                            locations.map((location) => (
                                <tr className='loc-list-tr'>
                                    <td className='name-td'>{location.name} {location.priority && <PiWheelchairFill className='disable-icon' size={16}/>}</td>
                                    <td className='remain-td'><b className='count-span'>{location.remain}</b>spots</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
  }
  
  export default LocationList;