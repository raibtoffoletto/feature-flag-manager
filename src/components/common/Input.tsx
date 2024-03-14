import { TextField, TextFieldProps } from '@mui/material';

export default function Input(props: TextFieldProps) {
  return <TextField {...props} variant="outlined" size="small" />;
}
