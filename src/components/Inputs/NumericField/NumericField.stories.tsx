import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import NumericField from '.';

export default {
  title: 'NumericField',
  component: NumericField,
  args: {
    decimalChar: ',',
    thousandChar: '.',
    precision: 1,
    negative: false,
  },
} as ComponentMeta<typeof NumericField>;

const Template: ComponentStory<typeof NumericField> = (args) => {
  const [value, setValue] = useState<number | string>(0);

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
