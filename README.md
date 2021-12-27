# Componentz

![npm](https://img.shields.io/npm/v/@euk-labs/componentz)
![NPM](https://img.shields.io/npm/l/@euk-labs/componentz)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Eureka-Shoulders/componentz/CI)
![npm](https://img.shields.io/npm/dw/@euk-labs/componentz)

Componentz is a MUI-based UI library that can provide simple and performatic ways to use components.

The goal is not to replace the MUI, but to be an extension

### Dependencies

- MUI: A UI library that serves as the basis for the project
  - You can learn more about MUI [here](mui.com/)
- MobX is used to generate Stores and Hooks powered by these stores to make a beautiful reactive way to control the data on your interfaces.
  - Meet this wonderful lib [here](mobx.js.org/)
- Inversify is fundamental for dependency injection strategies
  - The strategy about this architecture can be found [here](https://github.com/inversify/InversifyJS)

## Installation

Our dependencies:

```bash
# Using npm:
npm install @mui/material @mui/icons-material @mui/lab @emotion/react @emotion/styled mobx mobx-react-lite

# Using yarn:
yarn add @mui/material @mui/icons-material @mui/lab @emotion/react @emotion/styled mobx mobx-react-lite
```

Installing Componentz 🤩

```bash
# Using npm:
npm i @euk-labs/componentz

# Using yarn:
yarn add @euk-labs/componentz
```

## Usage

We've separated the logical part of the component, which has the minimum responsibilities to be as generic as possible, so we use Mobx for state management to make this happen.

The complete documentation is under construction, we will soon make it available.

First add a Inversify provider and reflect-metadata at the root of your project

_In this example we are using Next but the idea can be used for other React applications_

```ts
import 'reflect-metadata';
import { globalContainer } from '@euk-labs/componentz';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'inversify-react';
import theme from 'styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <Provider container={globalContainer}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
```

A simple example of what a component's usage pattern looks like:

```ts
import { useUIStore, Breadcrumb } from '@euk-labs/componentz';
import { Box } from '@mui/material';
import { useEffect } from 'react';

function About() {
  // A hook that delivers all the control of a part of the application, in this case the UI
  const uiStore = useUIStore();

  useEffect(() => {
    // Controlling the state
    uiStore.breadcrumb.setPaths([
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'About',
        link: '/about',
      },
    ]);
  }, []);

  return (
    <Box>
      // Rendering the Breadcrumb component on any DOM level
      <Breadcrumb />
      // You can add your JSX code here
      <Box>...</Box>
    </Box>
  );
}

export default Home;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
