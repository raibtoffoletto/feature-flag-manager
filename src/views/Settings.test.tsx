import testIds from '@testIds';
import { TestProvider, render, screen, waitFor, within } from '@tests';
import { describe, expect, it } from 'vitest';
import Settings from './Settings';

describe('<Settings />', () => {
  it('renders settings page', async () => {
    render(
      <TestProvider>
        <Settings />
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Settings)).toBeInTheDocument();
    });

    expect(
      within(screen.getByRole('heading')).getByText(/settings/i),
    ).toBeInTheDocument();
  });
});
