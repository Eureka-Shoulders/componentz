/* eslint-disable react/display-name */
import { CalendarPicker as MuiCalendarPicker, PickersDayProps } from '@mui/lab';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { format, isAfter, isBefore } from 'date-fns';

import CustomPickersDay from './CustomPickersDay';
import DateRangePickerStore, { DateRange } from './store';

function RenderCustomDay(
  value: {
    start: Date | null;
    end: Date | null;
  },
  store: DateRangePickerStore
) {
  return (
    date: Date,
    _selectedDates: (Date | null)[],
    pickersDayProps: PickersDayProps<Date>
  ) => {
    const isIncluded = store.isBetweenDates(date);
    const isSelected = store.isSelected(date);
    const isFirstDay = () => {
      if (value.start) {
        return format(date, 'dd/MM/yyyy') === format(value.start, 'dd/MM/yyyy');
      }
    };

    const isLastDay = () => {
      if (value.end) {
        return format(date, 'dd/MM/yyyy') === format(value.end, 'dd/MM/yyyy');
      }
    };

    const getBoxColor = () => {
      if (isIncluded && !pickersDayProps.outsideCurrentMonth) {
        return grey[300];
      }
      return undefined;
    };
    const getBorderRadius = () => {
      if (isLastDay()) {
        return '0 45% 45% 0';
      }
      if (isFirstDay()) {
        return '45% 0  0 45%';
      }
    };

    return (
      <Box
        pt={'2px'}
        pb={'2px'}
        bgcolor={getBoxColor()}
        borderRadius={getBorderRadius()}
      >
        <CustomPickersDay
          {...pickersDayProps}
          isIncluded={isIncluded}
          isSelected={isSelected}
        />
      </Box>
    );
  };
}

type BaseCalendarPickerProps = {
  store: DateRangePickerStore;
  value: {
    start: Date | null;
    end: Date | null;
  };
  onChange: (value: DateRange) => void;
};

function BaseCalendarPicker({
  value,
  store,
  onChange,
}: BaseCalendarPickerProps) {
  const handleChange = (date: Date | null) => {
    if (value.start && value.end && isBefore(date as Date, value.end)) {
      store.setValues({
        start: date,
        end: null,
      });
      onChange({
        start: date,
        end: null,
      });
      store.setFieldValue(format(date as Date, 'dd/MM/yyyy'));
      return;
    }
    if (value.start && value.end && isAfter(date as Date, value.end)) {
      store.setFieldValue(
        `${store.fieldValue.substring(0, 10)} -> ${format(
          date as Date,
          'dd/MM/yyyy'
        )}`
      );
      store.setValues({
        ...value,
        end: date,
      });
      onChange({
        ...value,
        end: date,
      });
      return;
    }
    if (value.start && isBefore(date as Date, value.start)) {
      store.setValues({
        start: date,
        end: null,
      });
      onChange({
        start: date,
        end: null,
      });
      store.setFieldValue(format(date as Date, 'dd/MM/yyyy'));
      return;
    }
    if (!value.start) {
      store.setValues({
        start: date,
        end: null,
      });
      onChange({
        start: date,
        end: null,
      });
      store.setFieldValue(format(date as Date, 'dd/MM/yyyy'));
      return;
    }
    if (!value.end) {
      store.setFieldValue(
        `${store.fieldValue.substring(0, 10)} -> ${format(
          date as Date,
          'dd/MM/yyyy'
        )}`
      );
      store.setValues({
        ...value,
        end: date,
      });
      onChange({
        ...value,
        end: date,
      });
    }
  };

  return (
    <MuiCalendarPicker
      date={value.start}
      renderDay={RenderCustomDay(value, store)}
      onChange={handleChange}
    />
  );
}

export default BaseCalendarPicker;
