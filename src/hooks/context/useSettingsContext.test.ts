import { TestProvider, act, renderHook, testData, waitFor } from '@tests';
import { describe, expect, it } from 'vitest';
import useSettingsContext from './useSettingsContext';

describe('useSettingsContext', () => {
  const setup = async () => {
    const results = renderHook(() => useSettingsContext(), { wrapper: TestProvider });

    await waitFor(() => {
      expect(results.result.current.settings).not.toBeUndefined();
    });

    return results;
  };

  it('renders context hook', async () => {
    const { result } = await setup();

    await waitFor(() => {
      expect(result.current.settings).toEqual(testData.settings);
    });
  });

  it('should update endpoint', async () => {
    const { result } = await setup();

    const newEndpoint = '/new-endpoint';

    act(() => {
      result.current.updateEndpoint(newEndpoint);
    });

    await waitFor(() => {
      expect(result.current.settings.endpoint).toEqual(newEndpoint);
    });
  });

  it('should not update endpoint with undefined argument', async () => {
    const { result } = await setup();

    expect(result.current.updateEndpoint()).toBeUndefined();
  });

  it('should add a new environment', async () => {
    const { result } = await setup();

    const newEnv = {
      name: 'name',
      url: 'url',
    };

    const initialLength = result.current.settings.environments.length;

    act(() => {
      result.current.createEnv(newEnv);
    });

    await waitFor(() => {
      expect(result.current.settings.environments.length).toEqual(initialLength + 1);
    });

    expect(
      result.current.settings.environments[
        result.current.settings.environments.length - 1
      ],
    ).toMatchObject(newEnv);
  });

  it('should not add a new environment with undefined argument', async () => {
    const { result } = await setup();

    expect(result.current.createEnv()).toBeUndefined();
  });

  it('should update an environment', async () => {
    const { result } = await setup();

    const newEnv = {
      ...testData.environments[0],
      name: 'new name',
    };

    const initialLength = result.current.settings.environments.length;

    act(() => {
      result.current.updateEnv(newEnv);
    });

    await waitFor(() => {
      expect(result.current.settings.environments.length).toEqual(initialLength);
    });

    expect(result.current.settings.environments[0]).toMatchObject(newEnv);
  });

  it('should not update an environment with undefined argument', async () => {
    const { result } = await setup();

    expect(result.current.updateEnv()).toBeUndefined();
  });

  it('should not update an environment with wrong id', async () => {
    const { result } = await setup();

    expect(
      result.current.updateEnv({ ...testData.environments[0], id: 99 }),
    ).toBeUndefined();
  });

  it('should remove an environment', async () => {
    const { result } = await setup();

    const initialLength = result.current.settings.environments.length;

    act(() => {
      result.current.removeEnv(1);
    });

    await waitFor(() => {
      expect(result.current.settings.environments.length).toEqual(initialLength - 1);
    });
  });

  it('should not remove an environment with undefined argument', async () => {
    const { result } = await setup();

    expect(result.current.removeEnv()).toBeUndefined();
  });

  it('should return default context where there is no provider', () => {
    const { result } = renderHook(() => useSettingsContext());

    expect(result.current.settings).toEqual({
      endpoint: '',
      environments: [],
    });

    expect(result.current.updateEndpoint()).toBeUndefined();
    expect(result.current.createEnv()).toBeUndefined();
    expect(result.current.updateEnv()).toBeUndefined();
    expect(result.current.removeEnv()).toBeUndefined();
  });
});
