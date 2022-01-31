/* eslint-disable react/prop-types */
import React from 'react';
import {
  default as RNFNumberFormat,
  NumberFormatProps,
} from 'react-number-format';

export type CustomProps = {
  onChange: (value: {
    target: {
      name: string | undefined;
      value: string | undefined;
    };
  }) => void;
} & NumberFormatProps;

const NumberFormat = React.forwardRef<HTMLElement, CustomProps>(
  function NumberFormat(props, ref) {
    const { onChange, decimalScale, thousandSeparator, ...rest } = props;
    return (
      <RNFNumberFormat
        {...rest}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString
        allowNegative={false}
        thousandSeparator={thousandSeparator}
        decimalSeparator=","
        decimalScale={decimalScale}
        isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          const correctedFloatValue = floatValue || 0;
          return (
            formattedValue === '' || correctedFloatValue <= 9999999999999.99
          );
        }}
      />
    );
  }
);

NumberFormat.defaultProps = {
  decimalScale: 2,
  thousandSeparator: '.',
};

export default NumberFormat;
