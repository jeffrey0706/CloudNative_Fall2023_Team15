import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProgressBar from '../../ui/Component/ProgressBar';

// Mock the CircularProgressbarWithChildren if needed
jest.mock('react-circular-progressbar', () => ({
    CircularProgressbarWithChildren: ({ value, children }) => <div data-testid="circular-progress-bar">{children}</div>
}));

describe('ProgressBar Component', () => {
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
    test('renders with default props', async () => {
        render(<ProgressBar />);
        await waitFor(() => {
            expect(screen.getByText('100 (100%)')).toBeInTheDocument();
            expect(screen.getByText('out of 100 parking spots used')).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    test('renders correctly with locations prop', async () => {
        render(<ProgressBar locations={testLocations} />);
        await waitFor(() => {
            expect(screen.getByText('44 (40%)')).toBeInTheDocument();
            expect(screen.getByText('out of 110 parking spots used')).toBeInTheDocument();
        }, { timeout: 2000 });
    });

});
