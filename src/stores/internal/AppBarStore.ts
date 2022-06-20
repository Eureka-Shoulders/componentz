import { Page } from '../../components/AppBar';
import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';

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

// TODO: Make unit tests of this store
class AppBarStore implements AppBarStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  pages: Page[] = [];
  isDrawerOpen = false;
  DrawerHeaderContent?: ReactNode = undefined;
  AppBarHeaderContent?: ReactNode = undefined;
  onClickDrawerOption: (page: Page) => void = () => {
    return;
  };

  setPages(pages: Page[]) {
    this.pages = pages;
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  setDrawerHeaderContent(content?: ReactNode) {
    this.DrawerHeaderContent = content;
  }

  setAppBarHeaderContent(content?: ReactNode) {
    this.AppBarHeaderContent = content;
  }

  setOnClickDrawerOption(newAction: (page: Page) => void) {
    this.onClickDrawerOption = newAction;
  }
}

export default AppBarStore;
