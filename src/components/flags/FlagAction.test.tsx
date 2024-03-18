import { FlagsContextProvider } from '@contexts/Flags';
import testIds from '@testIds';
import { TestProvider, render, screen, userEvent, waitFor } from '@tests';
import { describe, expect, it } from 'vitest';
import FlagAction from './FlagAction';

describe('<FlagAction />', () => {
  async function setup(edit = false) {
    render(
      <TestProvider>
        <FlagsContextProvider>
          <FlagAction
            {...(!!edit
              ? { edit, flag: { key: 'flag', valueType: 'string' } }
              : { edit })}
          />
        </FlagsContextProvider>
      </TestProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Flags.modal_fab)).toBeInTheDocument();
    });
  }

  it('renders flag FAB as ADD', async () => {
    await setup();

    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    expect(screen.queryByTestId(testIds.Flags.modal)).not.toBeInTheDocument();
  });

  it('renders flag FAB as Edit', async () => {
    await setup(true);

    expect(screen.getByTestId('EditIcon')).toBeInTheDocument();
  });

  it('opens ADD modal on fab click', async () => {
    await setup();

    await userEvent.click(screen.getByTestId(testIds.Flags.modal_fab));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Flags.modal)).toBeInTheDocument();
      expect(screen.getByTestId('AddCircleIcon')).toBeInTheDocument();
    });
  });

  it('opens EDIT modal on fab click', async () => {
    await setup(true);

    await userEvent.click(screen.getByTestId(testIds.Flags.modal_fab));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Flags.modal)).toBeInTheDocument();
      expect(screen.getByTestId('SaveIcon')).toBeInTheDocument();
      expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument();
    });
  });
});
