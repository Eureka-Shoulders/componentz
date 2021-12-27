import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import { observer } from 'mobx-react-lite';
import { useUIStore } from '../../index';

function Toolbar() {
  const theme = useTheme();
  const uiStore = useUIStore();

  return (
    <MuiToolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={uiStore.appBar.toggleDrawer}
        edge="start"
        sx={{
          marginRight: uiStore.appBar.isDrawerOpen ? 2 : 5,
          transition: 'margin-right 0.3s',
        }}
      >
        {uiStore.appBar.isDrawerOpen ? (
          theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )
        ) : (
          <MenuIcon />
        )}
      </IconButton>
      {uiStore.appBar.AppBarHeaderContent}
    </MuiToolbar>
  );
}

export default observer(Toolbar);
