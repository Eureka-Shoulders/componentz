import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import CurrencyField from '.';

export default {
  title: 'CurrencyField',
  component: CurrencyField,
} as ComponentMeta<typeof CurrencyField>;

const Template: ComponentStory<typeof CurrencyField> = (args) => {
  const [value, setValue] = useState('');
  return (
    <CurrencyField
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const Default = Template.bind({});
