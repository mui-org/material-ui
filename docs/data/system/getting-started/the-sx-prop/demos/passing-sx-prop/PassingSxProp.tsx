import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';
import type { SxProps, Theme } from '@mui/material/styles';

interface ListHeaderProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function ListHeader({ sx = [], children }: ListHeaderProps) {
  return (
    <ListItem
      sx={[
        {
          width: 'auto',
          textDecoration: 'underline',
        },
        // `sx` can itself be an array, so flatten it before spreading.
        ...[sx].flat(),
      ]}
    >
      <FormLabel sx={{ color: 'inherit' }}>{children}</FormLabel>
    </ListItem>
  );
}

export default function PassingSxProp() {
  return (
    // @focus-start @padding 2
    <ListHeader
      sx={(theme) => ({
        color: 'info.main',
        ...theme.typography.overline,
      })}
    >
      Header
    </ListHeader>
    // @focus-end
  );
}
