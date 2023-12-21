import './NotifyList.css';
import {
    Table,
    Row,
    Col
} from 'reactstrap';
import React from 'react';

const getLocationString = (parkingLot, floor, area, spot) => {
    const areaString = `${area}${spot.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
    return `${parkingLot} - ${floor}F ${areaString}`;
}

const getSeconds = (overtime) => {
    const split = overtime.split(' ');
    var seconds = 0;
    split.forEach((item) => {
        switch (item[item.length - 1]) {
            case 'd':
                seconds += parseInt(item) * 24 * 60 * 60;
                break;
            case 'h':
                seconds += parseInt(item) * 60 * 60;
                break;
            case 'm':
                seconds += parseInt(item) * 60;
                break;
            default:
                break;
        }
    });
    return seconds;
}

function NotifyList({ notifications }) {
    const sortedNotifications = notifications.sort((a, b) => {
        return getSeconds(b.overtime) - getSeconds(a.overtime);
    });

    return (
        <Row className='loc-list-comp'>
            <Col xs={{ size: 10, offset: 1 }} className='loc-list-col'>
                <Table hover className='loc-list-table'>
                    <tbody>
                        {
                            sortedNotifications.map((notification, index) => (
                                <tr className='loc-list-tr' key={'location' + index} id={index} >
                                    <td className='location-td'>
                                        {getLocationString(notification.parkingLot, notification.floor, notification.area, notification.spot)}
                                    </td>
                                    <td className='license-td' colSpan={4}>
                                        <i>{notification.license}</i>
                                    </td>
                                    <td className='overtime-td' style={{ fontWeight: "500" }}>
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