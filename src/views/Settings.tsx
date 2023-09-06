import useSettingsContext from '@hooks/context/useSettingsContext';
import { Stack, Typography } from '@mui/material';
import testIds from '@testIds';

export default function Settings() {
  const { settings } = useSettingsContext();

  return (
    <Stack sx={{ padding: 2, width: '100%' }} data-testid={testIds.Settings}>
      <Typography variant="h2" component="h1" align="center">
        Settings
      </Typography>

      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </Stack>
  );
}
