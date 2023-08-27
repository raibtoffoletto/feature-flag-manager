import {
  TestProvider,
  act,
  describe,
  expect,
  it,
  renderHook,
  testData,
  waitFor,
} from '@tests';
import useUserContext from './useUserContext';

describe('useUserContext', () => {
  const setup = () => renderHook(() => useUserContext(), { wrapper: TestProvider });

  it('renders context hook', async () => {
    const { result } = setup();

    await waitFor(() => {
      expect(result.current.user).toEqual(testData.user);
      expect(result.current.tenant).toEqual(testData.user.tenants[0]);
    });
  });

  it('should switch tenant Ids', async () => {
    const { result } = setup();

    await waitFor(() => {
      expect(result.current.tenant).toEqual(testData.user.tenants[0]);
    });

    const nextId = testData.user.tenants[1].id;

    act(() => {
      result.current.switchTanant(nextId);
    });

    expect(result.current.tenant?.id).toEqual(nextId);
  });

  it('should not switch tenant when id is empty', async () => {
    const { result } = setup();

    const id = testData.user.tenants[0];

    await waitFor(() => {
      expect(result.current.tenant).toEqual(id);
    });

    act(() => {
      result.current.switchTanant('');
    });

    expect(result.current.tenant).toEqual(id);
  });

  it('should return default context where there is no provider', () => {
    const { result } = renderHook(() => useUserContext());

    expect(result.current.user).toEqual({
      name: '',
      tenants: [],
    });

    expect(result.current.tenant).toBeUndefined();
    expect(result.current.switchTanant()).toBeUndefined();
  });
});
