import {
  DesktopDatePickerProps,
  LocalizationProvider,
  LocalizationProviderProps,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Popover } from '@mui/material';
import { useRef, useState } from 'react';

import BaseCalendarPicker from './CalendarPicker';
import DateRangeMaskedInput from './DateRangeMaskedInput';
import DateRangePickerStore from './store';

export type DateRangePickerProps = Omit<
  DesktopDatePickerProps,
  'renderInput'
> & {
  renderInput?: DesktopDatePickerProps['renderInput'];
  onChange: (value: { start: Date | null; end: Date | null }) => void;
  localizationProviderProps?: Omit<LocalizationProviderProps, 'dateAdapter'>;
  dateAdapter?: LocalizationProviderProps['dateAdapter'];
  label?: string;
  value: {
    start: Date | null;
    end: Date | null;
  };
};

function DateRangePicker({
  value,
  localizationProviderProps,
  dateAdapter,
  label,
  ...props
}: DateRangePickerProps) {
  const [store] = useState(() => new DateRangePickerStore(value));
  const anchorRef = useRef(null);

  return (
    <LocalizationProvider
      {...localizationProviderProps}
      dateAdapter={dateAdapter || AdapterDateFns}
    >
      <DateRangeMaskedInput
        label={label}
        store={store}
        value={value}
        anchorRef={anchorRef}
        onChange={props.onChange}
      />
      <Popover
        open={store.open}
        anchorEl={anchorRef.current}
        onClose={() => store.setOpen(false)}
      >
        <BaseCalendarPicker
          onChange={props.onChange}
          value={value}
          store={store}
        />
      </Popover>
    </LocalizationProvider>
  );
}

export default DateRangePicker;
