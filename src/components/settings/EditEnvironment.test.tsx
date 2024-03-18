import testIds from '@testIds';
import { render, screen, userEvent, within } from '@tests';
import { afterEach, describe, expect, it, vi } from 'vitest';
import EditEnvironment from './EditEnvironment';

const mockDispatch = vi.fn();

vi.mock('@hooks/context/useSettingsViewContext', () => ({
  default: () => ({
    dispatch: mockDispatch,
  }),
}));

describe('<EditEnvironment />', () => {
  afterEach(() => {
    mockDispatch.mockReset();
  });

  function setUp() {
    render(<EditEnvironment id={1} name="name" url="url" />);
  }

  it('renders the component', () => {
    setUp();

    expect(screen.getByTestId(testIds.Settings.edit_name)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.Settings.edit_url)).toBeInTheDocument();
    expect(screen.getAllByTestId(testIds.ActionButton)[0]).toBeInTheDocument();

    expect(
      within(screen.getByTestId(testIds.Settings.edit_name)).getByRole('textbox'),
    ).toHaveValue('name');

    expect(
      within(screen.getByTestId(testIds.Settings.edit_url)).getByRole('textbox'),
    ).toHaveValue('url');
  });

  it('dispatches when typing on name', async () => {
    setUp();

    await userEvent.type(
      within(screen.getByTestId(testIds.Settings.edit_name)).getByRole('textbox'),
      'newName',
    );

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches when typing on url', async () => {
    setUp();

    await userEvent.type(
      within(screen.getByTestId(testIds.Settings.edit_url)).getByRole('textbox'),
      'newUrl',
    );

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches when deleting', async () => {
    setUp();

    await userEvent.click(screen.getAllByTestId(testIds.ActionButton)[0]);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
