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
  debounce as muiDebounce,
} from '@mui/material';
import React, { useCallback } from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const debounced = muiDebounce(
    (value: string) => onDebouncedInputChange && onDebouncedInputChange(value),
    debounce
  );

  // TODO: review this
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

  function handleInputChange(value: string) {
    if (!debounce) {
      return null;
    }

    if (onDebouncedInputChange) {
      debounced(value);
    }
  }

  return (
    <MuiAutocomplete
      {...props}
      options={options}
      fullWidth
      filterOptions={props.filterOptions || defaultFilterOptions(buildNew)}
      loading={props.loading}
      onInputChange={(e, value) => handleInputChange(value)}
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
