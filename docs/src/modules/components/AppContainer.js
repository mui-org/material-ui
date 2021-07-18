import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: 80 + 16,
    [theme.breakpoints.up('md')]: {
      // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
      // 120ch ≈ 960px (theme.breakpoints.values.md) using 16px Roboto
      // TODO Does it make sense to create breakpoints based on `ch`?
      maxWidth: '120ch',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  };
});

export default function AppContainer(props) {
  return <StyledContainer id="main-content" maxWidth={false} tabIndex={-1} {...props} />;
}
