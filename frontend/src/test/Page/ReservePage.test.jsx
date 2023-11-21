import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import ReservePage from '../../ui/Page/ReservePage';
import { expect } from '@jest/globals';
import { API_PATTERNS, getApiType } from '../../ui/Constants';

jest.mock('axios');

const fakeCurrentTime = new Date(2023, 6, 6);
const fakeExpiredTime = new Date(2023, 6, 7);
const fakeAvailableTime = new Date(2023, 6, 5);

const setup = () => {
    render(<ReservePage />);
};

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(fakeCurrentTime.getTime());
});

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.useRealTimers();
});

test.each([fakeExpiredTime, fakeAvailableTime])('Fetching correct data with time %s', async (endTime) => {
    // Setup
    const number = 52;
    const areaName = 'Test Area';
    const parkingLotName = 'Test Parking Lot 3';
    const floor = 3;
    const licensePlate = 'ABC-123';
    await act(() => {
        axios.get.mockImplementation((url) => {
            const apiType = getApiType(url);
            switch(API_PATTERNS[apiType]) {
                case API_PATTERNS.RESERVATION:
                    return Promise.resolve({ data: {
                        car_id: licensePlate,
                        parking_spot_id: 1,
                        end_time: endTime.toJSON(),
                    } });
                case API_PATTERNS.PARKING_SPOT:
                    return Promise.resolve({ data: {
                        area_id: 1,
                        number: number,
                    } });
                case API_PATTERNS.AREA:
                    return Promise.resolve({ data: {
                        parking_lot_id: 1,
                        name: areaName,
                        floor: floor,
                    } });
                case API_PATTERNS.PARKING_LOT:
                    return Promise.resolve({ data: {
                        name: parkingLotName,
                    } });
                default:
                    return Promise.reject(new Error('URL not found'));
            }
        });
    });
    setup();

    // Action
    const licensePlateElement = await screen.findByText(licensePlate);
    const locationElement = await screen.findByText(parkingLotName);
    const parkingSpotElement = await screen.findByText(areaName + number + ' (Floor ' + floor + ')');
    const expiredTimeElement = await screen.findByText(endTime.toJSON());
    const expiredElement = await waitFor(() => screen.queryByText('Expired'));
    const reserveAvailable = await waitFor(() => screen.queryByText('Cancel the Reservation'));
    const reserveExpired = await waitFor(() => screen.queryByText('Reserve a New One'));

    // Assertion
    expect(axios.get).toHaveBeenCalledTimes(4);
    expect(licensePlateElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(parkingSpotElement).toBeInTheDocument();
    expect(expiredTimeElement).toBeInTheDocument();
    if (fakeCurrentTime > endTime) {
        expect(expiredElement).toBeInTheDocument();
        expect(reserveAvailable).not.toBeInTheDocument();
        expect(reserveExpired).toBeInTheDocument();
        expect(reserveExpired).toHaveClass('btn-danger');
    }
    else {
        expect(expiredElement).not.toBeInTheDocument();
        expect(reserveAvailable).toBeInTheDocument();
        expect(reserveExpired).not.toBeInTheDocument();
        expect(reserveAvailable).toHaveClass('btn-outline-dark');
    }
});