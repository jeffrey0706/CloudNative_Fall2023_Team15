import './NotifyList.css';
import {
    Table,
    Row,
    Col
} from 'reactstrap';
import React from 'react';


function NotifyList({ notifications }) {
    console.log(notifications)

    return (
        <Row className='loc-list-comp'>
            <Col xs={{ size: 10, offset: 1 }} className='loc-list-col'>
                <Table hover className='loc-list-table'>
                    <tbody>
                        {
                            notifications.map((notification, index) => (
                                <tr className='loc-list-tr' key={'location' + index} id={index} >
                                    <td className='name-td'>
                                        {notification.position}
                                    </td>
                                    <td className='remain-td'>
                                        {notification.overtime}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default NotifyList;