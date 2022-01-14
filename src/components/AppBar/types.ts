import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type MuiIcon = OverridableComponent<SvgIconTypeMap> & { muiName: string };

export interface Page {
  label: string;
  link: string;
  Icon: MuiIcon | (() => JSX.Element);
  sub?: Omit<Page, 'sub'>[];
  drawer?: boolean;
  disabled?: boolean;
}
