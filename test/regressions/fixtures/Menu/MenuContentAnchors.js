import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';

const useMenuStyles = makeStyles({
  anchorEl: {
    // give the anchor enough space so that the menu can align the selected item
    margin: '80px 0',
  },
  listItem: {
    '&$listItemFocusVisible': {
      border: '3px dashed black',
    },
    '&$listItemSelected': {
      border: '3px dotted black',
    },
    '&$listItemFocusVisible$listItemSelected': {
      border: '3px solid black',
    },
  },
  listItemFocusVisible: {},
  listItemSelected: {},
});

/**
 * Item 1 or 2 can be pre-selected to check alignment between anchorEl and menuitem
 */
function SimpleMenu({ selectedItem, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useMenuStyles();

  const listItemClasses = {
    root: classes.listItem,
    focusVisible: classes.listItemFocusVisible,
    selected: classes.listItemSelected,
  };

  return (
    <Grid item>
      <Button className={classes.anchorEl} ref={setAnchorEl}>
        open button
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0} {...props}>
        {null}
        <MenuItem classes={listItemClasses} selected={selectedItem === 1}>
          Item 1
        </MenuItem>
        <MenuItem classes={listItemClasses} selected={selectedItem === 2}>
          Item 2
        </MenuItem>
        <MenuItem classes={listItemClasses}>Item 3</MenuItem>
      </Menu>
    </Grid>
  );
}

SimpleMenu.propTypes = { selectedItem: PropTypes.number };

export default function MenuContentAnchors() {
  return (
    <Grid container>
      <SimpleMenu variant="selectedMenu" />
      <SimpleMenu variant="menu" />
      <SimpleMenu selectedItem={1} variant="selectedMenu" />
      <SimpleMenu selectedItem={1} variant="menu" />
      <SimpleMenu selectedItem={2} variant="selectedMenu" />
      <SimpleMenu selectedItem={2} variant="menu" />
    </Grid>
  );
}
