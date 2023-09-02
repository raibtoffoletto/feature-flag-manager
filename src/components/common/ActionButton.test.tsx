import testIds from '@testIds';
import { render, screen } from '@tests';
import { describe, expect, it } from 'vitest';
import ActionButton from './ActionButton';

describe('<ActionButton />', () => {
  it('renders component', () => {
    const label = 'button label';

    render(<ActionButton label={label} />);

    expect(screen.getByTestId(testIds.ActionButton)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
