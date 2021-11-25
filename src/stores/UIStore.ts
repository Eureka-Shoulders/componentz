import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import BreadcrumbStore from './internal/BreadcrumbStore';
import DialogStore from './internal/DialogStore';
import SnackbarStore from './internal/SnackbarStore';
import { UIStoreType } from './types';

@injectable()
class UIStore implements UIStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  snackbar = new SnackbarStore();
  dialog = new DialogStore();
  breadcrumb = new BreadcrumbStore();
}

export default UIStore;
