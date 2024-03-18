import { FlagsContextProvider } from '@contexts/Flags';
import testIds from '@testIds';
import { TestProvider, render, screen, userEvent, waitFor, within } from '@tests';
import { describe, expect, it } from 'vitest';
import Panes from './Panes';

describe('<Panes />', () => {
  async function setup() {
    render(
      <TestProvider>
        <FlagsContextProvider>
          <Panes />
        </FlagsContextProvider>
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Flags.panes)).toBeInTheDocument();
    });
  }

  it('renders flag panes', async () => {
    await setup();

    expect(screen.getByTestId(testIds.Flags.content_select)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.Flags.pane_add)).toBeInTheDocument();
  });

  it('switches to edit pane', async () => {
    await setup();

    await waitFor(() => {
      expect(
        within(screen.getByTestId(testIds.Flags.content_select)).getByRole('button'),
      ).not.toBeDisabled();
    });

    await userEvent.type(
      within(screen.getByTestId(testIds.Flags.content_select)).getByRole('button'),
      'dark',
    );

    await userEvent.click(within(screen.getByRole('listbox')).getByText('allowDarkMode'));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Flags.pane_edit)).toBeInTheDocument();
    });
  });
});
