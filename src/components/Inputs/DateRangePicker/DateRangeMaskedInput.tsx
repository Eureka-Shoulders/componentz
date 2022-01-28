import CloseIcon from '@mui/icons-material/Close';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { isAfter, isEqual, isValid, parse, isBefore } from 'date-fns';
import { observer } from 'mobx-react-lite';
import MaskedField from '../MaskedField';

import DateRangePickerStore from './store';

type DateRangeMaskedInputProps = {
  store: DateRangePickerStore;
  value: {
    start: Date | null;
    end: Date | null;
  };
  anchorRef: React.MutableRefObject<null>;
  onChange: (value: { start: Date | null; end: Date | null }) => void;
  error?: boolean;
  helperText?: string;
  textFieldProps?: TextFieldProps;
  label?: string;
};

const DateRangeMaskedInput = ({
  store,
  value,
  anchorRef,
  onChange,
  error,
  helperText,
  label,
  textFieldProps,
}: DateRangeMaskedInputProps) => {
  const handleTogle = () => {
    store.setOpen(!store.open);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;
    const fDate = parse(fieldValue.substring(0, 10), 'dd/MM/yyyy', new Date());
    const sDate = parse(fieldValue.substring(14, 24), 'dd/MM/yyyy', new Date());
    if (isValid(fDate)) {
      store.setValues({
        ...value,
        start: fDate,
      });
      onChange({
        ...value,
        start: fDate,
      });
    }
    if (value.start) {
      if (isValid(sDate) && isAfter(sDate, value.start)) {
        store.setValues({
          ...value,
          end: sDate,
        });
        onChange({
          ...value,
          end: sDate,
        });
      }
      if (isBefore(sDate, value.start) || isEqual(sDate, fDate)) {
        store.setError(true);
        store.setHelperText(
          'A data final não pode ser anterior ou igual a data inicial'
        );
      } else {
        store.setError(false);
        store.setHelperText('');
      }
    }
    store.setFieldValue(fieldValue);
  };

  const clearAll = () => {
    store.setValues({
      start: null,
      end: null,
    });
    onChange({
      start: null,
      end: null,
    });
    store.setFieldValue('');
    store.setError(false);
    store.setHelperText('');
  };
  return (
    <MaskedField
      mask="99/99/9999 -> 99/99/9999"
      label={label}
      onChange={handleChange}
      value={store.fieldValue}
      textFieldProps={{
        error: error || store.error,
        helperText: helperText || store.helperText,
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge={value.start ? undefined : 'end'}
                onClick={handleTogle}
                ref={anchorRef}
              >
                <DateRangeIcon />
              </IconButton>
              {value.start && (
                <IconButton edge="end" onClick={clearAll}>
                  <CloseIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
        ...textFieldProps,
      }}
    />
  );
};

export default observer(DateRangeMaskedInput);
