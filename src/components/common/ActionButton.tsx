import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';

export interface ActionButtonProps extends Partial<Omit<ButtonProps, 'children'>> {
  label: string;
}

export default function ActionButton({ label, ...props }: ActionButtonProps) {
  return <Button {...props}>{label}</Button>;
}
