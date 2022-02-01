import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Switch from '.';

export default {
  title: 'Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => {
  const [value, setValue] = useState(false);
  return (
    <Switch
      {...args}
      label="Chocolate cover"
      value={value}
      onChange={(e) => {
        setValue(e.target.checked);
      }}
    />
  );
};

export const Default = Template.bind({});
