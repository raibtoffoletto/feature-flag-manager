import useSettingsViewContext from '@hooks/context/useSettingsViewContext';
import { Fade, Stack, Typography } from '@mui/material';
import testIds from '@testIds';
import AddEnvironment from './AddEnvironment';
import EditEndpoint from './EditEndpoint';
import EditEnvironment from './EditEnvironment';

export default function EditSettings() {
  const { environments } = useSettingsViewContext();

  return (
    <Fade appear in>
      <Stack data-testid={testIds.Settings.content_edit} gap={6}>
        <EditEndpoint />

        {environments.map((env) => (
          <EditEnvironment key={env.id} {...env} />
        ))}

        <Stack gap={2}>
          <Typography variant="h6" component="h3" pl={0.5}>
            Add new:
          </Typography>

          <AddEnvironment />
        </Stack>
      </Stack>
    </Fade>
  );
}
