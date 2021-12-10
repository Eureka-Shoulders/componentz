import {
  Alert,
  Button,
  ButtonProps as MuiButtonProps,
  Snackbar as MuiSnackbar,
  SnackbarProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useUIStore from '../../hooks/useUIStore';

interface ButtonProps extends MuiButtonProps {
  label: string;
}

function Action({ label, ...rest }: ButtonProps) {
  return (
    <Button color="inherit" size="small" {...rest}>
      {label}
    </Button>
  );
}

/**
 * @returns A component that displays a Snackbar and should be controlled by the UIStore
 */

function Snackbar({ ...rest }: SnackbarProps) {
  const uiStore = useUIStore();

  if (uiStore.snackbar.severity) {
    return (
      <MuiSnackbar
        {...rest}
        open={uiStore.snackbar.isOpen}
        onClose={uiStore.snackbar.close}
      >
        <Alert
          data-testid="snackbar"
          variant="filled"
          severity={uiStore.snackbar.severity}
          onClose={uiStore.snackbar.close}
          action={
            uiStore.snackbar.actionLabel && (
              <Action
                label={uiStore.snackbar.actionLabel}
                onClick={uiStore.snackbar.onActionClick}
              />
            )
          }
        >
          {uiStore.snackbar.message}
        </Alert>
      </MuiSnackbar>
    );
  }
  return (
    <MuiSnackbar
      {...rest}
      open={uiStore.snackbar.isOpen}
      onClose={uiStore.snackbar.close}
      action={
        uiStore.snackbar.actionLabel && (
          <Action
            label={uiStore.snackbar.actionLabel}
            onClick={uiStore.snackbar.onActionClick}
          />
        )
      }
      message={uiStore.snackbar.message}
    />
  );
}

export default observer(Snackbar);
