import 'reflect-metadata';

import React from 'react';
import {
  render,
  RenderResult,
  screen,
  getByTestId,
  waitFor,
} from '@testing-library/react';
import { globalContainer, Snackbar } from 'index';
import { Provider } from 'inversify-react';
import { Container } from 'inversify';
import TYPES from '../../containers/global.types';
import { UIStoreType } from '../../stores/types';

jest.setTimeout(30000);

describe('Snackbar', () => {
  let onActionSpy: jest.Mock;
  let mockedSnackbar: RenderResult;
  let unitContainer: Container;

  beforeEach(() => {
    unitContainer = globalContainer();

    onActionSpy = jest.fn();
    mockedSnackbar = render(
      <Provider container={unitContainer}>
        <Snackbar autoHideDuration={3000} />
      </Provider>
    );
  });

  it('should renders correctly', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);
    uiStore.snackbar.show({
      message: 'message',
      severity: 'error',
      actionLabel: 'action label test',
      onActionClick: onActionSpy,
    });

    expect(await screen.findByText(/message/i)).not.toBeNull();
    await waitFor(() => {
      expect(getByTestId(mockedSnackbar.container, 'snackbar')).not.toBeNull();
    });
  });

  it('should call onAction function when the user clicks', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);
    uiStore.snackbar.show({
      message: 'message',
      severity: 'error',
      actionLabel: 'action label test',
      onActionClick: onActionSpy,
    });

    (await screen.findByText(/action label test/i)).click();
    expect(onActionSpy).toHaveBeenCalled();
  });

  // it('should close alert snackbar after 3 seconds', async () => {
  //   const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

  //   uiStore.snackbar.show({
  //     message: 'Hello World',
  //     severity: 'success',
  //   });
  //   expect(await screen.findByText(/Hello World/i)).not.toBeNull();
  //   await waitFor(
  //     () => {
  //       expect(getByTestId(mockedSnackbar.container, 'snackbar')).toBeNull();
  //     },
  //     { timeout: 3300 }
  //   );
  // });

  // it('should close alert snackbar after click away', async () => {
  //   const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

  //   uiStore.snackbar.show({
  //     message: 'Hello World',
  //     severity: 'success',
  //   });

  //   // click away and expect hide snackbar

  //   getByTestId(mockedSnackbar.container, 'out-label').click();
  //   expect(getByTestId(mockedSnackbar.container, 'snackbar')).toBeNull();
  // });

  // it('should close alert snackbar after click on close button', async () => {
  //   const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

  //   function closeSnackbar() {
  //     uiStore.snackbar.close();
  //   }

  //   uiStore.snackbar.show({
  //     message: 'Hello World',
  //     severity: 'success',
  //     actionLabel: 'action label test',
  //     onActionClick: closeSnackbar,
  //   });

  //   expect(getByTestId(mockedSnackbar.container, 'snackbar')).toBeNull();

  //   (await screen.findByText(/action label test/i)).click();

  //   expect(getByTestId(mockedSnackbar.container, 'snackbar')).not.toBeNull();
  // });

  // it('should have a test button in alert snackbar', async () => {
  //   const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

  //   function snackbarAction() {
  //     uiStore.snackbar.close();
  //   }

  //   uiStore.snackbar.show({
  //     message: 'Hello World',
  //     severity: 'success',
  //     actionLabel: 'Test',
  //     onActionClick: snackbarAction,
  //   });
  // });

  // it('should exec a function on action click', async () => {
  //   const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

  //   function snackbarAction() {
  //     uiStore.snackbar.close();
  //   }

  //   uiStore.snackbar.show({
  //     message: 'Hello World',
  //     severity: 'success',
  //     actionLabel: 'Test',
  //     onActionClick: snackbarAction,
  //   });
  // });

  // it('should enqueue new snackbars', async () => {
  //   const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

  //   uiStore.snackbar.show({
  //     message: 'Hello World',
  //     severity: 'success',
  //   });
  //   uiStore.snackbar.show({
  //     message: "I'm a nice error :)",
  //     severity: 'error',
  //   });
  // });
});
