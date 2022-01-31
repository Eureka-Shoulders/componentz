import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
} from '@mui/material';

export type CheckboxProps = {
  label?: string;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  formGroupProps?: FormGroupProps;
  formControlProps?: FormControlProps;
  helperText?: string;
  CheckboxComponent?: (props: CheckboxProps) => React.ReactElement;
} & MuiCheckboxProps;

function Checkbox({
  label,
  CheckboxComponent,
  formControlLabelProps,
  formGroupProps,
  formControlProps,
  helperText,
  ...props
}: CheckboxProps) {
  if (label) {
    return (
      <FormControl {...formControlProps}>
        <FormGroup {...formGroupProps}>
          <FormControlLabel
            {...formControlLabelProps}
            control={
              CheckboxComponent ? (
                <CheckboxComponent {...props} />
              ) : (
                <MuiCheckbox {...props} />
              )
            }
            label={label}
          />
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
  return CheckboxComponent ? (
    <CheckboxComponent {...props} />
  ) : (
    <MuiCheckbox {...props} />
  );
}

export default Checkbox;
