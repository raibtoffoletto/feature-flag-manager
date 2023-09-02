import testIds from '@testIds';
import { render, screen } from '@tests';
import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  function setup(withAction?: boolean) {
    const message = 'an error';
    const label = 'do something';

    render(
      <ErrorMessage message={message} action={withAction ? { label } : undefined} />,
    );

    return { label, message };
  }

  it('renders component with message', () => {
    const { message } = setup();

    expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.queryByTestId(testIds.ActionButton)).not.toBeInTheDocument();
  });

  it('renders component with action', () => {
    const { label } = setup(true);

    expect(screen.getByTestId(testIds.ActionButton)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
