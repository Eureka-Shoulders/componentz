import { AlertColor } from '@mui/material';
import { makeAutoObservable } from 'mobx';
import { SnackbarOptions, SnackbarStoreType } from '../types';

// TODO: Make unit tests of this store
class SnackbarStore implements SnackbarStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  isOpen = false;
  message = '';
  severity?: AlertColor;
  actionLabel?: string;
  onActionClick?: () => void = undefined;

  show({ message, severity, actionLabel, onActionClick }: SnackbarOptions) {
    this.isOpen = true;
    this.message = message;
    this.severity = severity;
    this.actionLabel = actionLabel;
    this.onActionClick = onActionClick;
  }

  close() {
    this.isOpen = false;

    setTimeout(() => {
      this.reset();
    }, 500);
  }

  reset() {
    this.message = '';
    this.actionLabel = '';
    this.severity = undefined;
    this.onActionClick = undefined;
  }
}

export default SnackbarStore;
