import { Stack, Typography, Box } from '@mui/material';
import { CloudSync } from '@mui/icons-material';

function AppText({
  color,
  label,
  bold,
}: {
  color: string;
  label: string;
  bold?: boolean;
}) {
  const initial = label[0];
  const rest = label.slice(1);

  return (
    <Typography
      component="div"
      sx={{
        color,
        fontSize: '2rem',
        textTransform: 'capitalize',
        fontWeight: bold ? 500 : 400,
      }}
    >
      {initial}
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
        {rest}
      </Box>
    </Typography>
  );
}

export default function AppTitle() {
  return (
    <Stack direction="row" alignItems="flex-end">
      <AppText color="primary.main" label="Feature" bold />

      <AppText color="primary.light" label="Flag" />

      <CloudSync
        sx={{
          color: 'primary.light',
          width: 40,
          height: 40,
          my: 0.5,
          mr: { xs: 0.25, sm: 0.5 },
          ml: { xs: -0.5, sm: 0 },
        }}
      />

      <AppText color="grey.600" label="Manager" />
    </Stack>
  );
}
