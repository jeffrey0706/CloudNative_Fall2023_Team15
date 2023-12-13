import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import ViewLots, { LOT_STATUS } from '../../ui/Component/ViewLots';
import { expect } from '@jest/globals';

const setup =(section, lotsStatus) => {
    render(<ViewLots SECTION={section} LOTs_STATUS={lotsStatus}/>);
}

afterEach(cleanup);

test('Check layout', () => {
    // Setup
    const section = 'TEST';
    const lotsStatus = [
        LOT_STATUS.APPROACHING,
        LOT_STATUS.PARKED,
        LOT_STATUS.OCCUPIED,
        LOT_STATUS.EMPTY,
    ];
    setup(section, lotsStatus);

    // Action
    const grids = document.getElementsByClassName('grid-item');
    const first = screen.getByText('TEST01');
    const second = screen.getByText('TEST02');
    const img = document.getElementsByTagName('img');

    // Assertion
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(grids.length).toBe(4);
    expect(first).toHaveClass('approaching');
    expect(second).toHaveClass('parked');
    expect(img.length).toBe(1);
});