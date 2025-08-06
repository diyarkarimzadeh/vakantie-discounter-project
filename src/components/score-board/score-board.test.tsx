import { render, screen } from '@testing-library/react';
import ScoreBoard from './score-board';

describe('ScoreBoard component', () => {
  it('renders score and time left correctly', () => {
    render(<ScoreBoard score={10} timeLeft={30} />);

    expect(screen.getByText(/Score:/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText(/Time left:/i)).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
