import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers';
import { TextField, TextFieldProps } from '@mui/material';

export type DateTimePickerProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
  onChange: (date: unknown, keyboardInputValue: string | undefined) => void;
  value?: Date | string | null;
} & Omit<
  MuiDateTimePickerProps<unknown, unknown>,
  'renderInput' | 'onChange' | 'value'
>;

function DateTimePicker({
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

export default DateTimePicker;
