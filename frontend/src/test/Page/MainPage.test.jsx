import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import MainPage from '../../ui/Page/MainPage';
import { expect } from '@jest/globals';

jest.mock('axios');

const setup = () => {
    render(<MainPage />);
};

test('Fetching correct data', async () => {
    // Setup
    await act(async () => {
        axios.get.mockResolvedValue({
            data: {
                preference: 3,
                name: 'Test Parking Lot 3'
            }
        });
        setup();
    });

    // Action
    const currentPlace = await screen.findByText('Test Parking Lot 3');

    // Assertion
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(currentPlace).toBeInTheDocument();
});