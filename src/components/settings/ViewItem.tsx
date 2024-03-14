import { Stack, Typography } from '@mui/material';
import testIds from '@testIds';

export default function ViewItem({ label, value }: { label: string; value: string }) {
  return (
    <Stack pl={1} gap={0.5} data-testid={testIds.Settings.content_item}>
      <Typography fontSize="1.2rem" fontWeight={400}>
        {label}
        {`: `}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontFamily: 'monospace',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: '4px',
          width: 'max-content',
          padding: '3px 6px',
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
