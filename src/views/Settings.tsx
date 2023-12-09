import Content from '@components/layout/Content';
import Edit from '@components/settings/Edit';
import View from '@components/settings/View';
import { SettingsViewContextProvider } from '@contexts/SettingsView';
import useSettingsViewContext from '@hooks/context/useSettingsViewContext';
import { Typography } from '@mui/material';
import testIds from '@testIds';

function Contents() {
  const { isEditing } = useSettingsViewContext();

  return isEditing ? <Edit /> : <View />;
}

export default function Settings() {
  return (
    <SettingsViewContextProvider>
      <Content title="Settings" data-testid={testIds.Settings.content}>
        <Typography variant="h4" component="h2" mb={3}>
          Environments
        </Typography>

        <Contents />
      </Content>
    </SettingsViewContextProvider>
  );
}
