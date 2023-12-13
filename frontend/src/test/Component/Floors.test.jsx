import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import Floors from '../../ui/Component/Floors';
import { expect } from '@jest/globals';

const setup =(floors, currentFloor, onClick) => {
    render(<Floors floors={floors} currentFloor={currentFloor} onClick={onClick}/>);
}

afterEach(cleanup);

test('Check layout', () => {
    // Setup
    const floors = ['T5F', 'T6F', 'T7F'];
    const currentFloor = 'T7F';
    const onClick = jest.fn();
    setup(floors, currentFloor, onClick);

    // Action
    const T5F = screen.getByText('T5F');
    const T6F = screen.getByText('T6F');
    const T7F = screen.getByText('T7F');

    // Assertion
    expect(T5F).toBeInTheDocument();
    expect(T6F).toBeInTheDocument();
    expect(T7F).toBeInTheDocument();
    expect(T5F).not.toHaveClass('clicked_floor');
    expect(T6F).not.toHaveClass('clicked_floor');
    expect(T7F).toHaveClass('clicked_floor');
    expect(T5F).toHaveClass('btn-outline-dark');
    expect(T6F).toHaveClass('btn-outline-dark');
    expect(T7F).not.toHaveClass('btn-outline-dark');
});

test('Check onClick', () => {
    // Setup
    const floors = ['T5F', 'T6F', 'T7F'];
    const currentFloor = 'T7F';
    const onClick = jest.fn();
    setup(floors, currentFloor, onClick);

    // Action
    const T5F = screen.getByText('T5F');
    T5F.click();

    // Assertion
    expect(onClick).toHaveBeenCalledTimes(1);
});