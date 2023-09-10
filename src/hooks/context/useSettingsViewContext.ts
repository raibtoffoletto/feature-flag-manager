import { SettingsViewContext } from '@contexts/SettingsView';
import { useContext } from 'react';

export default function useSettingsViewContext() {
  return useContext(SettingsViewContext);
}
