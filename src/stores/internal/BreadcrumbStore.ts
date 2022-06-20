import { BreadcrumbPath } from '../../components/Breadcrumbs';
import { makeAutoObservable } from 'mobx';

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
    const last = this.paths[this.paths.length - 1];
    return last?.label ?? '';
  }

  get linkedPaths() {
    return this.paths.slice(0, -1);
  }
}

export default BreadcrumbStore;
