import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination variant="outlined" count={10} showFirstButton showLastButton />
      <Pagination variant="outlined" color="primary" count={10} showFirstButton showLastButton />
      <Pagination variant="outlined" color="secondary" count={10} showFirstButton showLastButton />
      <Pagination variant="outlined" count={10} showFirstButton showLastButton disabled />
    </div>
  );
}
