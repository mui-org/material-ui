import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function BasicPagination() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  function handleChange(event, value) {
    setPage(value);
  }

  return (
    <div className={classes.root}>
      <Pagination
        page={page}
        onChange={handleChange}
        count={10}
        showFirstButton
        showLastButton
      />
      <Pagination
        page={page}
        onChange={handleChange}
        count={10}
        showFirstButton
        showLastButton
        disabled
      />
      <Typography>Page: {page}</Typography>
    </div>
  );
}
