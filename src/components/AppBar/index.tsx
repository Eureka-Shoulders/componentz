import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import useUIStore from '../../hooks/useUIStore';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import DrawerItem from './DrawerItem';
import { StyledAppBar } from './StyledAppBar';
import { DrawerHeader, StyledDrawer } from './StyledDrawer';
import Toolbar from './Toolbar';

export interface AppBarProps {
  children?: ReactNode;
}

const AppBar = ({ children }: AppBarProps) => {
  const uiStore = useUIStore();

  return (
    <Box data-testid="appbar" sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed" open={uiStore.appBar.isDrawerOpen}>
        <Toolbar />
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={uiStore.appBar.isDrawerOpen}>
        <DrawerHeader>{uiStore.appBar.DrawerHeaderContent}</DrawerHeader>
        <Divider />
        <List>
          {uiStore.appBar.pages
            .filter((page) => page.drawer !== false && page.disabled !== true)
            .map((page) => (
              <DrawerItem key={page.link} page={page} />
            ))}
        </List>
      </StyledDrawer>
      <Box component="main" flexGrow={1}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default observer(AppBar);
