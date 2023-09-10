import useSettingsContext from '@hooks/context/useSettingsContext';
import { Fade, Stack } from '@mui/material';
import testIds from '@testIds';

export default function ViewSettings() {
  const { settings } = useSettingsContext();

  return (
    <Fade appear in>
      <Stack data-testid={testIds.Settings.content_view}>View MODE</Stack>
    </Fade>
  );
}
