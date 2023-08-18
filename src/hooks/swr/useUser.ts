import { getUser } from '@api/user';
import useSWR from 'swr';

export default function useUser() {
  return useSWR('useUser', getUser);
}
