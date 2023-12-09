import testIds from '@testIds';
import { render, screen } from '@tests';
import { describe, expect, it } from 'vitest';
import FloatingActions from './FloatingActions';

describe('', () => {
  it('renders component', () => {
    const id = 'test-id';

    render(<FloatingActions data-testid={id} />);

    expect(screen.getByTestId(id)).toBeInTheDocument();
    expect(screen.getByTestId('SettingsIcon')).toBeInTheDocument();
  });

  it('renders component with loading icon', () => {
    render(<FloatingActions loading={true} />);

    expect(screen.getByTestId(testIds.Loading)).toBeInTheDocument();
  });
});
