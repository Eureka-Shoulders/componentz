import useUIStore from '../../hooks/useUIStore';
import {
  Alert,
  Button,
  ButtonProps as MuiButtonProps,
  Snackbar as MuiSnackbar,
  SnackbarProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

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

function Snackbar({ autoHideDuration, ...rest }: SnackbarProps) {
  const uiStore = useUIStore();

  if (uiStore.snackbar.severity) {
    return (
      <MuiSnackbar
        {...rest}
        open={uiStore.snackbar.isOpen}
        autoHideDuration={autoHideDuration}
        onClose={uiStore.snackbar.close}
      >
        <Alert
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
  } else {
    return (
      <MuiSnackbar
        {...rest}
        open={uiStore.snackbar.isOpen}
        autoHideDuration={autoHideDuration}
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
}

export default observer(Snackbar);
