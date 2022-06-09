import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

export interface HTMLNumericElement
  extends Omit<HTMLInputElement, 'value' | 'name'> {
  value: number | '';
  name?: string;
}

export type NumericInputProps = Omit<TextFieldProps, 'onChange'> & {
  value?: number | string;
  onChange?(e: React.ChangeEvent<HTMLNumericElement>): void;
  negative?: boolean;

  precision: number;
  thousandChar: string;
  decimalChar: string;
};

function verifyNumber(string: string) {
  const numericRepresentation = string.replace(/[,.]/g, '');

  return {
    isNumber: !isNaN(Number(numericRepresentation)),
    numberFormat: !isNaN(Number(numericRepresentation))
      ? Number(numericRepresentation)
      : null,
  };
}

function NumericField(props: NumericInputProps) {
  const {
    value,
    precision,
    thousandChar,
    decimalChar,
    negative,
    ...inputProps
  } = props;
  const defaultValue = value === '' ? NaN : Number(value);
  const [isNegative, setIsNegative] = useState(false);
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }),

    [thousandChar, decimalChar, precision]
  );

  if (!decimalChar) {
    throw new Error('Decimal char should not be an empty string!');
  }
  if (!thousandChar) {
    throw new Error('Thousand char should not be an empty string!');
  }

  const hasValue = value !== undefined;
  let inputDefaultValue;
  let inputValue;

  if (hasValue) {
    if (isNaN(defaultValue) || value === '') {
      inputValue = '';
    } else {
      inputValue = format(defaultValue);
    }
  }

  if (!hasValue && !isNaN(defaultValue)) {
    inputDefaultValue = format(defaultValue);
  }

  if (isNegative) {
    if (inputDefaultValue && !inputDefaultValue.includes('-')) {
      inputDefaultValue = `-${inputDefaultValue}`;
    }
    if (inputValue && !inputValue.includes('-')) {
      inputValue = `-${inputValue}`;
    }
  }

  function format(number: number) {
    const result = formatter
      .format(number)
      .replace(',', decimalChar)
      .replaceAll('.', thousandChar);

    return result;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (
      e.ctrlKey ||
      e.shiftKey ||
      e.key === 'Backspace' ||
      e.key === 'Enter' ||
      e.key === 'Tab' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      e.key === 'Delete'
    ) {
      return;
    }

    if (e.key === ' ') {
      return e.preventDefault();
    }

    if (e.key === '-' && negative) {
      setIsNegative((prev) => !prev);
      return e.preventDefault();
    }

    if (!verifyNumber(e.key).isNumber) {
      return e.preventDefault();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newEvent: React.ChangeEvent<HTMLNumericElement> = {
      ...e,
      currentTarget: {
        ...e.currentTarget,
        name: props.name,
        value: 0,
      },
      target: {
        ...e.target,
        name: props.name,
        value: 0,
      },
    };
    let numericRepresentation = e.target.value;

    numericRepresentation = numericRepresentation.replaceAll(thousandChar, '');
    numericRepresentation = numericRepresentation.replace(decimalChar, '');

    if (numericRepresentation === '') {
      e.target.value = '';
      newEvent.target.value = '';
      newEvent.currentTarget.value = '';
      return props.onChange && props.onChange(newEvent);
    }

    const { isNumber, numberFormat } = verifyNumber(numericRepresentation);

    if (isNumber && numberFormat !== null) {
      let withPrecision = numberFormat / 10 ** precision;
      const formattedNumber = format(withPrecision);

      if (withPrecision > 0 && isNegative) {
        withPrecision = withPrecision * -1;
      }

      newEvent.target.value = withPrecision;
      newEvent.currentTarget.value = withPrecision;

      e.target.value = formattedNumber;

      props.onChange && props.onChange(newEvent);
    }
  }

  useEffect(() => {
    if (!negative) {
      setIsNegative(false);
    }
  }, [negative]);

  return (
    <TextField
      defaultValue={inputDefaultValue}
      {...inputProps}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={inputValue}
    />
  );
}

export default NumericField;
