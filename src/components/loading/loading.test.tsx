import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Loading component', () => {
  it('renders the loading text', () => {
    render(<Loading />);
    expect(
      screen.getByText(/Loading images, please wait/i),
    ).toBeInTheDocument();
  });
});
