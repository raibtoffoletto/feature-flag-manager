import type { ButtonProps } from '@mui/material';
import { Button, IconButton, Tooltip } from '@mui/material';
import testIds from '@testIds';

export type ActionButtonProps = ButtonProps & {
  label: string;
  icon: React.ReactNode;
};

export default function ActionButton({ label, icon, ...props }: ActionButtonProps) {
  return (
    <>
      <Button
        data-testid={testIds.ActionButton}
        {...props}
        variant="contained"
        endIcon={icon}
        sx={{ display: { xs: 'flex', sm: 'none' }, ...props?.sx }}
      >
        {label}
      </Button>

      <Tooltip title={label}>
        <IconButton
          data-testid={testIds.ActionButton}
          {...props}
          aria-label={label}
          sx={{ display: { xs: 'none', sm: 'flex' }, ...props?.sx }}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
}
