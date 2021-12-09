import 'reflect-metadata';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { globalContainer } from 'index';
import { Provider } from 'inversify-react';
import { BreadcrumbsContainer } from '../../tests/fixtures/BreadcrumbFixtures';

describe('Breadcrumbs', () => {
  let onClickSpy: jest.Mock;

  beforeEach(() => {
    onClickSpy = jest.fn();
  });

  it('should renders correctly', async () => {
    const paths = [
      {
        label: 'Home',
      },
      {
        label: 'About',
      },
    ];

    render(
      <Provider container={globalContainer}>
        <BreadcrumbsContainer newPaths={paths} />
      </Provider>
    );

    expect(await screen.findByText(/Home/i)).not.toBeNull();
  });

  it('should call onClick function when the user clicks', async () => {
    const paths = [
      {
        label: 'Home',
        onClick: onClickSpy,
      },
      {
        label: 'About',
      },
    ];

    render(
      <Provider container={globalContainer}>
        <BreadcrumbsContainer newPaths={paths} />
      </Provider>
    );
    (await screen.findByText(/Home/i)).click();
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should disable last path', async () => {
    const paths = [
      {
        label: 'Home',
      },
      {
        label: 'About',
        onClick: onClickSpy,
      },
    ];

    render(
      <Provider container={globalContainer}>
        <BreadcrumbsContainer newPaths={paths} />
      </Provider>
    );

    (await screen.findByText(/About/i)).click();
    expect(onClickSpy).not.toHaveBeenCalled();
  });
});
