import 'reflect-metadata';

import { UIStoreType } from '@stores/types';
import { render, screen } from '@testing-library/react';
import { Dialog, globalContainer } from 'index';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import Bindings from '../../containers/global.bindings';

describe('Dialog', () => {
  let onRejectSpy: jest.Mock;
  let onAcceptSpy: jest.Mock;
  let unitContainer: Container;

  beforeEach(() => {
    onAcceptSpy = jest.fn();
    onRejectSpy = jest.fn();
    unitContainer = globalContainer();

    render(
      <Provider container={unitContainer}>
        <Dialog />
      </Provider>
    );
  });

  it('should renders correctly', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
    });

    expect(screen.getByText(/Test content/i)).not.toBeNull();
  });

  it('should call onAccept function when the user clicks', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
    });

    (await screen.findByText(/Confirm/i)).click();
    expect(onAcceptSpy).toHaveBeenCalled();
  });

  it('should call onReject function when the user clicks', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
    });

    (await screen.findByText(/Cancel/i)).click();
    expect(onRejectSpy).toHaveBeenCalled();
  });

  it('should render a JSX as content', () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: <div>Test content</div>,
    });

    expect(screen.getByText(/Test content/i)).not.toBeNull();
  });

  it('should render a new content with dialog open', () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content 1',
    });

    expect(screen.getByText(/Test content 1/i)).not.toBeNull();

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content 2',
    });

    expect(screen.getByText(/Test content 2/i)).not.toBeNull();
  });
});
