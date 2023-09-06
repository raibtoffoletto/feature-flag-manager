import { renderHook, testData, waitFor } from '@tests';
import { describe, expect, it } from 'vitest';
import useSettings from './useSettings';

describe('useSettings', () => {
  it('renders hook', async () => {
    const { result } = renderHook(() => useSettings());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toEqual(testData.settings);
    });
  });
});
