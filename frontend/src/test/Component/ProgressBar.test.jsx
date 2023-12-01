import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProgressBar from '../../ui/Component/ProgressBar';

// Mock the CircularProgressbarWithChildren if needed
jest.mock('react-circular-progressbar', () => ({
    CircularProgressbarWithChildren: ({ value, children }) => <div data-testid="circular-progress-bar">{children}</div>
}));

describe('ProgressBar Component', () => {
    // const testLocations = [
    //     { remain: 50, capacity: 100 },
    //     { remain: 30, capacity: 50 }
    // ];
    const testLocations = [
        {
            name: 'Parking Lot 2',
            remain: 34,
            capacity: 70,
            priority: true,
        },
        {
            name: 'Parking Lot 3',
            remain: 32,
            capacity: 40,
        }
    ]
    // test('renders with default props', () => {
    //     render(<ProgressBar />);
    //     expect(screen.getByText('0 (0%)')).toBeInTheDocument();
    //     expect(screen.getByText('out of 0 parking spots used')).toBeInTheDocument();
    // });

    test('renders correctly with locations prop', async () => {
        render(<ProgressBar locations={testLocations} />);
        await waitFor(() => {
            expect(screen.getByText('66 (60%)')).toBeInTheDocument();
            expect(screen.getByText('out of 110 parking spots used')).toBeInTheDocument();
        }, { timeout: 3000 });
    });

});
