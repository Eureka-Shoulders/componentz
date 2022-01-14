import 'reflect-metadata';

import Bindings from '../../containers/global.bindings';
import { UIStoreType } from '@stores/types';
import {
  getByTestId,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import { Breadcrumb, globalContainer } from 'index';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';

describe('Breadcrumbs', () => {
  let onClickSpy: jest.Mock;
  let mockedBreadcrumb: RenderResult;
  let unitContainer: Container;

  beforeEach(() => {
    onClickSpy = jest.fn();

    unitContainer = globalContainer();

    mockedBreadcrumb = render(
      <Provider container={unitContainer}>
        <Breadcrumb />
      </Provider>
    );
  });

  it('should renders correctly', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.breadcrumb.setPaths([
      {
        label: 'Home',
      },
      {
        label: 'About',
      },
    ]);

    expect(
      getByTestId(mockedBreadcrumb.container, 'breadcrumbs')
    ).not.toBeNull();
  });

  it('should call onClick function when the user clicks', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.breadcrumb.setOnClickBreadcrumbPath(onClickSpy);

    uiStore.breadcrumb.setPaths([
      {
        label: 'Home',
      },
      {
        label: 'About',
      },
    ]);

    (await screen.findByText(/Home/i)).click();
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should disable last path', async () => {
    const uiStore = unitContainer.get<UIStoreType>(Bindings.UIStore);

    uiStore.breadcrumb.setPaths([
      {
        label: 'Home',
      },
      {
        label: 'About',
        onClick: onClickSpy,
      },
    ]);

    (await screen.findByText(/About/i)).click();
    expect(onClickSpy).not.toHaveBeenCalled();
  });
});
