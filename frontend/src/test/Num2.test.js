import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../ui/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quick/i);
  const linkElement3 = screen.getByText(/Parking/i);
  const linkElement2 = screen.queryByText(/lasdaearn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
  expect(linkElement2).toBeNull();
});
