import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ParkingLot from '../../ui/Component/ParkingLot';

afterEach(cleanup);

// const setup = (locations) => {
//     render(<ParkingLot />);
// }

describe('ParkingLot Component', () => {

    // setup();

    test('renders with default layout', () => {
        const { container } = render(<ParkingLot />);
        const colElements = container.querySelectorAll('.col');
        expect(colElements.length).toBe(4);

        const img1 = container.querySelector('.RoadLineVertical');
        const img2 = container.querySelector('.RoadLineHorizontal');
        expect(img1).toBeInTheDocument();
        expect(img2).toBeInTheDocument();
    });

});

