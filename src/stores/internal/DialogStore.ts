import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';
import { DialogOptions, DialogStoreType } from '../types';

// TODO: Make unit tests of this store
class DialogStore implements DialogStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  isOpen = false;
  title?: string = undefined;
  content?: ReactNode = undefined;
  onReject?: () => void = undefined;
  onAccept?: () => void = undefined;

  set({ title, content, onReject, onAccept }: DialogOptions) {
    this.title = title;
    this.content = content;
    this.onReject = onReject;
    this.onAccept = onAccept;
  }

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }

  reset() {
    this.isOpen = false;
    this.title = undefined;
    this.content = null;
    this.onReject = undefined;
    this.onAccept = undefined;
  }
}

export default DialogStore;
