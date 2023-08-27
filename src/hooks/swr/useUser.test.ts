import { describe, expect, it, renderHook, waitFor, testData } from '@tests';
import useUser from './useUser';

describe('useUser', () => {
  it('renders hook', async () => {
    const { result } = renderHook(() => useUser());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toEqual(testData.user);
    });
  });
});
