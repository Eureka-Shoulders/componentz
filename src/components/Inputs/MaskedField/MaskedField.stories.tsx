/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import MaskedField from '.';

export default {
  title: 'MaskedField',
  component: MaskedField,
} as ComponentMeta<typeof MaskedField>;

const Template: ComponentStory<typeof MaskedField> = () => {
  const [value, setValue] = useState('');

  return (
    <MaskedField
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      label="Phone"
      mask="(99) 99999-9999"
    />
  );
};

export const Default = Template.bind({});
