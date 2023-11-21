/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import MainPage from '../../ui/Page/MainPage';
import { expect } from '@jest/globals';
import { API_PATTERNS, getApiType } from '../../ui/Constants';

jest.mock('axios');

const setup = () => {
    render(<MainPage />);
};

afterEach(() => {
    jest.clearAllMocks();
});

test('Fetching correct data', async () => {
    // Setup
    await act(() => {
        axios.get.mockImplementation((url) => {
            const apiType = getApiType(url);
            switch(API_PATTERNS[apiType]) {
                case API_PATTERNS.PROFILE:
                    return Promise.resolve({ data: { preference: 3 } });
                case API_PATTERNS.PARKING_LOT:
                    return Promise.resolve({ data: { name: 'Test Parking Lot 3' } });
                case API_PATTERNS.PARKING_LOTS:
                    return Promise.resolve({ data: [
                        { name: 'Test Location 1', remain: 34, priority: true },
                        { name: 'Test Location 2', remain: 32 },
                        { name: 'Test Location 3', remain: 30 },
                        { name: 'Test Location 4', remain: 28, priority: true },
                        { name: 'Test Location 5', remain: 22 },
                        { name: 'Test Location 6', remain: 20 },
                        { name: 'Test Location 7', remain: 3, priority: true },
                    ] });
                default:
                    return Promise.reject(new Error('URL not found'));
            }
        });
    });
    setup();

    // Action
    const currentPlace = await screen.findByText('Test Parking Lot 3');
    const locations = await waitFor(() => document.getElementsByClassName('loc-list-tr'));

    // Assertion
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(currentPlace).toBeInTheDocument();
    expect(locations).toHaveLength(7);
    for (let i = 0; i < locations.length; i++) {
        expect(locations[i]).toHaveTextContent('Test Location ' + (i + 1));
    }
});