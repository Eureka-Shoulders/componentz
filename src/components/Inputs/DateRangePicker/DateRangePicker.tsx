import { Popover, PopoverProps } from '@mui/material';
import { DesktopDatePickerProps } from '@mui/x-date-pickers';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';

import BaseCalendarPicker from './CalendarPicker';
import DateRangeMaskedInput from './DateRangeMaskedInput';
import DateRangePickerStore, { DateRange } from './store';

export type DateRangePickerProps = Omit<
  DesktopDatePickerProps<unknown, unknown>,
  'renderInput' | 'onChange'
> & {
  renderInput?: DesktopDatePickerProps<unknown, unknown>['renderInput'];
  onChange: (value: DateRange) => void;
  label?: string;
  value: DateRange;
  popoverProps: Omit<PopoverProps, 'open' | 'onClose'>;
};

function DateRangePicker({
  value,
  label,
  onChange,
  popoverProps,
  ...props
}: DateRangePickerProps) {
  const [store] = useState(() => new DateRangePickerStore(value));
  const anchorRef = useRef(null);

  return (
    <>
      <DateRangeMaskedInput
        label={label}
        store={store}
        value={value}
        anchorRef={anchorRef}
        onChange={onChange}
      />
      <Popover
        {...popoverProps}
        open={store.open}
        anchorEl={anchorRef.current}
        onClose={() => store.setOpen(false)}
      >
        <BaseCalendarPicker
          {...props}
          onChange={onChange}
          value={value}
          store={store}
        />
      </Popover>
    </>
  );
}

export default observer(DateRangePicker);
