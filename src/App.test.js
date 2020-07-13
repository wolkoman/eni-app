import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// TODO Test
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Termine/i);
  expect(linkElement).toBeInTheDocument();
});
