import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LocationList from '../../ui/Component/LocationList';

const setup = (locations) => {
    render(<LocationList locations={locations}/>);
}

test('Count the length of list and disable icon', () => {
    // Setup
    const locations = [
        {
            name: 'Test location 1',
            remain: 18,
            priority: true
        },
        {
            name: 'Test location 2',
            remain: 32
        }
    ];
    setup(locations);

    // Action
    const button = document.querySelectorAll('.loc-list-tr');
    const icon = document.querySelectorAll('.disable-icon');

    // Assertion
    expect(button.length).toBe(locations.length);
    expect(icon.length).toBe(locations.filter(location => location.priority).length);
});