import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import DatePicker from '.';

export default {
  title: 'DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker
      {...args}
      onDatePickerChange={(newDate) => setDate(newDate as Date)}
      datePickerValue={date}
    />
  );
};

export const Default = Template.bind({});
