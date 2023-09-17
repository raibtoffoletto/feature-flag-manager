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

    const _settings: Settings = { environments: [], endpoint: '/new-endpoint' };

    act(() => {
      result.current.updateSettings(_settings);
    });

    await waitFor(() => {
      expect(result.current.settings).toEqual(_settings);
    });
  });

  it('should return default context where there is no provider', async () => {
    const { result } = renderHook(() => useSettingsContext());

    const defaultSettings: Settings = {
      endpoint: '',
      environments: [],
    };

    expect(result.current.settings).toEqual(defaultSettings);
    expect(await result.current.updateSettings(defaultSettings)).toBeUndefined();
  });
});
