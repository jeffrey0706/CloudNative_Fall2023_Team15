import './GuardMonitorDetailBlock.css';
import React from 'react';
import {
    Table,
    Row,
    Col
} from 'reactstrap';

function GuardMonitorDetailBlock({ parking_status }) {
    return (
        <Row className='block-container'>
            <Col>
                <Table className="rounded-table">
                    <tbody>
                        {Object.keys(parking_status).map(key => (
                            key === 'License' ?
                                (<tr className='loc-list-tr' key={parking_status[key]}>
                                    <td className='car-plate' colSpan={2}>{parking_status[key]}</td>
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
