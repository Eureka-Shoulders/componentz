import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteRenderOptionState,
  Checkbox,
  CircularProgress,
  FilterOptionsState,
  TextField,
  TextFieldProps,
  createFilterOptions,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

function filterOptions<T>(options: T[], state: FilterOptionsState<T>) {
  const filteredOptions = createFilterOptions<T>();
  return filteredOptions(options, state);
}

export type AutocompleteProps<T> = {
  label?: string;
  textFieldProps?: TextFieldProps;
  checkbox?: boolean;
  options: T[];
  buildNew?: (value: string) => T;
  debounce?: number;
  onDebouncedInputChange?: (value: string) => void;
} & Omit<
  MuiAutocompleteProps<any, true | false, true | false, true | false>,
  'renderInput'
>;

function defaultFilterOptions<T>(buildNew: AutocompleteProps<T>['buildNew']) {
  return (options: T[], state: FilterOptionsState<T>) => {
    const filtered = filterOptions(options, state);
    if (!!buildNew && state.inputValue !== '') {
      filtered.push(buildNew(state.inputValue));
    }
    return filtered;
  };
}

function Autocomplete<T>({
  label,
  textFieldProps,
  checkbox,
  options,
  buildNew,
  debounce,
  onDebouncedInputChange,
  ...props
}: AutocompleteProps<T>) {
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
      option: T,
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
}

export default Autocomplete;
