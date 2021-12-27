/* eslint-disable @typescript-eslint/no-empty-function */
import { Typography } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect } from 'react';
import Dialog from '.';
import useUIStore from '../../hooks/useUIStore';

const onAcceptAction = action('onAccept');
const onRejectAction = action('onReject');

export default {
  title: 'Dialog',
  component: Dialog,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Dialog title',
    },
    content: {
      control: 'text',
      defaultValue: 'Dialog content',
    },
    onReject: {
      control: 'boolean',
    },
    onAccept: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => {
  const uiStore = useUIStore();

  useEffect(() => {
    uiStore.dialog.set({
      title: 'Template Title',
      content: (
        <Typography>
          Template Content, you can add any JSX element here, like images, form
          and another element
        </Typography>
      ),
      onReject: () => onRejectAction('onReject clicked'),
      onAccept: () => onAcceptAction('onAccept clicked'),
    });
    uiStore.dialog.open();
  }, []);
  return <Dialog {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Dialog Title',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
};

export const Custom = ({
  title,
  content,
  onReject,
  onAccept,
}: {
  title: string;
  content: string;
  onReject: boolean;
  onAccept: boolean;
}) => {
  const uiStore = useUIStore();

  useEffect(() => {
    uiStore.dialog.set({
      title,
      content: <Typography>{content}</Typography>,
      onReject: onReject ? () => onRejectAction('onReject clicked') : undefined,
      onAccept: onAccept ? () => onAcceptAction('onAccept clicked') : undefined,
    });
    uiStore.dialog.open();
  }, [title, content, onReject, onAccept]);

  return <Dialog confirmLabel="Confirm" cancelLabel="Cancel" />;
};
