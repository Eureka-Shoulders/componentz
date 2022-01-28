import { endOfDay, format, isWithinInterval, startOfDay } from 'date-fns';
import { makeAutoObservable } from 'mobx';

class DateRangePickerStore {
  firstMonth = new Date();
  secondMonth = new Date();
  values: {
    start: Date | null;
    end: Date | null;
  };
  open = false;
  fieldValue = '';
  helperText = '';
  error = false;

  setHelperText(helperText: string) {
    this.helperText = helperText;
  }

  setError(error: boolean) {
    this.error = error;
  }

  setFieldValue(value: string) {
    this.fieldValue = value;
  }

  setOpen(open: boolean) {
    this.open = open;
  }

  constructor(values: { start: Date | null; end: Date | null }) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.values = values;
  }

  setValues(values: { start: Date | null; end: Date | null }) {
    this.values = values;
  }

  isSelected(date: Date) {
    if (!this.values.start || !this.values.end) {
      return false;
    }
    if (
      format(date, 'dd/MM/yyyy') === format(this.values.start, 'dd/MM/yyyy') ||
      format(date, 'dd/MM/yyyy') === format(this.values.end, 'dd/MM/yyyy')
    ) {
      return true;
    }
  }

  isBetweenDates(date: Date) {
    if (!this.values.start || !this.values.end) {
      return false;
    }
    return isWithinInterval(date, {
      start: startOfDay(this.values.start),
      end: endOfDay(this.values.end),
    });
  }
}

export default DateRangePickerStore;
