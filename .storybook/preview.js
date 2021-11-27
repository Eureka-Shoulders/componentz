import 'reflect-metadata';
import { Provider } from 'inversify-react';
import { globalContainer } from '../src';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withInversifyProvider = (Story, context) => {
  return (
    <Provider container={globalContainer}>
      <Story {...context} />
    </Provider>
  );
};

export const decorators = [withInversifyProvider];
