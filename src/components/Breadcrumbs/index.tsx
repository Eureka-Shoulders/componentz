import MuiBreadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React, { MouseEventHandler } from 'react';
import useUIStore from '../../hooks/useUIStore';
import { BreadcrumbPath } from './types';

function handleClickLink(
  path: BreadcrumbPath
): MouseEventHandler<HTMLAnchorElement> {
  return (e) => {
    e.preventDefault();
    if (path.onClick && !path.link) {
      path.onClick();
    }
  };
}

function Breadcrumbs(props: BreadcrumbsProps) {
  const uiStore = useUIStore();

  return (
    <MuiBreadcrumbs {...props}>
      {uiStore.breadcrumb.linkedPaths.map((path) => (
        <Link
          key={path.link}
          underline="hover"
          color="inherit"
          href={path.link}
          onClick={handleClickLink(path)}
          sx={{
            cursor: 'pointer',
          }}
        >
          {path.label}
        </Link>
      ))}
      <Typography>{uiStore.breadcrumb.finalPath}</Typography>
    </MuiBreadcrumbs>
  );
}

export default observer(Breadcrumbs);
