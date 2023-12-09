import testIds from '@testIds';
import { TestProvider, render, screen, userEvent, waitFor, within } from '@tests';
import { describe, expect, it } from 'vitest';
import Settings from './Settings';

describe('<Settings />', () => {
  async function setup() {
    render(
      <TestProvider>
        <Settings />
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Settings.content)).toBeInTheDocument();
    });
  }

  const openActions = () =>
    userEvent.hover(
      within(screen.getByTestId(testIds.Settings.actions)).getByRole('button'),
    );

  async function openEdit() {
    await openActions();

    await userEvent.click(screen.getByTestId(testIds.Settings.actions_edit));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Settings.content_edit)).toBeInTheDocument();
    });
  }

  it('renders settings page', async () => {
    await setup();

    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/environments/i)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.Settings.actions)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.Settings.content_view)).toBeInTheDocument();
  });

  it('should change page on edit action', async () => {
    await setup();

    await openActions();

    const edit = screen.getByTestId(testIds.Settings.actions_edit);
    expect(edit).toBeInTheDocument();

    await userEvent.click(edit);

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.Settings.actions_edit)).not.toBeInTheDocument();
      expect(screen.getByTestId(testIds.Settings.content_edit)).toBeInTheDocument();
    });
  });

  it('should change page back on exit action', async () => {
    await setup();

    await openEdit();

    await openActions();

    const exit = screen.getByTestId(testIds.Settings.actions_exit);
    expect(exit).toBeInTheDocument();

    await userEvent.click(exit);

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.Settings.actions_exit)).not.toBeInTheDocument();
      expect(screen.getByTestId(testIds.Settings.content_view)).toBeInTheDocument();
    });
  });

  it('should change reset state entering edit', async () => {
    const newValue = '-some-new-value';

    await setup();

    await openEdit();

    const firstInput = screen.queryAllByRole('textbox')[0];
    expect(firstInput).toBeInTheDocument();

    await userEvent.type(firstInput, newValue);

    expect(firstInput.getAttribute('value')).toMatch(new RegExp(newValue));

    await openActions();

    await userEvent.click(screen.getByTestId(testIds.Settings.actions_exit));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Settings.content_view)).toBeInTheDocument();
    });

    await openEdit();

    expect(screen.queryAllByRole('textbox')[0].getAttribute('value')).not.toMatch(
      new RegExp(newValue),
    );
  });

  it('should NOT change page on undo action', async () => {
    await setup();

    await openEdit();

    await openActions();

    const undo = screen.getByTestId(testIds.Settings.actions_undo);
    expect(undo).toBeInTheDocument();

    await userEvent.click(undo);

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.Settings.content_view)).not.toBeInTheDocument();
      expect(screen.getByTestId(testIds.Settings.content_edit)).toBeInTheDocument();
    });
  });

  it('should change page on save action', async () => {
    await setup();

    await openEdit();

    await openActions();

    const save = screen.getByTestId(testIds.Settings.actions_save);
    expect(save).toBeInTheDocument();

    await userEvent.click(save);

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.Settings.content_edit)).not.toBeInTheDocument();
      expect(screen.getByTestId(testIds.Settings.content_view)).toBeInTheDocument();
    });
  });

  it('should show and hide current actions on hover', async () => {
    await setup();

    expect(screen.queryByText(/edit/i)).not.toBeVisible();

    await openActions();

    expect(screen.queryByText(/edit/i)).toBeVisible();

    await userEvent.unhover(
      within(screen.getByTestId(testIds.Settings.actions)).getByRole('button'),
    );

    expect(screen.queryByText(/edit/i)).not.toBeVisible();
  });
});
