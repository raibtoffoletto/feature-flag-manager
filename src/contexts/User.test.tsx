import { API } from '@constants';
import testIds from '@testIds';
import { render, screen, server, userEvent, waitFor } from '@tests';
import { http } from 'msw';
import { SWRConfig } from 'swr';
import { describe, expect, it, vi } from 'vitest';
import { UserContextProvider } from './User';

describe('UserContextProvider', () => {
  const childId = 'childId';

  function setup() {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <UserContextProvider>
          <div data-testid={childId} />
        </UserContextProvider>
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

  it('renders error when there is no user', async () => {
    server.use(http.get(API.whoami, () => new Response('', { status: 200 })));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });
  });

  it('reload page when using error button', async () => {
    const reloadMock = vi.fn();

    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        reload: reloadMock,
      },
    });

    server.use(http.get(API.whoami, () => new Response('', { status: 200 })));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });

    server.resetHandlers();

    await userEvent.click(screen.getByTestId(testIds.ActionButton));

    expect(reloadMock).toBeCalledTimes(1);
  });

  it('renders error when api results in error', async () => {
    server.use(http.get(API.whoami, () => new Response(undefined, { status: 403 })));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });
  });
});
