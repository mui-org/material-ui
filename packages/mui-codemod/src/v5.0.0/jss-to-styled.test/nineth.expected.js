import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
const PREFIX = 'nineth';

const classes = {
  header: `${PREFIX}-header`,
  img: `${PREFIX}-img`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.header}`]: {
    marginLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    marginRight: 'auto',
    minWidth: 400,
  },

  [`& .${classes.img}`]: {
    marginTop: theme.spacing(4),
  }
}));

export default function Page() {


  return (
    <Root>
      <h1 className={classes.header}></h1>
      <img className={classes.img}></img>
    </Root>
  );
}