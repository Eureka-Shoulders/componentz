import MuiBreadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useUIStore } from '../../index';
import { observer } from 'mobx-react-lite';
import { MouseEventHandler } from 'react';
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

/**
 * @returns A component that displays Breadcrumbs and should be controlled by the UIStore
 */

function Breadcrumbs(props: BreadcrumbsProps) {
  const uiStore = useUIStore();

  return (
    <MuiBreadcrumbs {...props} data-testid="breadcrumbs">
      {uiStore.breadcrumb.linkedPaths.map((path) => (
        <Link
          key={path.label}
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
