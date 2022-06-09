import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...args}
        onChange={(newDate) => setDate(newDate as Date)}
        value={date}
      />
    </LocalizationProvider>
  );
};

export const Default = Template.bind({});
