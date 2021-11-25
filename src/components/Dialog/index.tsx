import useUIStore from '../../hooks/useUIStore';
import LoadingButton from '@mui/lab/LoadingButton';
import { Backdrop } from '@mui/material';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DialogProps } from './types';

function Dialog({
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  ...rest
}: DialogProps) {
  const uiStore = useUIStore();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={uiStore.dialog.isOpen}
      onClick={uiStore.dialog.onReject}
    >
      <MuiDialog
        {...rest}
        open={uiStore.dialog.isOpen}
        keepMounted
        onClose={uiStore.dialog.onReject}
      >
        {uiStore.dialog.title ? (
          <DialogTitle>{uiStore.dialog.title}</DialogTitle>
        ) : null}
        <DialogContent>{uiStore.dialog.content}</DialogContent>
        <DialogActions>
          {uiStore.dialog.onReject && (
            <Button variant="outlined" onClick={uiStore.dialog.onReject}>
              {cancelLabel}
            </Button>
          )}
          {uiStore.dialog.onAccept && (
            <LoadingButton
              loading={false}
              onClick={uiStore.dialog.onReject}
              color="primary"
              variant="contained"
            >
              {confirmLabel}
            </LoadingButton>
          )}
        </DialogActions>
      </MuiDialog>
    </Backdrop>
  );
}

export default observer(Dialog);
