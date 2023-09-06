import { getSettings } from '@api/app';
import useSWR from 'swr';

export default function useSettings() {
  return useSWR('useSettings', getSettings);
}
