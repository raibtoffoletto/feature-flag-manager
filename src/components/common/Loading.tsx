import type { BoxProps, CircularProgressProps } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';

export interface LoadingProps {
  float?: boolean;
  BoxProps?: BoxProps;
  CircularProgressProps?: CircularProgressProps;
}

export default function Loading({
  float,
  BoxProps,
  CircularProgressProps,
}: LoadingProps) {
  return (
    <Box
      {...BoxProps}
      sx={{
        BoxPropsdisplay: 'flex',
        width: 40,
        height: 40,
        ...(float
          ? {
              position: 'absolute',
              left: 'calc(50% - 20px)',
              top: 'calc(50% - 20px)',
            }
          : {}),
        ...BoxProps?.sx,
      }}
    >
      <CircularProgress {...CircularProgressProps} />
    </Box>
  );
}
