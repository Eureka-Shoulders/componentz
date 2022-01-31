import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
} from '@mui/material';

export type SwitchProps = {
  label?: string;
  formControlLabelProps?: FormControlLabelProps;
  formGroupProps?: FormGroupProps;
  formControlProps?: FormControlProps;
  helperText?: string | false | null;
  SwitchComponent?: (props: MuiSwitchProps) => React.ReactElement;
} & MuiSwitchProps;

function Switch({
  label,
  formControlLabelProps,
  formGroupProps,
  formControlProps,
  helperText,
  SwitchComponent,
  ...props
}: SwitchProps) {
  if (label) {
    return (
      <FormControl {...formControlProps}>
        <FormGroup {...formGroupProps}>
          <FormControlLabel
            {...formControlLabelProps}
            control={
              SwitchComponent ? (
                <SwitchComponent {...props} />
              ) : (
                <MuiSwitch {...props} />
              )
            }
            label={label}
          />
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
  return SwitchComponent ? (
    <SwitchComponent {...props} />
  ) : (
    <Switch {...props} />
  );
}

export default Switch;
