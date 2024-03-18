import testIds from '@testIds';
import { TestProvider, render, screen, waitFor } from '@tests';
import { describe, expect, it } from 'vitest';
import Flags from './Flags';

describe('<Flags />', () => {
  it('renders flags page', async () => {
    render(
      <TestProvider>
        <Flags />
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Flags.content)).toBeInTheDocument();
    });
  });
});
