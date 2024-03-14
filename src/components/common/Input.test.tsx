import { render, screen } from '@tests';
import { describe, expect, it } from 'vitest';
import Input from './Input';

describe('<Input />', () => {
  it('renders component', () => {
    const id = 'input-id';

    render(<Input data-testid={id} />);

    expect(screen.getByTestId(id)).toBeInTheDocument();
  });
});
