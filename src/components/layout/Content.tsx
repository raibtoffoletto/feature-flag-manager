import { Stack, StackProps, Typography, TypographyProps } from '@mui/material';

export interface ContentProps extends StackProps {
  title: string;
  titleProps?: Partial<TypographyProps>;
}

export default function Content({ title, titleProps, children, ...props }: ContentProps) {
  return (
    <Stack
      {...props}
      sx={{ padding: 2, width: '100%', gap: 2, position: 'relative', ...props?.sx }}
    >
      <Typography variant="h2" component="h1" align="center" {...titleProps}>
        {title}
      </Typography>

      {children}
    </Stack>
  );
}
