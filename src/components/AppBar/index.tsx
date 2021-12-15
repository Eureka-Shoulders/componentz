import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { useUIStore } from 'index';
import React, { ReactNode } from 'react';
import { DrawerItem } from './DrawerItem';
import { StyledAppBar } from './StyledAppBar';
import { DrawerHeader, StyledDrawer } from './StyledDrawer';
import { Toolbar } from './Toolbar';

interface AppBarProps {
  children?: ReactNode;
}

const AppBar = ({ children }: AppBarProps) => {
  const uiStore = useUIStore();

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed" open={uiStore.appBar.isDrawerOpen}>
        <Toolbar />
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={uiStore.appBar.isDrawerOpen}>
        <DrawerHeader>{uiStore.appBar.DrawerHeaderContent}</DrawerHeader>
        <Divider />
        <List>
          {uiStore.appBar.pages.map((page) => (
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

export default AppBar;
