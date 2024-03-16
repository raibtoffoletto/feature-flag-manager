import { API } from '@constants';
import testIds from '@testIds';
import { render, screen, server, userEvent, waitFor } from '@tests';
import { http } from 'msw';
import { SWRConfig } from 'swr';
import { describe, expect, it } from 'vitest';
import { SettingsContextProvider } from './Settings';

describe('SettingsContextProvider', () => {
  const childId = 'childId';

  function setup() {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <SettingsContextProvider>
          <div data-testid={childId} />
        </SettingsContextProvider>
      </SWRConfig>,
    );
  }

  it('renders loading while is fetching user', () => {
    setup();

    expect(screen.getByTestId(testIds.Loading)).toBeInTheDocument();
  });

  it('renders provider where there is no errors', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByTestId(childId)).toBeInTheDocument();
    });
  });

  it('renders error when there are no settings', async () => {
    server.use(http.get(API.settings, () => new Response('', { status: 200 })));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });
  });

  it('reload page when using error button', async () => {
    server.use(http.get(API.settings, () => new Response('', { status: 200 })));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });

    server.resetHandlers();

    await userEvent.click(screen.getByTestId(testIds.ActionButton));

    await waitFor(() => {
      expect(screen.getByTestId(childId)).toBeInTheDocument();
    });
  });

  it('renders error when api results in error', async () => {
    server.use(http.get(API.settings, () => new Response(undefined, { status: 403 })));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });
  });
});
