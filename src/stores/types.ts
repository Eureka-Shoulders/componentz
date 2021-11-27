import { BreadcrumbPath } from '../components/Breadcrumbs/types';
import { ReactNode } from 'react';

export interface UIStoreType {
  snackbar: SnackbarStoreType;
  dialog: DialogStoreType;
  breadcrumb: BreadcrumbStoreType;
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
}

export interface DialogStoreType {
  isOpen: boolean;
  onReject?: () => void;
  onAccept?: () => void;
  title?: string;
  content?: ReactNode;

  set(options: DialogOptions): void;
  open(): void;
  close(): void;
}

export interface BreadcrumbStoreType {
  paths: BreadcrumbPath[];
  linkedPaths: BreadcrumbPath[];
  finalPath: string | undefined;

  setPaths(paths: BreadcrumbPath[]): void;
}

// Store Options
export interface DialogOptions {
  title?: string;
  onReject?: () => void;
  onAccept?: () => void;
  content?: ReactNode;
}

export interface SnackbarOptions {
  message: string;
  severity?: import('@mui/material').AlertColor;
  actionLabel?: string;
  onActionClick?(): void;
}
