import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

export interface DialogProps extends Omit<MuiDialogProps, 'open'> {
  cancelLabel?: string;
  confirmLabel?: string;
  open?: boolean;
}
