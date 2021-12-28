import { makeAutoObservable } from 'mobx';
import { last } from 'ramda';
import { BreadcrumbPath } from '../../components/Breadcrumbs/types';
import { BreadcrumbStoreType } from '../types';

// TODO: Make unit tests of this store
class BreadcrumbStore implements BreadcrumbStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  paths: BreadcrumbPath[] = [];

  setPaths(paths: BreadcrumbPath[]) {
    this.paths = paths;
  }

  get finalPath() {
    return last(this.paths)?.label ?? '';
  }

  get linkedPaths() {
    return this.paths.slice(0, -1);
  }
}

export default BreadcrumbStore;
