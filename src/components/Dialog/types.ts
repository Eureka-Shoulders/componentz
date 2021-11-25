import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

export interface DialogProps extends MuiDialogProps {
  cancelLabel?: string;
  confirmLabel?: string;
  open: boolean;
}
