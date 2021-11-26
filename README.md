# Componentz

![npm](https://img.shields.io/npm/v/@euk-labs/componentz)
![NPM](https://img.shields.io/npm/l/@euk-labs/componentz)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Eureka-Shoulders/componentz/CI)
![npm](https://img.shields.io/npm/dw/@euk-labs/componentz)

Componentz is an MUI-based UI library that can provide simple and performative ways to use components.

The goal is not to replace the MUI, but to be an extension

## Installation

Using npm:

```bash
npm i @euk-labs/componentz
```

Using yarn:

```bash
yarn add @euk-labs/componentz
```

### Dependencies

- MUI: A UI library that serves as the basis for the project
- MobX is used to generate Stores and Hooks powered by these stores to make a beautiful reactive way to control the data on your interfaces.

## Usage

We've separated the logical part of the component, which has the minimum responsibilities to be as generic as possible, so we use the Mobx state manager to make this component control.

The complete documentation form components is being built, we will soon make it available.

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
