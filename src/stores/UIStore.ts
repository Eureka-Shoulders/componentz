import { decorate, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import AppBarStore from './internal/AppBarStore';
import BreadcrumbStore from './internal/BreadcrumbStore';
import DialogStore from './internal/DialogStore';
import SnackbarStore from './internal/SnackbarStore';
import { UIStoreType } from './types';

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
