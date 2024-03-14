import useSettingsContext from '@hooks/context/useSettingsContext';
import { Fade, Stack } from '@mui/material';
import testIds from '@testIds';
import ViewItem from './ViewItem';

export default function ViewSettings() {
  const { settings } = useSettingsContext();

  return (
    <Fade appear in>
      <Stack data-testid={testIds.Settings.content_view} gap={3}>
        <ViewItem label="Endpoint" value={settings.endpoint} />

        {settings.environments.map((env) => (
          <ViewItem key={env.id} label={env.name} value={env.url} />
        ))}
      </Stack>
    </Fade>
  );
}
