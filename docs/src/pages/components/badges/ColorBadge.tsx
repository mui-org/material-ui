import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import Stack from '@material-ui/core/Stack';
import MailIcon from '@material-ui/icons/Mail';

export default function ColorBadge() {
  return (
    <Stack spacing={2} direction="row">
      <Badge badgeContent={4} color="secondary">
        <MailIcon color="action" />
      </Badge>
      <Badge badgeContent={4} color="success">
        <MailIcon color="action" />
      </Badge>
    </Stack>
  );
}
