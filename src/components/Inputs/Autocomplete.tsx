import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
  AutocompleteRenderOptionState,
  Checkbox,
  CircularProgress,
  FilterOptionsState,
  TextField,
  TextFieldProps,
  createFilterOptions,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

const filter = createFilterOptions();

export type InternalAutocompleteProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
  checkbox?: boolean;
  options: any[];
  buildNew?: (value: string) => any;
  debounce?: number;
  onDebouncedInputChange?: (value: string) => void;
} & Omit<
  AutocompleteProps<any, true | false, true | false, true | false>,
  'renderInput'
>;

const defaultFilterOptions =
  (buildNew: InternalAutocompleteProps['buildNew']) =>
  (options: any[], state: FilterOptionsState<any>) => {
    const filtered = filter(options, state);
    if (!!buildNew && state.inputValue !== '') {
      filtered.push(buildNew(state.inputValue));
    }
    return filtered;
  };

const Autocomplete = ({
  label,
  textFieldProps,
  checkbox,
  options,
  buildNew,
  debounce,
  onDebouncedInputChange,
  ...props
}: InternalAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!debounce) {
      return () => null;
    }

    const loadOptionsTimeout = setTimeout(() => {
      if (onDebouncedInputChange) {
        onDebouncedInputChange(inputValue);
      }
    }, debounce);

    return () => {
      clearTimeout(loadOptionsTimeout);
    };
  }, [inputValue]);

  const withCheckboxOptionRenderer = useCallback(
    (
      params: React.HTMLAttributes<HTMLLIElement>,
      option: any,
      state: AutocompleteRenderOptionState
    ) => (
      <li {...params}>
        <Checkbox
          color="primary"
          style={{ marginRight: 8 }}
          checked={state.selected}
        />
        {(props?.getOptionLabel ?? ((option) => option))(option)}
      </li>
    ),
    []
  );

  return (
    <MuiAutocomplete
      {...props}
      options={options}
      fullWidth
      filterOptions={props.filterOptions || defaultFilterOptions(buildNew)}
      loading={props.loading}
      onInputChange={(e, value) => setInputValue(value)}
      renderOption={checkbox ? withCheckboxOptionRenderer : undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {props.loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default Autocomplete;
