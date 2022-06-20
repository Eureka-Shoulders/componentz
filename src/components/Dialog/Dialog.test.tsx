import 'reflect-metadata';
import Bindings from '../../containers/global.bindings';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import globalContainer from '../../containers/global.inversify';
import Dialog from './index';
import { UIStoreType } from '../../stores/UIStore';

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

    expect(screen.queryByText('Test content')).toBeNull();

    uiStore.dialog.open();

    expect(screen.queryByText('Test content')).not.toBeNull();
  });

  it('should call onAccept function when the user clicks', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
      rejectLabel: 'Reject',
      acceptLabel: 'Confirm',
    });

    uiStore.dialog.open();

    (await screen.findByText('Confirm')).click();
    expect(onAcceptSpy).toHaveBeenCalled();
  });

  it('should call onReject function when the user clicks', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
      rejectLabel: 'Reject',
      acceptLabel: 'Confirm',
    });

    uiStore.dialog.open();

    (await screen.findByText(/Reject/i)).click();
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

    uiStore.dialog.open();

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

    uiStore.dialog.open();

    expect(screen.getByText(/Test content 1/i)).not.toBeNull();

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content 2',
    });

    uiStore.dialog.open();

    expect(screen.getByText(/Test content 2/i)).not.toBeNull();
  });

  it('should reset an existing dialog', () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.dialog.set({
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content 1',
    });

    uiStore.dialog.open();

    expect(screen.getByText(/Test content 1/i)).not.toBeNull();

    uiStore.dialog.reset();

    expect(screen.queryByText(/Test content 1/i)).toBeNull();
  });
});
