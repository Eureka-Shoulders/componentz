import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect } from 'react';
import Breadcrumbs from '.';
import useUIStore from '../../hooks/useUIStore';

const onClickAction = action('onClickAction');

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => {
  const uiStore = useUIStore();

  useEffect(() => {
    uiStore.breadcrumb.setPaths([
      {
        label: 'Home',
        onClick: () => onClickAction('Home'),
      },
      {
        label: 'About',
        onClick: () => onClickAction('About'),
      },
      {
        label: 'Contact',
      },
    ]);
  }, []);
  return <Breadcrumbs {...args} />;
};

export const Default = Template.bind({});
