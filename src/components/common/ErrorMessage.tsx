import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import type { StackProps, SxProps, TypographyProps } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import testIds from '@testIds';
import type { ActionButtonProps } from './ActionButton';
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
        align="center"
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
