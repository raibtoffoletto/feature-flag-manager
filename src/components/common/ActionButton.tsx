import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import testIds from '@testIds';

export interface ActionButtonProps extends Partial<Omit<ButtonProps, 'children'>> {
  label: string;
}

export default function ActionButton({ label, ...props }: ActionButtonProps) {
  return (
    <Button {...props} data-testid={testIds.ActionButton}>
      {label}
    </Button>
  );
}
