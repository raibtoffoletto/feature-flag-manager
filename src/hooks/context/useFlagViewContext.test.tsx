import * as flagsApi from '@api/flags';
import { FlagViewContextProvider } from '@contexts/FlagView';
import * as useUserContext from '@hooks/context/useUserContext';
import { TestProvider, act, renderHook, waitFor } from '@tests';
import { describe, expect, it, vi } from 'vitest';
import useFlagViewContext from './useFlagViewContext';

describe('useFlagViewContext', () => {
  async function setup(failTenant = false) {
    vi.spyOn(useUserContext, 'default').mockImplementation(
      () => ({ tenant: failTenant ? undefined : { id: 'tenantId' } }) as any,
    );

    const wrapper = ({ children }: IParent) => (
      <TestProvider>
        <FlagViewContextProvider flag={{ key: 'key', valueType: 'boolean' }}>
          {children}
        </FlagViewContextProvider>
      </TestProvider>
    );

    return renderHook(() => useFlagViewContext(), { wrapper });
  }

  it('renders default context', async () => {
    const results = renderHook(() => useFlagViewContext());

    expect(results.result.current.key).not.toBeUndefined();
    expect(results.result.current.valueType).not.toBeUndefined();
    expect(results.result.current.isLoading).toBe(false);

    expect(await results.result.current.saveFlag('')).toBeUndefined();
    expect(await results.result.current.removeFlag('')).toBeUndefined();
  });

  it('should early escape when tenant id is invalid', async () => {
    const getTenantFlag = vi.spyOn(flagsApi, 'getTenantFlag');
    const putTenantFlag = vi.spyOn(flagsApi, 'putTenantFlag');
    const deleteTenantFlag = vi.spyOn(flagsApi, 'deleteTenantFlag');

    const { result } = await setup(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.environments.length).toBe(0);
    expect(getTenantFlag).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.saveFlag('');
    });

    expect(putTenantFlag).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.removeFlag('');
    });

    expect(deleteTenantFlag).not.toHaveBeenCalled();
  });

  it('should log error on failure', async () => {
    const consoleSpy = vi.spyOn(console, 'log');

    vi.spyOn(flagsApi, 'putTenantFlag').mockImplementationOnce(() => {
      throw new Error();
    });

    vi.spyOn(flagsApi, 'deleteTenantFlag').mockImplementationOnce(() => {
      throw new Error();
    });

    const { result } = await setup();

    await waitFor(() => {
      expect(result.current.environments.length).toBe(2);
    });

    await act(async () => {
      await result.current.saveFlag('');
    });

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.removeFlag('');
    });

    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });
});
