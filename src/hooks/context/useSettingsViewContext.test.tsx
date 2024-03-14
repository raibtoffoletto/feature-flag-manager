import * as appAPI from '@api/app';
import { API, SettingsViewAction } from '@constants';
import { SettingsViewContextProvider } from '@contexts/SettingsView';
import testIds from '@testIds';
import {
  TestProvider,
  act,
  renderHook,
  screen,
  server,
  testData,
  userEvent,
  waitFor,
  within,
} from '@tests';
import { rest } from 'msw';
import { SWRConfig } from 'swr';
import { describe, expect, it, vi } from 'vitest';
import useSettingsViewContext from './useSettingsViewContext';

const updateSettingsFn = vi.fn();

vi.mock('@hooks/context/useSettingsContext', () => ({
  default: () => ({
    settings: { ...testData.settings },
    updateSettings: updateSettingsFn,
  }),
}));

const TestContainer = ({ children }: IParent) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <TestProvider>
        <SettingsViewContextProvider>{children}</SettingsViewContextProvider>
      </TestProvider>
    </SWRConfig>
  );
};

describe('useSettingsViewContext.test', () => {
  async function setup() {
    const results = renderHook(() => useSettingsViewContext(), {
      wrapper: TestContainer,
    });

    await waitFor(() => {
      expect(results.result.current.endpoint).not.toBeFalsy();
    });

    return results;
  }

  async function setupSave() {
    const { result } = await setup();

    await userEvent.hover(
      within(screen.getByTestId(testIds.Settings.actions)).getByRole('button'),
    );

    await userEvent.click(
      within(screen.getByTestId(testIds.Settings.actions_edit)).getByRole('menuitem'),
    );

    await waitFor(() => {
      expect(result.current.isEditing).toBeTruthy();
    });

    await userEvent.hover(
      within(screen.getByTestId(testIds.Settings.actions)).getByRole('button'),
    );

    await userEvent.click(screen.getByTestId(testIds.Settings.actions_save));

    return result;
  }

  it('renders context with initial settings value', async () => {
    const { result } = await setup();

    expect(result.current).toMatchObject({
      isEditing: false,
      ...testData.settings,
    });
  });

  it('should update endpoint', async () => {
    const { result } = await setup();

    const _endpoint = '/my-new-endpoint';

    act(() => {
      result.current.dispatch({ type: SettingsViewAction.endpoint, payload: _endpoint });
    });

    await waitFor(() => {
      expect(result.current.endpoint).toEqual(_endpoint);
    });
  });

  it('should add environment', async () => {
    const { result } = await setup();

    const _environment = { name: 'environment', url: 'environment.new' };

    act(() => {
      result.current.dispatch({ type: SettingsViewAction.create, payload: _environment });
    });

    await waitFor(() => {
      expect(
        result.current.environments[result.current.environments.length - 1],
      ).toMatchObject(_environment);
    });
  });

  it('should update environment', async () => {
    const { result } = await setup();

    const _environment = { ...result.current.environments[1], name: 'My PROD' };

    act(() => {
      result.current.dispatch({ type: SettingsViewAction.update, payload: _environment });
    });

    await waitFor(() => {
      expect(result.current.environments[1]).toEqual(_environment);
    });
  });

  it('should do nothing when updating an invalid environment', async () => {
    const { result } = await setup();

    const _environments = result.current.environments.slice();

    act(() => {
      result.current.dispatch({
        type: SettingsViewAction.update,
        payload: { id: 99, name: 'none', url: 'none' },
      });
    });

    await waitFor(() => {
      expect(result.current.environments).toEqual(_environments);
    });
  });

  it('should remove environment', async () => {
    const { result } = await setup();

    const initialLength = result.current.environments.length;

    act(() => {
      result.current.dispatch({ type: SettingsViewAction.remove, payload: 1 });
    });

    await waitFor(() => {
      expect(result.current.environments.length).toBeLessThan(initialLength);
    });
  });

  it('should reset settings', async () => {
    const { result } = await setup();

    const _settings: Settings = {
      endpoint: '',
      environments: [],
    };

    act(() => {
      result.current.dispatch({ type: SettingsViewAction.reset, payload: _settings });
    });

    await waitFor(() => {
      expect(result.current).toMatchObject(_settings);
    });
  });

  it('should do nothing on invalid dispatch', async () => {
    const { result } = await setup();

    const _state = {
      endpoint: result.current.endpoint,
      environments: result.current.environments.slice(),
    };

    act(() => {
      result.current.dispatch({
        type: 'none',
        payload: 'none',
      } as unknown as ISettingsViewAction);
    });

    await waitFor(() => {
      expect(result.current).toMatchObject(_state);
    });
  });

  it('should return default context where there is no provider', () => {
    const { result } = renderHook(() => useSettingsViewContext());

    expect(result.current.endpoint).toEqual('');
    expect(result.current.environments).toEqual([]);
    expect(result.current.isEditing).toEqual(false);
    expect(
      result.current.dispatch({ type: SettingsViewAction.remove, payload: 0 }),
    ).toBeUndefined();
  });

  it('should update endpoint', async () => {
    const postSettingsSpy = vi.spyOn(appAPI, 'postSettings');

    const result = await setupSave();

    await userEvent.click(
      within(screen.getByTestId(testIds.Settings.actions_save)).getByRole('menuitem'),
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.Loading)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(result.current.isEditing).toBeFalsy();
      expect(screen.queryByTestId(testIds.Loading)).not.toBeInTheDocument();
    });

    expect(postSettingsSpy).toBeCalledTimes(1);
    expect(updateSettingsFn).toBeCalledTimes(1);
  });

  it('should log error on api failure', async () => {
    const consoleSpy = vi.spyOn(console, 'log');

    server.use(rest.post(API.settings, (_, res, ctx) => res(ctx.status(500))));

    await setupSave();

    await userEvent.click(
      within(screen.getByTestId(testIds.Settings.actions_save)).getByRole('menuitem'),
    );

    expect(consoleSpy).toBeCalledTimes(1);
  });
});
