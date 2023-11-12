import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../ui/Component/Header';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Quick/i);
  const linkElement3 = screen.getByText(/Parking/i);
  const linkElement2 = screen.queryByText(/lasdaearn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
  expect(linkElement2).toBeNull();
});
