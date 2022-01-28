import { TextField, TextFieldProps } from '@mui/material';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';

export type MaskedFieldProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
} & InputMaskProps;

const MaskedField = ({
  label,
  mask,
  textFieldProps,
  ...props
}: MaskedFieldProps) => {
  return (
    <InputMask mask={mask} {...props}>
      {() => <TextField {...textFieldProps} label={label} fullWidth />}
    </InputMask>
  );
};

export default MaskedField;
