import type { ButtonProps } from '@mui/material';
import { Button, Hidden, IconButton, Tooltip } from '@mui/material';
import testIds from '@testIds';

export type ActionButtonProps = ButtonProps & {
  label: string;
  icon: React.ReactNode;
};

export default function ActionButton({ label, icon, ...props }: ActionButtonProps) {
  return (
    <>
      <Hidden smUp initialWidth="xs">
        <Button
          data-testid={testIds.ActionButton}
          {...props}
          variant="contained"
          endIcon={icon}
        >
          {label}
        </Button>
      </Hidden>

      <Hidden smDown>
        <Tooltip title={label}>
          <IconButton data-testid={testIds.ActionButton} {...props} aria-label={label}>
            {icon}
          </IconButton>
        </Tooltip>
      </Hidden>
    </>
  );
}
