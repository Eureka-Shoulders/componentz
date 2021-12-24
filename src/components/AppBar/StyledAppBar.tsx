import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { drawerWidth } from './StyledDrawer';

declare module '@mui/material/styles' {
  interface Palette {
    primaryGradient?: string;
  }

  interface PaletteOptions {
    primaryGradient?: string;
  }
}

export interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledAppBarProps>(({ theme, open }) => ({
  background: theme.palette.primaryGradient ?? theme.palette.primary.main,

  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
