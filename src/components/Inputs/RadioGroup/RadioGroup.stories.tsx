import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioGroup from '.';

export default {
  title: 'RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => {
  return (
    <RadioGroup
      {...args}
      options={[
        {
          label: 'Avengers: Endgame',
          name: 'Avengers: Endgame',
        },
        {
          label: 'Avengers: Infinity War',
          name: 'Avengers: Infinity War',
        },
        {
          label: 'Age of Ultron',
          name: 'Age of Ultron',
        },
        {
          label: 'The Avengers',
          name: 'The Avengers',
        },
      ]}
    />
  );
};

export const Default = Template.bind({});
