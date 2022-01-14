import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useUIStore from '../../hooks/useUIStore';
import { Fragment, useState } from 'react';
import { Page } from './types';
import { observer } from 'mobx-react-lite';

interface DrawerItemProps {
  page: Page;
}

const DrawerItem = ({ page }: DrawerItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const uiStore = useUIStore();

  const drawerSubPages = page.sub?.filter(
    (subPage) => subPage.drawer !== false && subPage.disabled !== true
  );

  const handleClick = (page: Page, haveSub?: boolean) => {
    return () => {
      if (haveSub) {
        if (!uiStore.appBar.isDrawerOpen) {
          uiStore.appBar.toggleDrawer();
        }

        return setExpanded(!expanded);
      }

      return uiStore.appBar.onClickDrawerOption(page);
    };
  };

  return (
    <Fragment key={page.link}>
      <ListItemButton
        key={page.link}
        sx={{ minHeight: 48, pl: 2.5 }}
        onClick={handleClick(page, !!drawerSubPages?.length)}
      >
        <ListItemIcon
          sx={{
            minWidth: uiStore.appBar.isDrawerOpen ? 48 : 0,
          }}
        >
          <page.Icon />
        </ListItemIcon>
        <ListItemText
          hidden={!uiStore.appBar.isDrawerOpen}
          primary={page.label}
        />
        {!!drawerSubPages?.length && uiStore.appBar.isDrawerOpen ? (
          expanded ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItemButton>
      <Collapse
        in={uiStore.appBar.isDrawerOpen && expanded}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {page.sub?.map((subPage) => (
            <ListItemButton
              sx={{ pl: 4 }}
              key={subPage.link}
              onClick={handleClick(subPage, false)}
            >
              <ListItemIcon>
                <subPage.Icon />
              </ListItemIcon>
              <ListItemText
                hidden={!uiStore.appBar.isDrawerOpen}
                primary={subPage.label}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default observer(DrawerItem);
