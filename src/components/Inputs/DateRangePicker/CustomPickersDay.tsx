import { PickersDay, PickersDayProps } from '@mui/lab';
import { darken, styled } from '@mui/material';

type CustomPickersDayProps = {
  isIncluded: boolean;
  isSelected?: boolean;
};

const CustomPickersDay = styled((props: PickersDayProps<Date>) => (
  <PickersDay {...props} />
))<CustomPickersDayProps>`
  background-color: transparent;
  &:hover {
    background-color: ${(props) =>
      props.isSelected
        ? props.theme.palette.primary.dark
        : props.isIncluded
        ? darken(props.theme.palette.background.paper, 0.2)
        : undefined};

    color: ${(props) =>
      props.isSelected ? props.theme.palette.primary.contrastText : undefined};
  }

  &:not(:hover) {
    background-color: ${(props) =>
      props.isSelected ? props.theme.palette.primary.main : undefined};

    color: ${(props) =>
      props.isSelected ? props.theme.palette.primary.contrastText : undefined};
  }
`;

export default CustomPickersDay;
