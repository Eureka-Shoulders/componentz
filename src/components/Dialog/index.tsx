import useUIStore from '../../hooks/useUIStore';
import { DialogProps } from './types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Backdrop } from '@mui/material';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from 'mobx-react-lite';

/**
 * @returns A component that displays a Dialog and should be controlled by the UIStore
 */

function Dialog(props: DialogProps) {
  const uiStore = useUIStore();
  const showDialogActions =
    !!uiStore.dialog.onReject || !!uiStore.dialog.onAccept;
  
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={uiStore.dialog.isOpen}
    >
      <MuiDialog
        {...props}
        open={uiStore.dialog.isOpen}
        onClose={uiStore.dialog.close}
        data-testid="dialog"
      >
        {uiStore.dialog.title ? (
          <DialogTitle>{uiStore.dialog.title}</DialogTitle>
        ) : null}
        <DialogContent>{uiStore.dialog.content}</DialogContent>
        {showDialogActions && (
          <DialogActions>
            {uiStore.dialog.onReject && (
              <Button variant="outlined" onClick={uiStore.dialog.onReject}>
                {uiStore.dialog.rejectLabel}
              </Button>
            )}
            {uiStore.dialog.onAccept && (
              <LoadingButton
                loading={false}
                onClick={uiStore.dialog.onAccept}
                color="primary"
                variant="contained"
              >
                {uiStore.dialog.acceptLabel}
              </LoadingButton>
            )}
          </DialogActions>
        )}
      </MuiDialog>
    </Backdrop>
  );
}

export default observer(Dialog);
