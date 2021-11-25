import useUIStore from '../../hooks/useUIStore';
import MuiBreadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';

function Breadcrumbs(props: BreadcrumbsProps) {
  const uiStore = useUIStore();

  return (
    <MuiBreadcrumbs {...props}>
      {uiStore.breadcrumb.paths.map((path) => (
        <Link
          key={path.link}
          underline="hover"
          color="inherit"
          href={path.link}
        >
          {path.label}
        </Link>
      ))}
      <Typography>{uiStore.breadcrumb.finalPath}</Typography>
    </MuiBreadcrumbs>
  );
}

export default observer(Breadcrumbs);
