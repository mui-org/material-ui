import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ActiveLastBreadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      {/* @focus-start */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Link
          underline="hover"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
          sx={{
            color: 'text.primary',
          }}
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs>
      {/* @focus-end */}
    </div>
  );
}
