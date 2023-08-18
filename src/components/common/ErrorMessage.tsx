import type { SxProps, TypographyProps, StackProps, ButtonProps } from '@mui/material';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Stack, Typography, Button } from '@mui/material';

interface ErrorMessageProps extends Partial<StackProps> {
  message: string;
  action?: Partial<Omit<ButtonProps, 'children'>> & { label: string };
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

      {!!action?.label && (
        <Button variant="contained" color="error" {...action}>
          {action.label}
        </Button>
      )}
    </Stack>
  );
}
