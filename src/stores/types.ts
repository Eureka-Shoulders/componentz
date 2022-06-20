import { BreadcrumbPath } from '@components/Breadcrumbs/types';
import { Page } from '@components/AppBar/types';
import { ReactNode } from 'react';

export interface UIStoreType {
  snackbar: SnackbarStoreType;
  dialog: DialogStoreType;
  breadcrumb: BreadcrumbStoreType;
  appBar: AppBarStoreType;
}

// ------------------------- UI Store Types -------------------------

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

export interface DialogStoreType {
  isOpen: boolean;
  onReject?: () => void;
  onAccept?: () => void;
  title?: string;
  content?: ReactNode;
  acceptLabel?: string;
  rejectLabel?: string;
  set(options: DialogOptions): void;
  open(): void;
  close(): void;
  reset(): void;
}

export interface BreadcrumbStoreType {
  paths: BreadcrumbPath[];
  linkedPaths: BreadcrumbPath[];
  finalPath: string | undefined;
  onClickBreadcrumbPath: (breadcrumbPath: BreadcrumbPath) => void;

  setPaths(paths: BreadcrumbPath[]): void;
  setOnClickBreadcrumbPath(
    newAction: (breadcrumbPath: BreadcrumbPath) => void
  ): void;
}

export interface AppBarStoreType {
  pages: Page[];
  isDrawerOpen: boolean;
  AppBarHeaderContent?: ReactNode;
  DrawerHeaderContent?: ReactNode;
  onClickDrawerOption(page: Page): void;

  setPages(pages: Page[]): void;
  toggleDrawer(): void;
  setDrawerHeaderContent(content?: ReactNode): void;
  setAppBarHeaderContent(content?: ReactNode): void;
  setOnClickDrawerOption(newAction: (page: Page) => void): void;
}

// ------------------------- UI Store Options -------------------------
export interface DialogOptions {
  title?: string;
  onReject?: () => void;
  onAccept?: () => void;
  content?: ReactNode;
  acceptLabel?: string;
  rejectLabel?: string;
}

export interface SnackbarOptions {
  message: string;
  severity?: import('@mui/material').AlertColor;
  actionLabel?: string;
  onActionClick?(): void;
}
