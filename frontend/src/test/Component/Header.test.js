import '@testing-library/jest-dom';
import { render, waitFor, act } from '@testing-library/react';
import Header from '../../ui/Component/Header';

beforeEach(() => {
    render(<Header />);
})

test('Before clicking NavbarToggle', () => {
    // Action
    const collapsed = document.querySelector('.navbar-collapse');

    // Assertion
    expect(collapsed.classList.contains('show')).toBe(false);
});

test('After clicking NavbarToggle', async () => {
    // Action
    const toggleButton = document.querySelector('.navbar-toggler');
    const collapsed = document.querySelector('.navbar-collapse');
    act(() => toggleButton.click());

    // Assertion
    await waitFor(() => {
        expect(collapsed.classList.contains('show')).toBe(true);
    });
});