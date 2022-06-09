import { DesktopDatePickerProps } from '@mui/lab';
import { Popover } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';

import BaseCalendarPicker from './CalendarPicker';
import DateRangeMaskedInput from './DateRangeMaskedInput';
import DateRangePickerStore, { DateRange } from './store';

export type DateRangePickerProps = Omit<
  DesktopDatePickerProps,
  'renderInput' | 'onChange'
> & {
  renderInput?: DesktopDatePickerProps['renderInput'];
  onChange: (value: DateRange) => void;
  label?: string;
  value: DateRange;
};

function DateRangePicker({
  value,
  label,
  onChange,
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
