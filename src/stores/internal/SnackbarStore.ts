import { AlertColor } from '@mui/material';
import { makeAutoObservable } from 'mobx';
import { SnackbarOptions, SnackbarStoreType } from '../types';

// TODO: Make unit tests of this store
class SnackbarStore implements SnackbarStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  queue: SnackbarOptions[] = [];

  isOpen = false;
  message = '';
  severity?: AlertColor;
  actionLabel?: string;
  onActionClick?: () => void = undefined;

  show({ message, severity, actionLabel, onActionClick }: SnackbarOptions) {
    if (this.isOpen) {
      return this.enqueueSnackbar({
        message,
        severity,
        actionLabel,
        onActionClick,
      });
    }

    this.isOpen = true;
    this.message = message;
    this.severity = severity;
    this.actionLabel = actionLabel;
    this.onActionClick = onActionClick;
  }

  close() {
    if (this.queue.length > 0) {
      this.isOpen = false;
      const nextSnackbar = this.queue.shift();

      if (nextSnackbar) {
        this.show(nextSnackbar);
      }
    } else {
      setTimeout(() => {
        this.reset();
      }, 500);
    }
  }

  reset() {
    this.message = '';
    this.actionLabel = '';
    this.severity = undefined;
    this.onActionClick = undefined;
  }

  enqueueSnackbar(options: SnackbarOptions) {
    this.queue.push(options);
  }
}

export default SnackbarStore;
