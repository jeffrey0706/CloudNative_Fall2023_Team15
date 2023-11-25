import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import ViewLotsSet from '../../ui/Component/ViewLotsSet';
import { LOT_STATUS } from '../../ui/Component/ViewLots';
import { expect } from '@jest/globals';
import { act } from 'react-dom/test-utils';

const setup =(section, lotsStatus) => {
    render(<ViewLotsSet SECTION={section} LOTs_STATUS={lotsStatus}/>);
}

afterEach(cleanup);

test('Check layout', async () => {
    // Setup
    const section = 'D';
    const lotsStatus = [
        LOT_STATUS.APPROACHING,
        LOT_STATUS.PARKED,
        LOT_STATUS.OCCUPIED,
        LOT_STATUS.EMPTY,
    ];
    await act(() => setup(section, lotsStatus));

    // Action
    const grids = document.getElementsByClassName('grid-item');
    const sectionImg = document.getElementsByClassName('SectionImg')[0];

    // Assertion
    expect(grids.length).toBe(4);
    expect(sectionImg).toBeInTheDocument();
    expect(sectionImg.src).toContain(`section${section}`);
});