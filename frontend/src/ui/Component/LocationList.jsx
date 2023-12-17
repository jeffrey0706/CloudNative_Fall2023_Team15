import './LocationList.css';
import {
    Table,
    Row,
    Col
} from 'reactstrap';
import React from 'react';
import { PiWheelchairFill } from "react-icons/pi";

export const LOCATION_LIST_MODE = {
    REMAIN: 0,
    FRACTION: 1,
}

function LocationList({ mode = LOCATION_LIST_MODE.REMAIN, locations = [], setCurrentLocation = () => { } }) {

    const getClassName = (mode) => {
        if (mode === LOCATION_LIST_MODE.REMAIN)
            return ' remain-loc-list'
        else if (mode === LOCATION_LIST_MODE.FRACTION)
            return ' fraction-loc-list'
        else
            return ' '
    }

    const showInfo = (mode, location) => {
        if (mode === LOCATION_LIST_MODE.REMAIN) {
            return (
                <td className='remain-td'>
                    <b className='remain-span'>{location.current_capacity}</b>spots
                </td>
            )
        }
        else if (mode === LOCATION_LIST_MODE.FRACTION) {
            return (
                <td className='fraction-td'>
                    <b className='fraction-span'> {`${location.current_capacity} / ${location.maximum_capacity}`}</b>spots
                </td>
            )
        }
        else {
            return (<></>)
        }
    }

    return (
        <Row className={'loc-list-comp' + getClassName(mode)}>
            <Col xs={{ size: 10, offset: 1 }} className='loc-list-col'>
                <Table hover className='loc-list-table'>
                    <tbody>
                        {
                            locations.map((location, index) => (
                                <tr className='loc-list-tr' key={'location' + index} id={location.name} onClick={() => setCurrentLocation(location)} >
                                    <td className='name-td'>{location.name} {mode === LOCATION_LIST_MODE.REMAIN && location.priority && <PiWheelchairFill className='disable-icon' size={16} />}</td>
                                    {showInfo(mode, location)}
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