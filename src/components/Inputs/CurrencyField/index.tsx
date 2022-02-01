import {
  InputAdornment,
  InputBaseComponentProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React from 'react';

import NumberFormat from './NumberFormat';

const MoneyFormat = React.forwardRef<
  React.PropsWithChildren<InputBaseComponentProps>,
  any
>(function MoneyFormat(props, ref) {
  return (
    <NumberFormat {...props} ref={ref} decimalScale={2} fixedDecimalScale />
  );
});

function CurrencyField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      fullWidth
      InputProps={{
        ...props.InputProps,
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        inputComponent: MoneyFormat,
      }}
    />
  );
}

export default CurrencyField;
