import 'reflect-metadata';
import Bindings from '../../containers/global.bindings';
import globalContainer from '../../containers/global.inversify';
import AppBar from './index';
import { Dashboard } from '@mui/icons-material';
import { UIStoreType } from '@stores/types';
import {
  getByTestId,
  getByText,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';

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
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.appBar.setPages([
      {
        label: 'Home',
        link: '/',
        Icon: Dashboard,
      },
      {
        label: 'Users',
        link: '/users',
        Icon: Dashboard,
        sub: [
          {
            label: 'New User',
            link: '/new',
            Icon: Dashboard,
          },
        ],
      },
    ]);

    uiStore.appBar.toggleDrawer();

    expect(screen.getByText('Home')).not.toBeNull();
    expect(screen.getByText('Users')).not.toBeNull();
    expect(screen.queryByText('New User')).toBeNull();

    expect(uiStore.appBar.isDrawerOpen).toBeTruthy();
  });

  it('should follow the link when clicked on a drawer item', () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.appBar.setOnClickDrawerOption((page) => {
      window.history.pushState({}, '', page.link);
      uiStore.appBar.toggleDrawer();
    });
    uiStore.appBar.setPages([
      {
        label: 'Home',
        link: '/home',
        Icon: Dashboard,
      },
    ]);

    uiStore.appBar.toggleDrawer();

    const homeLink = getByText(screen.getByTestId('appbar'), 'Home');

    expect(homeLink).not.toBeNull();

    homeLink.click();

    expect(uiStore.appBar.isDrawerOpen).toBeFalsy();
    expect(window.location.pathname).toBe('/home');
  });

  it('should open drawer and collapse drawer item', () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.appBar.setOnClickDrawerOption((page) => {
      window.history.pushState({}, '', page.link);
      uiStore.appBar.toggleDrawer();
    });
    uiStore.appBar.setPages([
      {
        label: 'Users',
        link: '/users',
        Icon: Dashboard,
        sub: [
          {
            label: 'New User',
            link: '/new',
            Icon: Dashboard,
          },
        ],
      },
    ]);

    const usersLink = getByText(screen.getByTestId('appbar'), 'Users');

    expect(usersLink).not.toBeNull();

    usersLink.click();

    expect(uiStore.appBar.isDrawerOpen).toBeTruthy();
    expect(getByText(screen.getByTestId('appbar'), 'New User')).not.toBeNull();
  });

  it('should render AppBar header', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.appBar.setAppBarHeaderContent('AppHeader Header');

    expect(screen.getByText(/AppHeader Header/g)).not.toBeNull();
  });

  it('should render drawer header', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.appBar.setDrawerHeaderContent('Drawer Header');

    uiStore.appBar.toggleDrawer();

    expect(screen.getByText(/Drawer Header/g)).not.toBeNull();
  });
});
