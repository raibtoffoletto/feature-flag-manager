import { FlagViewContext } from '@contexts/FlagView';
import { useContext } from 'react';

export default function useFlagViewContext() {
  return useContext(FlagViewContext);
}
