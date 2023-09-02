import { AppRoutes } from '@constants';
import testIds from '@testIds';
import { TestProvider, render, screen, testData, userEvent, waitFor } from '@tests';
import { afterAll, describe, expect, it, vi } from 'vitest';
import UserMenu from './UserMenu';

const { name, tenants } = testData.user;

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('<UserMenu />', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  async function setup() {
    render(
      <TestProvider>
        <UserMenu />
      </TestProvider>,
    );
  }

  async function openMenu() {
    await waitFor(() =>
      expect(screen.getByTestId(testIds.UserMenu.button)).toBeInTheDocument(),
    );

    await userEvent.click(screen.getByTestId(testIds.UserMenu.button));

    await waitFor(() =>
      expect(screen.getByTestId(testIds.UserMenu.menu)).toBeInTheDocument(),
    );
  }

  it("renders component's button", async () => {
    await setup();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.UserMenu.button)).toBeInTheDocument();
      expect(screen.getByTestId('AccountCircleIcon')).toBeInTheDocument();
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(tenants[0].name)).toBeInTheDocument();
      expect(screen.queryByTestId(testIds.UserMenu.menu)).not.toBeInTheDocument();
    });
  });

  it("renders component's menu with default tenant selected", async () => {
    await setup();

    await openMenu();

    const menuItem = screen.getByTestId(tenants[0].name);
    expect(menuItem).toBeInTheDocument();
    expect(menuItem.getAttribute('data-selected')).toBe('true');
  });

  it('switchs tenant when using the menu', async () => {
    const nextTenant = tenants[2].name;

    await setup();

    await openMenu();

    await userEvent.click(screen.getByTestId(nextTenant));

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.UserMenu.menu)).not.toBeInTheDocument();
      expect(screen.getByText(nextTenant)).toBeInTheDocument();
    });

    await openMenu();

    expect(screen.getByTestId(nextTenant).getAttribute('data-selected')).toBe('true');
  });

  it('navigates to settings page', async () => {
    await setup();

    await openMenu();

    await userEvent.click(screen.getByTestId(testIds.UserMenu.settings));

    await waitFor(() => {
      expect(screen.queryByTestId(testIds.UserMenu.menu)).not.toBeInTheDocument();
    });

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith(AppRoutes.settings);
  });
});
