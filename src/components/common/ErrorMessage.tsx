import type { SxProps, TypographyProps, StackProps } from '@mui/material';
import type { ActionButtonProps } from './ActionButton';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Stack, Typography } from '@mui/material';
import ActionButton from './ActionButton';

interface ErrorMessageProps extends Partial<StackProps> {
  message: string;
  action?: ActionButtonProps;
  IconProps?: SxProps;
  TypographyProps?: Partial<Omit<TypographyProps, 'children'>>;
}

export default function ErrorMessage({
  message,
  action,
  IconProps,
  TypographyProps,
  ...props
}: ErrorMessageProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      p={4}
      gap={4}
      {...props}
    >
      <GppMaybeIcon
        sx={{
          color: ({ palette }) => palette.error.main,
          width: 96,
          height: 96,
          ...IconProps,
        }}
      />

      <Typography
        component="div"
        variant="h5"
        color="text.secondary"
        {...TypographyProps}
      >
        {message}
      </Typography>

      {!!action?.label && <ActionButton variant="contained" color="error" {...action} />}
    </Stack>
  );
}
