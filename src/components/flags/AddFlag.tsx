import { FlagRounded as FlagIcon } from '@mui/icons-material';
import { Fade, Stack, Typography } from '@mui/material';
import testIds from '@testIds';
import FlagAction from './FlagAction';

const flagSX = { xs: 48, sm: 64 };

export default function AddFlag() {
  return (
    <Fade appear in>
      <Stack
        gap={2}
        data-testid={testIds.Flags.pane_add}
        style={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FlagIcon sx={{ width: flagSX, height: flagSX, color: 'text.secondary' }} />

        <Typography variant="h4" component="h2" align="center" color="text.secondary">
          Welcome, <br /> select a flag to manage
        </Typography>

        <FlagAction />
      </Stack>
    </Fade>
  );
}
