import 'reflect-metadata';

import {
  getByTestId,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { globalContainer, Snackbar } from 'index';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import React from 'react';
import TYPES from '../../containers/global.types';
import { UIStoreType } from '../../stores/types';

jest.setTimeout(30000);

describe('Snackbar', () => {
  let onActionSpy: jest.Mock;
  let mockedSnackbar: RenderResult;
  let unitContainer: Container;

  beforeEach(() => {
    onActionSpy = jest.fn();
    unitContainer = globalContainer();

    mockedSnackbar = render(
      <Provider container={unitContainer}>
        <button data-testid="outButton">outButton</button>
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

  it('should close alert snackbar after 3 seconds', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    uiStore.snackbar.show({
      message: 'Hello World',
      severity: 'success',
    });
    expect(await screen.findByText(/Hello World/i)).not.toBeNull();
    await waitFor(
      () => {
        expect(screen.queryByTestId('snackbar')).toBeNull();
      },
      { timeout: 3300 }
    );
  });

  it('should close alert snackbar after click away', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    uiStore.snackbar.show({
      message: 'Hello World',
      severity: 'success',
    });

    getByTestId(mockedSnackbar.container, 'outButton').click();
    await waitFor(
      () => {
        expect(screen.queryByTestId('snackbar')).toBeNull();
      },
      { timeout: 3300 }
    );
  });

  it('should have a test button in alert snackbar', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    function snackbarAction() {
      uiStore.snackbar.close();
    }

    uiStore.snackbar.show({
      message: 'Hello World',
      severity: 'success',
      actionLabel: 'Test',
      onActionClick: snackbarAction,
    });

    expect(getByTestId(mockedSnackbar.container, 'snackbar')).not.toBeNull();
  });

  it('should close alert snackbar after click on close button', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    function closeSnackbar() {
      uiStore.snackbar.close();
    }

    uiStore.snackbar.show({
      message: 'Hello World',
      severity: 'success',
      actionLabel: 'action label test',
      onActionClick: closeSnackbar,
    });

    expect(getByTestId(mockedSnackbar.container, 'snackbar')).not.toBeNull();

    (await screen.findByText(/action label test/i)).click();

    await waitFor(() => {
      expect(screen.queryByTestId('snackbar')).toBeNull();
    });
  });

  it('should enqueue new snackbar', async () => {
    const uiStore = unitContainer.get<UIStoreType>(TYPES.UIStore);

    uiStore.snackbar.show({
      message: 'Hello World',
      severity: 'success',
    });
    uiStore.snackbar.show({
      message: "I'm a second snackbar",
      severity: 'error',
    });
    uiStore.snackbar.show({
      message: "I'm a third snackbar",
      severity: 'warning',
    });

    expect(await screen.findByText(/Hello World/i)).not.toBeNull();

    await waitFor(
      () => {
        expect(screen.findByText(/I'm a second snackbar/i)).not.toBeNull();
      },
      { timeout: 3500 }
    );

    await waitFor(
      () => {
        expect(screen.findByText(/I'm a second snackbar/i)).not.toBeNull();
      },
      { timeout: 3500 }
    );
  });
});
