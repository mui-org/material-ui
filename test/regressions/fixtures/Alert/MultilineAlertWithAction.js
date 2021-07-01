import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/core/Alert';

export default function MultilineAlertWithAction() {
  return (
    <Alert
      action={
        <Button color="inherit" size="small">
          UNDO
        </Button>
      }
    >
      <Typography as="div">This is the first line.</Typography>
      <Typography as="div">This is the second line.</Typography>
    </Alert>
  );
}
