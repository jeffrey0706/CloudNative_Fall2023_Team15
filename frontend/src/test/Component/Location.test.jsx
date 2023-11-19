import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from "react";
import Location from '../../ui/Component/Location';

const setup = (currentPlace) => {
    render(<Location currentPlace={currentPlace}/>);
}

const places = ["Test place"]
test.each(places)('Check current place', (place) => {
    // Setup
    setup(place);

    // Action
    const locationBadge = document.querySelector('.now-location');

    // Assertion
    expect(locationBadge.innerHTML).toBe(place);
});