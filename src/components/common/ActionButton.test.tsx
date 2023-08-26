import { describe, expect, it, render, screen } from '@tests';
import testIds from '@testIds';
import ActionButton from './ActionButton';

describe('<ActionButton />', () => {
  it('renders component', () => {
    const label = 'button label';

    render(<ActionButton label={label} />);

    expect(screen.getByTestId(testIds.ActionButton)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
