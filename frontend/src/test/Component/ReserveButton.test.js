import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ReserveButton from '../../ui/Component/ReserveButton';

const setup = (text, onClick) => {
    render(<ReserveButton text={text} onClick={onClick}/>);
}

test('Click the button', () => {
    // Setup
    const text = "Test button";
    const onClick = jest.fn();
    setup(text, onClick);

    // Action
    const button = document.querySelector('.reserve-button');
    button.click()

    // Assertion
    expect(onClick).toHaveBeenCalledTimes(1);
});