import { FlagsContextProvider } from '@contexts/Flags';
import testIds from '@testIds';
import { TestProvider, render, screen, userEvent, waitFor, within } from '@tests';
import { describe, expect, it } from 'vitest';
import FlagList from './FlagList';

describe('<FlagList />', () => {
  async function setup() {
    const utils = render(
      <TestProvider>
        <FlagsContextProvider>
          <FlagList />
        </FlagsContextProvider>
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.Loading)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId(testIds.Flags.content_list_placeholder),
      ).not.toBeInTheDocument();
    });

    return utils;
  }

  it('renders list with search', async () => {
    await setup();

    expect(screen.getByTestId(testIds.Flags.content_list)).toBeInTheDocument();
  });

  it('should select and unselect by using button and keyboard', async () => {
    const { container } = await setup();

    expect(container.querySelectorAll('.Mui-selected').length).toBe(0);

    const button = within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole(
      'button',
    )[0];

    await userEvent.click(button);

    expect(container.querySelectorAll('.Mui-selected').length).toBe(1);

    await userEvent.click(button);

    expect(container.querySelectorAll('.Mui-selected').length).toBe(0);

    await userEvent.click(button);

    button.focus();

    await userEvent.keyboard('{Escape}');

    expect(container.querySelectorAll('.Mui-selected').length).toBe(0);
  });

  it('should filter by using the search button', async () => {
    await setup();

    expect(
      within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole('button')
        .length,
    ).toBe(2);

    const input = within(screen.getByTestId(testIds.Flags.content_list_search)).getByRole(
      'textbox',
    );

    await userEvent.type(input, 'dark');

    expect(
      within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole('button')
        .length,
    ).toBe(1);

    input.focus();
    await userEvent.keyboard('{Escape}');

    expect(
      within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole('button')
        .length,
    ).toBe(2);

    await userEvent.type(input, 'dark');

    expect(
      within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole('button')
        .length,
    ).toBe(1);

    await userEvent.click(screen.getByTestId(testIds.Flags.content_list_clear_search));

    expect(
      within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole('button')
        .length,
    ).toBe(2);
  });

  it('should validate search input', async () => {
    await setup();

    expect(
      within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole('button')
        .length,
    ).toBe(2);

    await userEvent.type(
      within(screen.getByTestId(testIds.Flags.content_list_search)).getByRole('textbox'),
      '@#$',
    );

    expect(
      within(screen.getByTestId(testIds.Flags.content_list)).getAllByRole('button')
        .length,
    ).toBe(2);
  });
});
