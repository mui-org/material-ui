import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Link from 'docs/src/modules/components/Link';

const Item = styled('div', {
  shouldForwardProp:
    // disable `as` prop
    () => true,
})(({ theme }) => {
  return {
    ...theme.typography.body2,
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    outline: 0,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    },
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 6,
      paddingBottom: 6,
    },
  };
});

const ItemLink = styled(Item.withComponent(Link), {
  shouldForwardProp: (prop) => prop !== 'depth',
})(({ depth, theme }) => {
  return {
    color: theme.palette.text.secondary,
    '&.app-drawer-active': {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
      '&.Mui-focusVisible': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
    },
    paddingLeft: `${8 * (3 + 1.5 * depth)}px`,
  };
});

const ItemButtonIcon = styled(ArrowRightIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open, theme }) => {
  return {
    fontSize: 18,
    marginLeft: -19,
    color: theme.palette.text.secondary,
    transform: open && 'rotate(90deg)',
  };
});

const ItemButton = styled(Item.withComponent(ButtonBase), {
  shouldForwardProp: (prop) => prop !== 'depth',
})(({ depth, theme }) => {
  return {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    [`&:hover ${ItemButtonIcon}`]: {
      color: theme.palette.text.primary,
    },
    paddingLeft: `${8 * (3 + 1.5 * depth)}px`,
  };
});

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'depth' })(({ depth }) => {
  return {
    padding: depth === 0 ? '0 8px' : '1px 0',
    display: 'block',
  };
});

export default function AppNavDrawerItem(props) {
  const {
    children,
    depth,
    href,
    onClick,
    openImmediately = false,
    topLevel = false,
    title,
    linkProps,
    ...other
  } = props;
  const [open, setOpen] = React.useState(openImmediately);

  const handleClick = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  if (href) {
    return (
      <StyledLi {...other} depth={depth}>
        <ItemLink
          activeClassName="app-drawer-active"
          href={href}
          underline="none"
          onClick={onClick}
          depth={depth}
          {...linkProps}
        >
          {title}
        </ItemLink>
      </StyledLi>
    );
  }

  return (
    <StyledLi {...other} depth={depth}>
      <ItemButton
        depth={depth}
        disableRipple
        className={topLevel && 'algolia-lvl0'}
        onClick={handleClick}
      >
        <ItemButtonIcon open={open} />
        {title}
      </ItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </StyledLi>
  );
}

AppNavDrawerItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  linkProps: PropTypes.object,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
