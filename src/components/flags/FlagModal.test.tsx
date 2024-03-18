import { API } from '@constants';
import { FlagsContextProvider } from '@contexts/Flags';
import testIds from '@testIds';
import { TestProvider, render, screen, server, userEvent, waitFor, within } from '@tests';
import { http } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import FlagModal from './FlagModal';

describe('<FlagAction />', () => {
  async function setup(flag?: Flag) {
    render(
      <TestProvider>
        <FlagsContextProvider>
          <FlagModal flag={flag} />
        </FlagsContextProvider>
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Flags.modal)).toBeInTheDocument();
    });
  }

  it('renders modal and closes on background click', async () => {
    await setup();

    await userEvent.click(screen.getByTestId(testIds.Flags.modal_backdrop));

    expect(screen.getByTestId(testIds.Flags.modal)).toBeInTheDocument();
  });

  it("types flag's key", async () => {
    await setup();

    const input = within(screen.getByTestId(testIds.Flags.modal_key)).getByRole(
      'textbox',
    );

    await userEvent.type(input, 'primaryColor');

    expect(input).toHaveValue('primaryColor');

    await waitFor(() => {
      expect(
        within(screen.getByTestId(testIds.Flags.modal)).getByText(/already exists/i),
      ).toBeInTheDocument();
    });

    await userEvent.type(input, '!@#$%');

    expect(input).toHaveValue('primaryColor');

    await userEvent.type(input, '2');

    await waitFor(() => {
      expect(
        within(screen.getByTestId(testIds.Flags.modal)).queryByText(/already exists/i),
      ).not.toBeInTheDocument();
    });
  });

  it("changes flag's type", async () => {
    await setup();

    const input = within(screen.getByTestId(testIds.Flags.modal_type)).getByRole(
      'textbox',
    );

    expect(input).toHaveValue('string');

    const select = within(screen.getByTestId(testIds.Flags.modal_type)).getByRole(
      'combobox',
    );

    await userEvent.click(select);

    await userEvent.click(within(screen.getByRole('listbox')).getAllByRole('option')[1]);

    expect(input).toHaveValue('boolean');

    const validation = within(
      screen.getByTestId(testIds.Flags.modal_validation),
    ).getByRole('textbox');
    expect(validation).toBeDisabled();

    await userEvent.click(select);

    await userEvent.click(within(screen.getByRole('listbox')).getAllByRole('option')[0]);

    expect(validation).toBeEnabled();
  });

  it('types field validations', async () => {
    await setup();

    const input = within(screen.getByTestId(testIds.Flags.modal_validation)).getByRole(
      'textbox',
    );

    await userEvent.type(input, 'validation');

    expect(input).toHaveValue('validation');
  });

  it('adds a new flag', async () => {
    await setup();

    const button = screen.getByTestId(testIds.Flags.modal_button_save);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.type(
      within(screen.getByTestId(testIds.Flags.modal_key)).getByRole('textbox'),
      'newFlag',
    );

    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(within(button).getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(within(button).queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('deletes a flag', async () => {
    await setup({ key: 'myFlag', valueType: 'boolean' });

    const button = screen.getByTestId(testIds.Flags.modal_button_delete);
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(
      screen.queryByTestId(testIds.Flags.modal_button_delete),
    ).not.toBeInTheDocument();

    const confirm = screen.getByTestId(testIds.Flags.modal_button_confirm_delete);
    expect(confirm).toBeInTheDocument();

    await userEvent.click(confirm);

    expect(within(confirm).getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(within(confirm).queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('fails to add a new flag', async () => {
    server.use(http.put(API.flags, () => new Response(undefined, { status: 403 })));

    const logSpy = vi.spyOn(console, 'log');

    await setup();

    await userEvent.type(
      within(screen.getByTestId(testIds.Flags.modal_key)).getByRole('textbox'),
      'newFlag',
    );

    await userEvent.click(screen.getByTestId(testIds.Flags.modal_button_save));

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalled();
    });
  });

  it('fails to delete a flag', async () => {
    server.use(
      http.delete(`${API.flags}/:key`, () => new Response(undefined, { status: 403 })),
    );

    const logSpy = vi.spyOn(console, 'log');

    await setup({ key: 'myFlag', valueType: 'boolean' });

    await userEvent.click(screen.getByTestId(testIds.Flags.modal_button_delete));

    await userEvent.click(screen.getByTestId(testIds.Flags.modal_button_confirm_delete));

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalled();
    });
  });
});
