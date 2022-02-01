import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import PasswordField from '.';

export default {
  title: 'PasswordField',
  component: PasswordField,
} as ComponentMeta<typeof PasswordField>;

const Template: ComponentStory<typeof PasswordField> = (args) => {
  const [value, setValue] = useState('');
  return (
    <PasswordField
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const Default = Template.bind({});
