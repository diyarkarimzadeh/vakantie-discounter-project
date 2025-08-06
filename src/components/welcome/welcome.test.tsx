import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Welcome from './welcome';

describe('Welcome component', () => {
  const mockOnChange = vi.fn();
  const mockHandleStartGame = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    render(
      <Welcome
        value=""
        onChange={mockOnChange}
        handleStartGame={mockHandleStartGame}
      />,
    );

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('disables the button if input is empty or whitespace', () => {
    const { rerender } = render(
      <Welcome
        value=""
        onChange={mockOnChange}
        handleStartGame={mockHandleStartGame}
      />,
    );
    const button = screen.getByRole('button', { name: /play/i });
    expect(button).toBeDisabled();

    rerender(
      <Welcome
        value="   "
        onChange={mockOnChange}
        handleStartGame={mockHandleStartGame}
      />,
    );
    expect(button).toBeDisabled();

    rerender(
      <Welcome
        value="Diyar"
        onChange={mockOnChange}
        handleStartGame={mockHandleStartGame}
      />,
    );
    expect(button).toBeEnabled();
  });

  it('calls onChange when input value changes', () => {
    render(
      <Welcome
        value=""
        onChange={mockOnChange}
        handleStartGame={mockHandleStartGame}
      />,
    );

    const input = screen.getByPlaceholderText(/enter your name/i);
    fireEvent.change(input, { target: { value: 'Diyar' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('calls handleStartGame when button is clicked', () => {
    render(
      <Welcome
        value="Diyar"
        onChange={mockOnChange}
        handleStartGame={mockHandleStartGame}
      />,
    );

    const button = screen.getByRole('button', { name: /play/i });
    fireEvent.click(button);
    expect(mockHandleStartGame).toHaveBeenCalledTimes(1);
  });
});
