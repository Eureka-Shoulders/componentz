import { Page } from '@components/AppBar/types';
import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';
import { AppBarStoreType } from '../types';

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
