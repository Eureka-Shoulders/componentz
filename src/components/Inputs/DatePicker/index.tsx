import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/lab';
import { TextField, TextFieldProps } from '@mui/material';

export type DatePickerProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
  onChange: (date: unknown, keyboardInputValue: string | undefined) => void;
  value: Date | string | undefined;
} & Omit<MuiDatePickerProps, 'renderInput' | 'onChange' | 'value'>;

function DatePicker({
  label,
  onChange,
  value,
  textFieldProps,
  ...props
}: DatePickerProps) {
  return (
    <MuiDatePicker
      {...props}
      value={value}
      onChange={onChange}
      label={label}
      renderInput={(params) => (
        <TextField {...params} fullWidth {...textFieldProps} />
      )}
    />
  );
}

export default DatePicker;
