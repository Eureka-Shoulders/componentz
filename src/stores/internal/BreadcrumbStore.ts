import { BreadcrumbPaths } from '../../components/Breadcrumb/types';
import { BreadcrumbStoreType } from '../types';
import { makeAutoObservable } from 'mobx';
import * as R from 'ramda';

// TODO: Make unit tests of this store
class BreadcrumbStore implements BreadcrumbStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  paths: BreadcrumbPaths[] = [];

  setPaths(paths: BreadcrumbPaths[]) {
    this.paths = paths;
  }

  get finalPath() {
    return R.last(this.paths)?.label ?? '';
  }

  get linkedPaths() {
    return this.paths.slice(0, -1);
  }
}

export default BreadcrumbStore;
