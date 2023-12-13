import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProgressBar from '../../ui/Component/ProgressBar';

// Mock the CircularProgressbarWithChildren if needed
// jest.mock('react-circular-progressbar', () => ({
//     CircularProgressbarWithChildren: ({ value, children }) => <div data-testid="circular-progress-bar">{children}</div>
// }));

describe('ProgressBar Component', () => {
    const testLocations = [
        {
          parkinglot_id: 0,
          name: 'Parking Lot 2',
          current_capacity: 34,
          maximum_capacity: 70,
          priority: true,
        },
        {
            parkinglot_id: 1,
            name: 'Parking Lot 3',
            current_capacity: 32,
            maximum_capacity: 40,
            priority: false,
        }
    ]
    test('renders with default props', async () => {
        render(<ProgressBar />);
        const percentage = await screen.findByText('100 (100%)');
        const capacity = await screen.findByText('out of 100 parking spots used');
        expect(percentage).toBeInTheDocument();
        expect(capacity).toBeInTheDocument();
    });

    test('renders correctly with locations prop', async () => {
        render(<ProgressBar locations={testLocations} />);
        const percentage = await screen.findByText('44 (40%)');
        const capacity = await screen.findByText('out of 110 parking spots used');
        expect(percentage).toBeInTheDocument();
        expect(capacity).toBeInTheDocument();
    });
});
