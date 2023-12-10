import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MainPage from '../../ui/Page/MainPage';
import { expect } from '@jest/globals';
import { API_PATTERNS, getApiType } from '../../ui/Constants';

jest.mock('axios');

const setup = () => {
    // Wrap MainPage with BrowserRouter to avoid error caused by useNavigate
    render(<BrowserRouter><MainPage /></BrowserRouter>);
};

afterEach(() => {
    jest.clearAllMocks();
});

test('Fetching correct data', async () => {
    // Setup
    const profileId = 1;
    const preference_lot_id = 2;
    const preference_lot_name = 'Test Parking Lot 3';
    const preference_area_id = 4;
    const preference_area_name = 'Test Area 5';
    const preference = 6;
    const role = 'employee';
    const priority = NaN;
    const expired = NaN;
    await act(() => {
        axios.get.mockImplementation((url) => {
            const apiType = getApiType(url);
            switch(API_PATTERNS[apiType]) {
                case API_PATTERNS.PROFILE:
                    return Promise.resolve({ data: {  
                            id: profileId,  
                            preference_lot_id: preference_lot_id,  
                            preference_lot_name: preference_lot_name,  
                            preference_area_id: preference_area_id,  
                            preference_area_name: preference_area_name,  
                            preference: preference,  
                            role: role,  
                            priority: priority,  
                            expired: expired,  
                    }});
                case API_PATTERNS.PARKING_LOTS:
                    return Promise.resolve({ data: [
                        { parkinglot_id: 1, name: 'Test Location 1', current_capacity: 34, maximum_capacity: 100, priority: true },
                        { parkinglot_id: 2, name: 'Test Location 2', current_capacity: 32, maximum_capacity: 90, priority: false },
                        { parkinglot_id: 3, name: 'Test Location 3', current_capacity: 30, maximum_capacity: 80, priority: true },
                        { parkinglot_id: 4, name: 'Test Location 4', current_capacity: 28, maximum_capacity: 120, priority: false },
                        { parkinglot_id: 5, name: 'Test Location 5', current_capacity: 22, maximum_capacity: 70, priority: true },
                        { parkinglot_id: 6, name: 'Test Location 6', current_capacity: 20, maximum_capacity: 20, priority: false },
                        { parkinglot_id: 7, name: 'Test Location 7', current_capacity: 3, maximum_capacity: 50, priority: true },
                    ] });
                default:
                    return Promise.reject(new Error('URL not found'));
            }
        });
    });
    setup();

    // Action
    const currentPlace = await screen.findByText(preference_lot_name);
    const locations = await waitFor(() => document.getElementsByClassName('loc-list-tr'));

    // Assertion
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(currentPlace).toBeInTheDocument();
    expect(locations).toHaveLength(7);
    for (let i = 0; i < locations.length; i++) {
        expect(locations[i]).toHaveTextContent('Test Location ' + (i + 1));
    }
});

// TODO: Add test for `useNavigate` after it is implemented