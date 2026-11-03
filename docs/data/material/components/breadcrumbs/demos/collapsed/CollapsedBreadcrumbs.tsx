import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CollapsedBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      {/* @focus-start */}
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Catalog
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Accessories
        </Link>
        <Link underline="hover" color="inherit" href="#">
          New Collection
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Belts</Typography>
      </Breadcrumbs>
      {/* @focus-end */}
    </div>
  );
}
