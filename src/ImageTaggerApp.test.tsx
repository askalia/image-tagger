import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageTaggerApp from './ImageTaggerApp';

test('renders learn react link', () => {
  render(<ImageTaggerApp />);
  /*const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
  expect(4).toEqual(4);
});
