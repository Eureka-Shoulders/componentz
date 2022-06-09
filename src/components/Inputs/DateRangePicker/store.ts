import { endOfDay, format, isWithinInterval, startOfDay } from 'date-fns';
import { makeAutoObservable } from 'mobx';

export type DateRange = {
  start: Date | null;
  end: Date | null;
};

class DateRangePickerStore {
  firstMonth = new Date();
  secondMonth = new Date();
  values: DateRange;
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

  private setInitialValues(values: DateRange) {
    if (values.start && values.end) {
      this.setFieldValue(
        `${format(values.start, 'dd/MM/yyyy')} -> ${format(
          values.end,
          'dd/MM/yyyy'
        )}`
      );
      return;
    }
    if (values.start) {
      this.setFieldValue(`${format(values.start, 'dd/MM/yyyy')}`);
      return;
    }
  }

  setOpen(open: boolean) {
    this.open = open;
  }

  constructor(values: DateRange) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.values = values;
    this.setInitialValues(values);
  }

  setValues(values: DateRange) {
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
