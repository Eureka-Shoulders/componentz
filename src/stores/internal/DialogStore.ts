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
  acceptLabel?: string = 'Accept';
  rejectLabel?: string = 'Reject';

  set({
    title,
    content,
    onReject,
    onAccept,
    acceptLabel,
    rejectLabel,
  }: DialogOptions) {
    this.title = title;
    this.content = content;
    this.onReject = onReject;
    this.onAccept = onAccept;
    this.acceptLabel = acceptLabel;
    this.rejectLabel = rejectLabel;
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
    this.rejectLabel = 'Reject';
    this.acceptLabel = 'Accept';
  }
}

export default DialogStore;
