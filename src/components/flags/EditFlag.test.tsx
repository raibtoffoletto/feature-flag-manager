import { FlagViewContextProvider } from '@contexts/FlagView';
import { flags } from '@test-data';
import testIds from '@testIds';
import { TestProvider, render, screen, userEvent, waitFor, within } from '@tests';
import { describe, expect, it } from 'vitest';
import EditFlag from './EditFlag';

describe('<EditFlag />', () => {
  async function setup(_flag = flags[0]) {
    render(
      <TestProvider>
        <FlagViewContextProvider flag={_flag}>
          <EditFlag />
        </FlagViewContextProvider>
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.Loading)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(_flag.key)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId(testIds.Flags.content_list_placeholder),
      ).not.toBeInTheDocument();
    });
  }

  it('renders flag edit pane', async () => {
    await setup();

    expect(
      screen.queryAllByTestId(testIds.Flags.pane_edit_environment).length,
    ).toBeGreaterThan(0);

    expect(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_add).length,
    ).toBeGreaterThan(0);
  });

  it('adds text flag to environment', async () => {
    await setup();

    const button = within(
      screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
    ).queryAllByTestId(testIds.Flags.pane_edit_add)[0];

    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).getByRole(
          'textbox',
        ),
      ).toBeInTheDocument();
    });

    const envCard = screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0];

    expect(
      within(envCard).queryAllByTestId(testIds.Flags.pane_edit_save)[0],
    ).toBeInTheDocument();

    expect(
      within(envCard).queryAllByTestId(testIds.Flags.pane_edit_remove)[0],
    ).toBeInTheDocument();
  });

  it('adds bool flag to environment', async () => {
    await setup(flags[1]);

    await userEvent.click(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_add)[0],
    );

    await waitFor(() => {
      expect(
        within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).getByRole(
          'checkbox',
        ),
      ).toBeInTheDocument();
    });
  });

  it('saves bool flag to environment', async () => {
    await setup(flags[1]);

    await userEvent.click(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_add)[0],
    );

    await waitFor(() => {
      expect(
        within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).getByRole(
          'checkbox',
        ),
      ).toBeInTheDocument();
    });

    const toggle = within(
      screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
    ).getByRole('checkbox');
    expect(toggle).toBeInTheDocument();

    await userEvent.click(toggle);
    expect(toggle).toBeChecked();

    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    expect(toggle).toBeChecked();

    await userEvent.click(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).getAllByTestId(testIds.Flags.pane_edit_save)[0],
    );

    expect(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_save)[0],
    ).toBeUndefined();

    await waitFor(() => {
      expect(
        within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).getByRole(
          'checkbox',
        ),
      ).toBeInTheDocument();
    });

    expect(toggle).toBeChecked();
  }, 10000);

  it('removes flag to environment', async () => {
    await setup();

    await userEvent.click(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_add)[0],
    );

    await waitFor(() => {
      expect(
        within(
          screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
        ).queryAllByTestId(testIds.Flags.pane_edit_remove)[0],
      ).toBeInTheDocument();
    });

    await userEvent.click(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_remove)[0],
    );

    expect(
      within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).queryByRole(
        'checkbox',
      ),
    ).not.toBeInTheDocument();
  }, 10000);

  it('validates text flag content', async () => {
    await setup();

    await userEvent.click(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_add)[0],
    );

    await waitFor(() => {
      within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).getByRole(
        'textbox',
      );
    });

    const input = within(
      screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
    ).getByRole('textbox');

    await userEvent.type(input, 'value');

    expect(screen.getByText(/Failed the validation/i)).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, '#123');

    expect(screen.queryByText(/Failed the validation/i)).not.toBeInTheDocument();
  });

  it('fails on invalid regex', async () => {
    await setup({ key: 'key', valueType: 'string', validation: '(foo' });

    await userEvent.click(
      within(
        screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0],
      ).queryAllByTestId(testIds.Flags.pane_edit_add)[0],
    );

    await waitFor(() => {
      expect(
        within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).getByRole(
          'textbox',
        ),
      ).toBeInTheDocument();
    });

    await userEvent.type(
      within(screen.queryAllByTestId(testIds.Flags.pane_edit_environment)[0]).getByRole(
        'textbox',
      ),
      'foo',
    );

    expect(screen.getByText(/Failed the validation/i)).toBeInTheDocument();
  });
});
