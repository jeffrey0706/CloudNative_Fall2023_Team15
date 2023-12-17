import './ParkingStatus.css';
import React from 'react';
import {
    Table,
    Row,
    Col
} from 'reactstrap';

function ParkingStatus({ parking_status }) {
    return (
        <Row style={{ 'marginTop': '1.5rem' }}>
            <Col xs={{ size: 10, offset: 1 }}>
                <Table>
                    <tbody>
                        {Object.keys(parking_status).map(key => (
                            <tr className='loc-list-tr' key={key}>
                                <td>{key.replace(/_/g, ' ')}</td>
                                <td>{parking_status[key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default ParkingStatus;
