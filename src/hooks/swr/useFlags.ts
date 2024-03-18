import { getFlags } from '@api/app';
import useSWR from 'swr';

export default function useFlags() {
  return useSWR('useFlags', getFlags);
}
