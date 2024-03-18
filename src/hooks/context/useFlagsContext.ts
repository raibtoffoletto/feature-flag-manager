import { FlagsContext } from '@contexts/Flags';
import { useContext } from 'react';

export default function useFlagsContext() {
  return useContext(FlagsContext);
}
