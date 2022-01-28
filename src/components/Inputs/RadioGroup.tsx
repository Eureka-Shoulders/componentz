import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Radio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  RadioProps,
} from '@mui/material';

export interface IRadioOption {
  name: string;
  label: string;
  radioProps?: RadioProps;
  formControlLabelProps?: FormControlLabelProps;
}

export type RadioGroupProps = {
  helperText?: string | false | null;
  label?: string;
  radioGroupProps?: MuiRadioGroupProps;
  formLabelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  options: IRadioOption[];
};

const RadioGroup = ({
  helperText,
  label,
  radioGroupProps,
  formLabelProps,
  formControlProps,
  options,
}: RadioGroupProps) => {
  return (
    <FormControl {...formControlProps}>
      <FormLabel {...formLabelProps}>{label}</FormLabel>
      <MuiRadioGroup {...radioGroupProps}>
        {options.map((option, index) => (
          <FormControlLabel
            {...option.formControlLabelProps}
            value={option.name}
            key={`Option-${option.name}-${index}`}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MuiRadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroup;
