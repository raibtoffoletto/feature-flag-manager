import { deleteTenantFlag, getTenantFlag, putTenantFlag } from '@api/flags';
import useSettingsContext from '@hooks/context/useSettingsContext';
import useUserContext from '@hooks/context/useUserContext';
import getEnvUrl from '@lib/getEnvUrl';
import { createContext, useCallback, useEffect, useState } from 'react';

const initialContext: IFlagViewContext = {
  key: '',
  valueType: 'string',
  isLoading: false,
  environments: [],
  saveFlag: async () => undefined,
  removeFlag: async () => undefined,
};

const mapFlagRequest =
  (flagKey: string, endpoint: string, tenantId: string) => async (env: Environment) => {
    let environmentFlag: EnvironmentFlag;

    try {
      const url = getEnvUrl(env.url, endpoint, flagKey);

      const { value } = await getTenantFlag(url, tenantId);

      if (value === undefined || value === null) {
        throw new Error();
      }

      environmentFlag = {
        ...env,
        value,
        exists: true,
      };
    } catch {
      environmentFlag = {
        ...env,
        value: '',
        exists: false,
      };
    }

    return environmentFlag;
  };

export const FlagViewContext = createContext<IFlagViewContext>(initialContext);

export function FlagViewContextProvider({ flag, children }: IParent & { flag: Flag }) {
  const [isLoading, setLoading] = useState(true);
  const { tenant } = useUserContext();
  const { settings } = useSettingsContext();
  const [environments, setEnvironments] = useState<EnvironmentFlag[]>([]);
  console.debug(environments);
  const getFlagValues = useCallback(async () => {
    if (!tenant?.id) {
      return setLoading(false);
    }

    const results = await Promise.all(
      settings.environments.map(mapFlagRequest(flag.key, settings.endpoint, tenant.id)),
    );

    setEnvironments(results);
    setLoading(false);
  }, [flag, settings, tenant]);

  const saveFlag = useCallback(
    async (envUrl: string, _value?: string) => {
      if (!tenant?.id) {
        return;
      }

      setLoading(true);

      try {
        const url = getEnvUrl(envUrl, settings.endpoint, flag.key);

        await putTenantFlag(
          {
            key: flag.key,
            value: _value ?? (flag.valueType === 'boolean' ? 'false' : ''),
          },
          url,
          tenant.id,
        );

        await getFlagValues();
      } catch (error: any) {
        console.log('[API Error]: ' + error?.message);

        setLoading(false);
      }
    },
    [flag, settings.endpoint, tenant, getFlagValues],
  );

  const removeFlag = useCallback(
    async (envUrl: string) => {
      if (!tenant?.id) {
        return;
      }

      setLoading(true);

      try {
        const url = getEnvUrl(envUrl, settings.endpoint, flag.key);

        await deleteTenantFlag(url, tenant.id);

        await getFlagValues();
      } catch (error: any) {
        console.log('[API Error]: ' + error?.message);

        setLoading(false);
      }
    },
    [flag, settings.endpoint, tenant, getFlagValues],
  );

  useEffect(() => {
    setLoading(true);

    getFlagValues();
  }, [getFlagValues]);

  return (
    <FlagViewContext.Provider
      value={{
        ...flag,
        isLoading,
        environments,
        saveFlag,
        removeFlag,
      }}
    >
      {children}
    </FlagViewContext.Provider>
  );
}
