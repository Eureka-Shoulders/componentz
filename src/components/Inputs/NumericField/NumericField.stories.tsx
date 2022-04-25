import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import NumericField from '.';

export default {
  title: 'NumericField',
  component: NumericField,
} as ComponentMeta<typeof NumericField>;

const Template: ComponentStory<typeof NumericField> = (args) => {
  const [value, setValue] = useState<number | string>('');
  return (
    <NumericField
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const Default = Template.bind({});
