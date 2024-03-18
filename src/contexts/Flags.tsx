import useFlags from '@hooks/swr/useFlags';
import { createContext, useEffect, useMemo, useState } from 'react';

const initialContext: IFlagsContext = {
  isLoading: false,
  flags: [],
  setSelected: () => undefined,
  refetchFlags: async () => undefined,
};

export const FlagsContext = createContext<IFlagsContext>(initialContext);

export function FlagsContextProvider({ children }: IParent) {
  const [selected, setSelected] = useState<string>();

  const { data, isLoading, mutate } = useFlags();

  const flags = useMemo(() => {
    const _flags = data ?? [];

    _flags.sort((a, b) => a.key.localeCompare(b.key, undefined, { sensitivity: 'base' }));

    return _flags;
  }, [data]);

  const selectedFlag = useMemo(
    () => flags.find((f) => f.key === selected),
    [flags, selected],
  );

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (
        (e.key === 'Escape' || e.key === 'Esc') &&
        document.activeElement?.tagName.toLowerCase() === 'body'
      ) {
        setSelected(undefined);
      }
    }

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <FlagsContext.Provider
      value={{
        isLoading,
        flags,
        selected,
        setSelected,
        selectedFlag,
        refetchFlags: mutate,
      }}
    >
      {children}
    </FlagsContext.Provider>
  );
}
