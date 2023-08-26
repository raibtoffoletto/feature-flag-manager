import type { SxProps, TypographyProps, StackProps } from '@mui/material';
import type { ActionButtonProps } from './ActionButton';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Stack, Typography } from '@mui/material';
import testIds from '@testIds';
import ActionButton from './ActionButton';

export interface ErrorMessageProps extends Partial<StackProps> {
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
        {...TypographyProps}
      >
        {message}
      </Typography>

      {!!action?.label && (
        <ActionButton variant="contained" color="secondary" {...action} />
      )}
    </Stack>
  );
}
