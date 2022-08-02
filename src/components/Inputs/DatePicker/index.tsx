import { TextField, TextFieldProps } from '@mui/material';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers';

export type DatePickerProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
  onChange: (date: unknown, keyboardInputValue: string | undefined) => void;
  value: Date | string | undefined;
} & Omit<
  MuiDatePickerProps<unknown, unknown>,
  'renderInput' | 'onChange' | 'value'
>;

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
        <TextField
          {...params}
          {...textFieldProps}
          fullWidth
          onBlur={(e) => {
            textFieldProps?.onBlur && textFieldProps?.onBlur(e);
            params.onBlur && params.onBlur(e);
          }}
          error={params.error || textFieldProps?.error}
          helperText={params.helperText || textFieldProps?.helperText}
        />
      )}
    />
  );
}

export default DatePicker;
