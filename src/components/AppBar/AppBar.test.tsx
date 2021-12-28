import 'reflect-metadata';

import TYPES from '../../containers/global.types';
import { UIStoreType } from '@stores/types';
import {
  getByTestId,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import AppBar from './index';
import globalContainer from '../../containers/global.inversify';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { Dashboard } from '@mui/icons-material';

describe('AppBar', () => {
  let mockedAppBar: RenderResult;
  let unitContainer: Container;

  beforeEach(() => {
    unitContainer = globalContainer();

    mockedAppBar = render(
      <Provider container={unitContainer}>
        <AppBar>AppBar Children</AppBar>
      </Provider>
    );
  });

  it('should renders correctly', async () => {
    expect(getByTestId(mockedAppBar.container, 'appbar')).not.toBeNull();
  });

  it('should render children', async () => {
    expect(screen.getByText('AppBar Children')).not.toBeNull();
  });

  it('should open drawer and render option labels', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    uiStore.appBar.setPages([
      {
        label: 'Home',
        link: '/',
        Icon: Dashboard,
      },
    ]);

    uiStore.appBar.toggleDrawer();

    expect(screen.getByText('Home')).not.toBeNull();

    expect(uiStore.appBar.isDrawerOpen).toBeTruthy();
  });

  it('should render AppBar header', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    uiStore.appBar.setAppBarHeaderContent('AppHeader Header');

    expect(screen.getByText(/AppHeader Header/g)).not.toBeNull();
  });

  it('should render drawer header', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    uiStore.appBar.setDrawerHeaderContent('Drawer Header');

    uiStore.appBar.toggleDrawer();

    expect(screen.getByText(/Drawer Header/g)).not.toBeNull();
  });
});
