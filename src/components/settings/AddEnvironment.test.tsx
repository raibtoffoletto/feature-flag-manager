import testIds from '@testIds';
import { render, screen, userEvent, within } from '@tests';
import { describe, expect, it, vi } from 'vitest';
import AddEnvironment from './AddEnvironment';

const mockDispatch = vi.fn();

vi.mock('@hooks/context/useSettingsViewContext', () => ({
  default: () => ({
    dispatch: mockDispatch,
  }),
}));

describe('<AddEnvironment />', () => {
  it('renders the component', () => {
    render(<AddEnvironment />);

    expect(screen.getByTestId(testIds.Settings.edit_name)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.Settings.edit_url)).toBeInTheDocument();
    expect(screen.getAllByTestId(testIds.Settings.edit_submit)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(testIds.Settings.edit_submit)[0]).toBeDisabled();
  });

  it('types in the inputs and submit form', async () => {
    render(<AddEnvironment />);

    const name = 'text';
    const url = 'http://text.com';

    const inputName = within(screen.getByTestId(testIds.Settings.edit_name)).getByRole(
      'textbox',
    );

    const inputUrl = within(screen.getByTestId(testIds.Settings.edit_url)).getByRole(
      'textbox',
    );

    await userEvent.type(inputName, name);
    await userEvent.type(inputUrl, url);

    expect(inputName).toHaveValue(name);
    expect(inputUrl).toHaveValue(url);

    const submit = screen.getAllByTestId(testIds.Settings.edit_submit)[0];
    expect(submit).toBeEnabled();
    await userEvent.type(submit, url);

    expect(inputName).toHaveValue('');
    expect(inputUrl).toHaveValue('');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
