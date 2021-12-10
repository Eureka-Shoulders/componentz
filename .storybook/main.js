module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
    '@storybook/addon-interactions',
  ],
  refs: {
    'chromatic-published-Storybook': {
      title: 'Componentz',
      url: 'https://chromatic.com/library?appId=61a3dfbf9c186c003a9e79f1&branch=develop',
    },
  },
};
