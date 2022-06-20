import { makeAutoObservable } from 'mobx';
import { last } from 'ramda';
import { BreadcrumbPath } from '../../components/Breadcrumbs/types';

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

// TODO: Make unit tests of this store
class BreadcrumbStore implements BreadcrumbStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  paths: BreadcrumbPath[] = [];
  onClickBreadcrumbPath: (breadcrumbPath: BreadcrumbPath) => void = () => {
    return;
  };

  setPaths(paths: BreadcrumbPath[]) {
    this.paths = paths;
  }

  setOnClickBreadcrumbPath(
    newAction: (breadcrumbPath: BreadcrumbPath) => void
  ) {
    this.onClickBreadcrumbPath = newAction;
  }

  get finalPath() {
    return last(this.paths)?.label ?? '';
  }

  get linkedPaths() {
    return this.paths.slice(0, -1);
  }
}

export default BreadcrumbStore;
