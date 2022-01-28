import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
  LocalizationProviderProps,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, TextFieldProps } from '@mui/material';

export type DatePickerProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
  localizationProviderProps?: Omit<LocalizationProviderProps, 'dateAdapter'>;
  dateAdapter?: LocalizationProviderProps['dateAdapter'];
  onDatePickerChange: (
    date: unknown,
    keyboardInputValue: string | undefined
  ) => void;
  datePickerValue: Date | string | undefined;
} & Omit<MuiDatePickerProps, 'renderInput' | 'onChange' | 'value'>;

const DatePicker = ({
  label,
  textFieldProps,
  dateAdapter,
  localizationProviderProps,
  onDatePickerChange,
  datePickerValue,
  ...props
}: DatePickerProps) => {
  return (
    <LocalizationProvider
      {...localizationProviderProps}
      dateAdapter={dateAdapter || AdapterDateFns}
    >
      <MuiDatePicker
        {...props}
        value={datePickerValue}
        onChange={onDatePickerChange}
        label={label}
        renderInput={(params) => (
          <TextField {...params} fullWidth {...textFieldProps} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
