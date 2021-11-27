/* eslint-disable @typescript-eslint/no-empty-function */
import { AlertColor } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import React, { useEffect } from 'react';
import Snackbar from '.';
import useUIStore from '../../hooks/useUIStore';

const onClickAction = action('onClickAction');

export default {
  title: 'Snackbar',
  component: Snackbar,
  argTypes: {
    message: {
      control: 'text',
      defaultValue: 'Snackbar title',
    },
    severity: {
      options: ['success', 'info', 'warning', 'error', null],
      control: { type: 'radio' },
      defaultValue: 'info',
    },
    actionLabel: {
      control: 'text',
      defaultValue: 'Confirm',
    },
  },
} as ComponentMeta<typeof Snackbar>;

export const Custom = ({
  message,
  severity,
  actionLabel,
}: {
  message: string;
  actionLabel: string;
  severity: AlertColor;
}) => {
  const uiStore = useUIStore();

  useEffect(() => {
    uiStore.snackbar.show({
      message,
      severity,
      actionLabel,
      onActionClick: () => onClickAction('Snackbar button clicked'),
    });
  }, [message, severity, actionLabel]);

  return <Snackbar />;
};
