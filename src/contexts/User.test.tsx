import { API } from '@constants';
import testIds from '@testIds';
import {
  describe,
  expect,
  it,
  render,
  screen,
  server,
  userEvent,
  vi,
  waitFor,
} from '@tests';
import { rest } from 'msw';
import { SWRConfig } from 'swr';
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
    server.use(rest.get(API.whoami, (_, res, ctx) => res(ctx.status(200), ctx.body(''))));

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

    server.use(rest.get(API.whoami, (_, res, ctx) => res(ctx.status(200), ctx.body(''))));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });

    server.resetHandlers();

    await userEvent.click(screen.getByTestId(testIds.ActionButton));

    expect(reloadMock).toBeCalledTimes(1);
  });

  it('renders error when api results in error', async () => {
    server.use(rest.get(API.whoami, (_, res, ctx) => res(ctx.status(403))));

    setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.ErrorMessage)).toBeInTheDocument();
    });
  });
});
