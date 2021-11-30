import { DialogProps } from '@components/Dialog/types';
import { DialogOptions } from '@stores/types';
import React, { useEffect } from 'react';
import Dialog from '../../components/Dialog';
import { useUIStore } from '../../index';

export const DialogContainer = ({
  newContent,
  props,
}: {
  newContent: DialogOptions;
  props?: DialogProps;
}) => {
  const uiStore = useUIStore();

  useEffect(() => {
    uiStore.dialog.set(newContent);
  });

  return <Dialog {...props} />;
};
