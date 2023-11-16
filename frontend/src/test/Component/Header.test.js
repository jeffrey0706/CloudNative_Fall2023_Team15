import '@testing-library/jest-dom';
import { render, waitFor, act } from '@testing-library/react';
import Header, {TOGGLER_TYPE} from '../../ui/Component/Header';
import { describe, expect } from '@jest/globals';

const setup =(togglerType) => {
    render(<Header togglerType={togglerType}/>);
}

describe('`COLLAPSE` mode', () => {

    test('Check layout', () => {
        // Setup
        setup(TOGGLER_TYPE.COLLAPSE);

        // Action
        const toggler = document.querySelector('.navbar-toggler');
        const exitBtn = document.querySelector('.exit-btn');

        // Assertion
        expect(toggler).toBeInTheDocument('display: inline-block;');
        expect(exitBtn).not.toBeInTheDocument();
    });

    test('Modal exist after toggle', async () => {
        // Setup
        setup(TOGGLER_TYPE.COLLAPSE);

        // Action
        const toggler = document.querySelector('.navbar-toggler');
        act(() => toggler.click());

        // Assertion
        const modal = document.querySelector('.header-modal');
        await waitFor(() => expect(modal).toBeInTheDocument());
    });


    test('Modal closed after toggle twice', async () => {
        // Setup
        setup(TOGGLER_TYPE.COLLAPSE);

        // Action
        const toggler = document.querySelector('.navbar-toggler');
        act(() => toggler.click());
        const closeBtn = document.querySelector('.close-btn');
        act(() => closeBtn.click());

        // Assertion
        const modal = document.querySelector('.header-modal');
        await waitFor(() => expect(modal).not.toBeInTheDocument());
    });

});

describe('`EXIT` mode', () => {

    test('Check layout', () => {
        // Setup
        setup(TOGGLER_TYPE.EXIT);

        // Action
        const toggler = document.querySelector('.navbar-toggler');
        const exitBtn = document.querySelector('.exit-btn');

        // Assertion
        expect(toggler).not.toBeInTheDocument();
        expect(exitBtn).toBeInTheDocument();
    });

});

// TODO: Fix and test the web version by setting the window size
// Currently, the window size is not able to be set in the test environment
// However, this may be a issue of the testing library, aka. jsdom