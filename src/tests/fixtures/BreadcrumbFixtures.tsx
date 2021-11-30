import React, { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { BreadcrumbPath } from '../../components/Breadcrumbs/types';
import { useUIStore } from '../../index';

export const BreadcrumbsContainer = ({
  newPaths,
}: {
  newPaths: BreadcrumbPath[];
}) => {
  const uiStore = useUIStore();

  useEffect(() => {
    uiStore.breadcrumb.setPaths(newPaths);
  });

  return <Breadcrumbs />;
};
