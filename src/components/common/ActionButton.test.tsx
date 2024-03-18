import { Add as AddIcon } from '@mui/icons-material';
import testIds from '@testIds';
import { render, screen } from '@tests';
import { describe, expect, it } from 'vitest';
import ActionButton from './ActionButton';

describe('<ActionButton />', () => {
  it('renders component', () => {
    const label = 'button label';

    render(<ActionButton label={label} icon={<AddIcon />} />);
    screen.debug();
    expect(screen.getAllByTestId(testIds.ActionButton)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('AddIcon')[0]).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
