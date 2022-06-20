import { AlertColor } from '@mui/material';
import { makeAutoObservable } from 'mobx';

export interface SnackbarOptions {
  message: string;
  severity?: import('@mui/material').AlertColor;
  actionLabel?: string;
  onActionClick?(): void;
}

export interface SnackbarStoreType {
  isOpen: boolean;
  message: string;
  severity?: import('@mui/material').AlertColor;
  actionLabel?: string;
  onActionClick?(): void;

  show(options: SnackbarOptions): void;
  close(): void;
  reset(): void;
  enqueueSnackbar(options: SnackbarOptions): void;
}

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
      const nextSnackbar = this.queue.shift();

      if (nextSnackbar) {
        this.isOpen = false;
        setTimeout(() => {
          this.show(nextSnackbar);
        }, 300);
      }
    } else {
      this.reset();
      this.isOpen = false;
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
