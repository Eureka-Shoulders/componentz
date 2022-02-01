import { ComponentMeta, ComponentStory } from '@storybook/react';
import Autocomplete from '.';

export default {
  title: 'Autocomplete',
  component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = (args) => {
  return (
    <Autocomplete
      {...args}
      options={[
        'Avengers: Endgame',
        'Avengers: Infinity War',
        'Age of Ultron',
        'The Avengers',
        'Iron Man',
        'Hulk',
      ]}
    />
  );
};

export const Default = Template.bind({});
