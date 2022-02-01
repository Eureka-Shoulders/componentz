import {
  Dashboard,
  DomainAddRounded,
  Info,
  Mail,
  AccountBox,
  Flight,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect } from 'react';
import AppBar from '.';
import useUIStore from '../../hooks/useUIStore';

export default {
  title: 'AppBar',
  component: AppBar,
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = (args) => {
  const uiStore = useUIStore();

  useEffect(() => {
    uiStore.appBar.setPages([
      {
        label: 'Home',
        link: '/',
        Icon: Dashboard,
      },
      {
        label: 'Users',
        link: '/users',
        Icon: AccountBox,
        sub: [
          {
            label: 'Address',
            link: '/about/address',
            Icon: DomainAddRounded,
          },
          {
            label: 'Details',
            link: '/about/info',
            Icon: Info,
          },
        ],
      },
      {
        label: 'Mail',
        link: '/mail',
        Icon: Mail,
      },
    ]);

    uiStore.appBar.setDrawerHeaderContent(
      <Box display="flex" alignItems="center" justifyContent="center">
        <Flight sx={{ mr: 4 }} />
        <Typography component="span">Project Title</Typography>
      </Box>
    );
  }, []);
  return <AppBar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: 'Children Component Here',
};
