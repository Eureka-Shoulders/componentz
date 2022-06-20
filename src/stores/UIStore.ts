import { decorate, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import AppBarStore, { AppBarStoreType } from './internal/AppBarStore';
import BreadcrumbStore, {
  BreadcrumbStoreType,
} from './internal/BreadcrumbStore';
import DialogStore, { DialogStoreType } from './internal/DialogStore';
import SnackbarStore, { SnackbarStoreType } from './internal/SnackbarStore';

export interface UIStoreType {
  snackbar: SnackbarStoreType;
  dialog: DialogStoreType;
  breadcrumb: BreadcrumbStoreType;
  appBar: AppBarStoreType;
}

class UIStore implements UIStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  snackbar = new SnackbarStore();
  dialog = new DialogStore();
  breadcrumb = new BreadcrumbStore();
  appBar = new AppBarStore();
}

decorate(injectable(), UIStore);

export default UIStore;
