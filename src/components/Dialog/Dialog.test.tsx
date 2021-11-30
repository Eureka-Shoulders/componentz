import 'reflect-metadata';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { globalContainer } from 'index';
import { Provider } from 'inversify-react';
import { DialogContainer } from '../../tests/fixtures/DialogFixtures';

describe('Dialog', () => {
  let onRejectSpy: jest.Mock;
  let onAcceptSpy: jest.Mock;

  beforeEach(() => {
    onAcceptSpy = jest.fn();
    onRejectSpy = jest.fn();
  });

  it('should renders correctly', async () => {
    const content = {
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
    };

    render(
      <Provider container={globalContainer}>
        <DialogContainer newContent={content} />
      </Provider>
    );

    expect(await screen.findByText(/Test content/i)).not.toBeNull();
  });

  it('should call onAccept function when the user clicks', async () => {
    const content = {
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
    };

    render(
      <Provider container={globalContainer}>
        <DialogContainer
          newContent={content}
          props={{ confirmLabel: 'Confirm', cancelLabel: 'Cancel' }}
        />
      </Provider>
    );
    (await screen.findByText(/Confirm/i)).click();
    expect(onAcceptSpy).toHaveBeenCalled();
  });

  it('should call onReject function when the user clicks', async () => {
    const content = {
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: 'Test content',
    };

    render(
      <Provider container={globalContainer}>
        <DialogContainer
          newContent={content}
          props={{ confirmLabel: 'Confirm', cancelLabel: 'Cancel' }}
        />
      </Provider>
    );
    (await screen.findByText(/Cancel/i)).click();
    expect(onRejectSpy).toHaveBeenCalled();
  });

  it('should render a JSX as content', () => {
    const content = {
      title: 'Test title',
      onReject: onRejectSpy,
      onAccept: onAcceptSpy,
      content: <div>Test content</div>,
    };

    render(
      <Provider container={globalContainer}>
        <DialogContainer newContent={content} />
      </Provider>
    );

    expect(screen.getByText(/Test content/i)).not.toBeNull();
  });
});
