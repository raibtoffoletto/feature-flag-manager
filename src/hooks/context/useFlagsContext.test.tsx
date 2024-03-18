import { FlagsContextProvider } from '@contexts/Flags';
import { TestProvider, act, renderHook, userEvent, waitFor } from '@tests';
import { describe, expect, it } from 'vitest';
import useFlagsContext from './useFlagsContext';

describe('useFlagsContext', () => {
  it('renders default context', async () => {
    const results = renderHook(() => useFlagsContext());

    await waitFor(() => {
      expect(results.result.current.flags).not.toBeUndefined();
    });

    expect(results.result.current.setSelected(undefined)).toBeUndefined();
    expect(await results.result.current.refetchFlags()).toBeUndefined();
  });

  it('should clean up selection on escape key', async () => {
    const wrapper = ({ children }: IParent) => (
      <TestProvider>
        <FlagsContextProvider>{children}</FlagsContextProvider>
      </TestProvider>
    );
    const results = renderHook(() => useFlagsContext(), { wrapper });

    await waitFor(() => {
      expect(results.result.current.flags.length).toBeGreaterThan(0);
    });

    expect(results.result.current.selected).toBeUndefined();

    act(() => {
      results.result.current.setSelected(results.result.current.flags[0].key);
    });

    expect(results.result.current.selected).not.toBeUndefined();

    await act(async () => {
      document.body.focus();
      await userEvent.keyboard('{Escape}');
    });

    expect(results.result.current.selected).toBeUndefined();
  });
});
