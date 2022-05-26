import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/lab';
import { TextField, TextFieldProps } from '@mui/material';

export type DateTimePickerProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
  onChange: (date: unknown, keyboardInputValue: string | undefined) => void;
  value: Date | string | undefined;
} & Omit<MuiDateTimePickerProps, 'renderInput' | 'onChange' | 'value'>;

function DatePicker({
  label,
  onChange,
  value,
  textFieldProps,
  ...props
}: DateTimePickerProps) {
  return (
    <MuiDateTimePicker
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
