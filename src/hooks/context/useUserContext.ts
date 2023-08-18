import { UserContext } from '@contexts/User';
import { useContext } from 'react';

export default function useUserContext() {
  return useContext(UserContext);
}
