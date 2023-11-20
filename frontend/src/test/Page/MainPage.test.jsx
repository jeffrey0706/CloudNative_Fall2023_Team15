import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import MainPage from '../../ui/Page/MainPage';
import { expect } from '@jest/globals';

jest.mock('axios');

const setup = () => {
    render(<MainPage />);
};

const URL_PATTERNS = {
    PROFILE_URL: /profile\/[0-9]+/,
    PARKING_LOT_URL: /parking_lot\/[0-9]+/,
    PARKING_LOTS_URL: /parking_lots/,
}; // TODO: Move to constants
const getUrlType = (url) => {
    for (const [key, value] of Object.entries(URL_PATTERNS)) {
        if (value.test(url)) {
            return key;
        }
    }
    return undefined;
};

afterEach(() => {
    jest.clearAllMocks();
});

test('Fetching correct data', async () => {
    // Setup
    await act(() => {
        axios.get.mockImplementation((url) => {
            const urlType = getUrlType(url);
            switch(URL_PATTERNS[urlType]) {
                case URL_PATTERNS.PROFILE_URL:
                    return Promise.resolve({ data: { preference: 3 } });
                case URL_PATTERNS.PARKING_LOT_URL:
                    return Promise.resolve({ data: { name: 'Test Parking Lot 3' } });
                case URL_PATTERNS.PARKING_LOTS_URL:
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