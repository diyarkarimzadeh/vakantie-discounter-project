import { render, screen } from '@testing-library/react';
import Heading from './heading';

describe('Heading component', () => {
  it('renders the heading text', () => {
    render(<Heading />);
    expect(screen.getByText(/Click the Fox! Game/i)).toBeInTheDocument();
  });
});
