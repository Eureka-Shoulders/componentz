import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { DateRangePicker } from '.';
import { DateRange } from './store';

export default {
  title: 'DateRangePicker',
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });
  return (
    <DateRangePicker
      {...args}
      label="Event Duration"
      value={value}
      onChange={setValue}
    />
  );
};

export const Default = Template.bind({});
