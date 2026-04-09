import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Weather Viewer heading', () => {
  render(<App />);
  const heading = screen.getByText(/weather viewer/i);
  expect(heading).toBeInTheDocument();
});
