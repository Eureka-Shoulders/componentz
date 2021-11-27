# Componentz

![npm](https://img.shields.io/npm/v/@euk-labs/componentz)
![NPM](https://img.shields.io/npm/l/@euk-labs/componentz)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Eureka-Shoulders/componentz/CI)
![npm](https://img.shields.io/npm/dw/@euk-labs/componentz)

Componentz is a MUI-based UI library that can provide simple and performatic ways to use components.

The goal is not to replace the MUI, but to be an extension

## Installation

MUI is the base of this library so it is the first installation

```bash
# Using npm:
npm install @mui/material @emotion/react @emotion/styled

# Using yarn:
yarn add @mui/material @emotion/react @emotion/styled
```

For dependency injection we will use the inversify lib

```bash
# Using npm:
npm i inversify inversify-react
# Using yarn:
yarn add inversify inversify-react
```

For state management we will use MobX

```bash
# Using npm:
npm i mobx mobx-react-lite

# Using yarn:
yarn add mobx mobx-react-lite
```

Finally componentz

```bash
# Using npm:
npm i mobx mobx-react-lite

# Using yarn:
yarn add mobx mobx-react-lite
```

### Dependencies

- MUI: A UI library that serves as the basis for the project
- MobX is used to generate Stores and Hooks powered by these stores to make a beautiful reactive way to control the data on your interfaces.
- Inversify: dependency Injection library

## Usage

We've separated the logical part of the component, which has the minimum responsibilities to be as generic as possible, so we use Mobx for state management to make this happen.

The complete documentation is under construction, we will soon make it available.

First add a Inversify provider and reflect-metadata at the root of your project

```ts
import 'reflect-metadata';

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
