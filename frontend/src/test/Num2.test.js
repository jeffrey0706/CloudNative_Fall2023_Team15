import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../ui/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  const linkElement2 = screen.queryByText(/lasdaearn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeNull();
});
