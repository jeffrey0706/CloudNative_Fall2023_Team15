import './GuardMonitorDetailBlock.css';
import React from 'react';
import {
    Table,
    Row,
    Col
} from 'reactstrap';

function GuardMonitorDetailBlock({ parking_status }) {
    return (
        <Row className='wrap-container' style={{ 'marginTop': '1.5rem' }}>
            <Col xs={{ size: 10, offset: 1 }}>
                <Table className="rounded-table">
                    <tbody>
                        {Object.keys(parking_status).map(key => (
                            key === 'car_plate' ?
                                (<tr className='loc-list-tr' key={parking_status[key]}>
                                    <td className='car-plate'>{parking_status[key]}</td>
                                    <td></td>
                                </tr>)
                                : (<tr className='loc-list-tr' key={key}>
                                    <td>{key.replace(/_/g, ' ')}</td>
                                    <td>{parking_status[key]}</td>
                                </tr>)
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default GuardMonitorDetailBlock;
