import type { ButtonProps } from '@mui/material';
import { Button, Hidden, IconButton, Tooltip } from '@mui/material';
import testIds from '@testIds';

export type ActionButtonProps = Pick<ButtonProps, 'color' | 'onClick'> & {
  label: string;
  icon: React.ReactNode;
};

export default function ActionButton({ label, icon, color, onClick }: ActionButtonProps) {
  return (
    <>
      <Hidden smUp initialWidth="xs">
        <Button
          onClick={onClick}
          color={color}
          variant="contained"
          endIcon={icon}
          data-testid={testIds.ActionButton}
        >
          {label}
        </Button>
      </Hidden>

      <Hidden smDown>
        <Tooltip title={label}>
          <IconButton
            onClick={onClick}
            color={color}
            aria-label={label}
            data-testid={testIds.ActionButton}
          >
            {icon}
          </IconButton>
        </Tooltip>
      </Hidden>
    </>
  );
}
