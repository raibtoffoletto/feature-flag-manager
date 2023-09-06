import { SettingsContext } from '@contexts/Settings';
import { useContext } from 'react';

export default function useSettingsContext() {
  return useContext(SettingsContext);
}
