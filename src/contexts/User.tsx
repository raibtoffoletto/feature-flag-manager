import ErrorMessage from '@components/common/ErrorMessage';
import Loading from '@components/common/Loading';
import useUser from '@hooks/swr/useUser';
import { getTenantId, setTenantId as setStorageTenantId } from '@lib/getTenantId';
import { createContext, useCallback, useEffect, useState } from 'react';

const initialContext: IUserContext = {
  user: {
    name: '',
    tenants: [],
  },
  switchTanant: () => undefined,
};

export const UserContext = createContext<IUserContext>(initialContext);

const initialTenantId = getTenantId();

export function UserContextProvider({ children }: IParent) {
  const [tenantId, setTenantId] = useState<string | undefined>(initialTenantId);

  const { data: user, isLoading, error } = useUser();

  const switchTanant = useCallback((_tenantId?: string) => {
    if (!_tenantId) {
      return;
    }

    setStorageTenantId(_tenantId);
    setTenantId(_tenantId);
  }, []);

  useEffect(() => {
    if (!!user && !tenantId) {
      switchTanant(user.tenants[0].id);
    }
  }, [switchTanant, user, tenantId]);

  if (isLoading) {
    return <Loading float />;
  }

  if (!user || error) {
    return (
      <ErrorMessage
        message={`We failed to load your user information...`}
        action={{
          label: 'try again',
          onClick: () => window.location.reload(),
        }}
      />
    );
  }

  return (
    <UserContext.Provider value={{ user, tenantId, switchTanant }}>
      {children}
    </UserContext.Provider>
  );
}
