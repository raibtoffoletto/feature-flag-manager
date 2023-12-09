import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import type { ButtonProps, StackProps, SxProps, TypographyProps } from '@mui/material';
import { Button, Stack, Typography } from '@mui/material';
import testIds from '@testIds';

export interface ErrorMessageProps extends Partial<StackProps> {
  message: string;
  action?: ButtonProps & { label?: string };
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
  const { label: actionLabel, ...actionProps } = action ?? {};

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      p={4}
      gap={4}
      {...props}
      data-testid={testIds.ErrorMessage}
    >
      <GppMaybeIcon
        sx={{
          color: ({ palette }) => palette.error.dark,
          width: 96,
          height: 96,
          ...IconProps,
        }}
      />

      <Typography
        component="div"
        variant="h5"
        color="text.secondary"
        align="center"
        {...TypographyProps}
      >
        {message}
      </Typography>

      {!!actionLabel && (
        <Button
          variant="contained"
          color="secondary"
          {...actionProps}
          data-testid={testIds.ActionButton}
        >
          {actionLabel}
        </Button>
      )}
    </Stack>
  );
}
