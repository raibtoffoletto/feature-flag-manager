import useSettingsViewContext from '@hooks/context/useSettingsViewContext';
import { Fade, Stack } from '@mui/material';
import testIds from '@testIds';

export default function EditSettings() {
  const { isEditing } = useSettingsViewContext();

  return (
    <Fade appear in>
      <Stack data-testid={testIds.Settings.content_edit}>Edit MODE</Stack>
    </Fade>
  );
}
