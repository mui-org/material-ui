import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

// verify that https://github.com/mui/material-ui/issues/19756 already worked.
function MouseEnterTest() {
  function handleMouseEnter(event: React.MouseEvent<HTMLLIElement>) {}
  <ListItem onMouseEnter={handleMouseEnter} />;

  function handleMouseEnterButton(event: React.MouseEvent<HTMLDivElement>) {}
  // @ts-expect-error: The default li root cannot use a mouse handler restricted to HTMLDivElement.
  <ListItem onMouseEnter={handleMouseEnterButton} />; // desired: missing property button
  <ListItemButton onMouseEnter={handleMouseEnterButton} />;
}

// https://github.com/mui/material-ui/issues/26469
const StyledListItem = styled(ListItem)({});
function StyledTest() {
  <StyledListItem dense />;
}
