import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';

export interface DialogOptions {
  title?: string;
  onReject?: () => void;
  onAccept?: () => void;
  content?: ReactNode;
  acceptLabel?: string;
  rejectLabel?: string;
}

export interface DialogStoreType {
  isOpen: boolean;
  onReject?: () => void;
  onAccept?: () => void;
  title?: string;
  content?: ReactNode;
  acceptLabel?: string;
  rejectLabel?: string;
  set(options: DialogOptions): void;
  open(): void;
  close(): void;
  reset(): void;
}

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
