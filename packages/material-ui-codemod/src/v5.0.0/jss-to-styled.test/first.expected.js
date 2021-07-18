import React from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import NoSsr from '@material-ui/core/NoSsr';
import IconClose from '@material-ui/icons/Close';
import IconMenu from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import AppBar from 'modules/components/AppBar';
import Logo from 'modules/components/Logo';
import Link from 'modules/components/Link';
import AppAppBarAuthenticated from 'modules/components/AppAppBarAuthenticated';
import AppAppBarUnauthenticated from 'modules/components/AppAppBarUnauthenticated';
// import SearchBar from 'modules/components/SearchBar';
import actionTypes from 'modules/redux/actionTypes';
import getUser from 'modules/getUser';
import getCart from 'modules/getCart';

const PREFIX = 'AppAppBar';

const classes = {
  grow: `${PREFIX}-grow`,
  wrap: `${PREFIX}-wrap`,
  wrapOpened: `${PREFIX}-wrapOpened`,
  menu: `${PREFIX}-menu`,
  menuIcon: `${PREFIX}-menuIcon`,
  closeIcon: `${PREFIX}-closeIcon`,
  burgerIcon: `${PREFIX}-burgerIcon`,
  white: `${PREFIX}-white`,
  content: `${PREFIX}-content`,
  contentOpened: `${PREFIX}-contentOpened`,
  item: `${PREFIX}-item`
};

const StyledAppBar = styled(AppBar)((
  {
    theme
  }
) => ({
  [`& .${classes.grow}`]: {
    display: 'block',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  [`& .${classes.wrap}`]: {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'center',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'baseline',
      padding: `calc(${theme.spacing(2)} - 1px) 0`,
      flexWrap: 'wrap',
    },
  },

  [`& .${classes.wrapOpened}`]: {
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.common.white,
      alignItems: 'flex-start',
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      left: 0,
      padding: theme.spacing(2),
      position: 'fixed',
      right: 0,
      top: 0,
    },
  },

  [`& .${classes.menu}`]: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      position: 'absolute',
      right: 0,
      top: theme.spacing(2),
    },
  },

  [`& .${classes.menuIcon}`]: {
    fontSize: 32,
    marginTop: -theme.spacing(1 / 2),
  },

  [`& .${classes.closeIcon}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.burgerIcon}`]: {
    color: theme.palette.text.secondary,
  },

  [`& .${classes.white}`]: {
    color: theme.palette.common.white,
  },

  [`& .${classes.content}`]: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 auto',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  [`& .${classes.contentOpened}`]: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },

  // searchBar: {
  //   [theme.breakpoints.down('xs')]: {
  //     flex: '1 0 100%',
  //     marginTop: theme.spacing(2),
  //   },
  // },
  [`& .${classes.item}`]: {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
      border: 0,
      color: theme.palette.common.white,
      fontSize: 24,
      height: theme.spacing(5),
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
  }
}));

class AppAppBar extends React.Component {
  state = {
    menuOpen: false,
  };

  async componentDidMount() {
    const cart = await getCart();
    this.props.dispatch({
      type: actionTypes.CART_UPDATE,
      payload: cart,
    });

    if (this.props.user.logged != null) {
      return;
    }

    const user = await getUser();
    this.props.dispatch({
      type: actionTypes.USER_UPDATE,
      payload: user,
    });
  }

  handleToggleMenu = (event, forceClose) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({ menuOpen: forceClose ? false : !this.state.menuOpen });
  };

  render() {
    const {  children, essential, position, user } = this.props;
    const { menuOpen } = this.state;

    return (
      <StyledAppBar essential={essential} position={position}>
        <div className={clsx(classes.wrap, { [classes.wrapOpened]: menuOpen })}>
          <Link to="/" aria-label="Back to homepage" color="inherit">
            <Logo color={menuOpen ? 'inherit' : 'textPrimary'} />
          </Link>
          {/*essential || menuOpen ? null : (
            <SearchBar
              id="app-bar-search"
              className={classes.searchBar}
            />
          )*/}
          <div
            className={clsx(classes.content, {
              [classes.contentOpened]: menuOpen,
              'mui-fixed': menuOpen,
            })}
          >
            {children || <div className={classes.grow} />}
            {essential ? null : (
              <Typography
                className={classes.item}
                component={Link}
                to="https://material-ui.zendesk.com/hc/en-us"
                target="_blank"
              >
                {'Help'}
              </Typography>
            )}
            <NoSsr>
              {user.logged === true ? (
                <AppAppBarAuthenticated essential={essential} menuOpen={menuOpen} />
              ) : null}
              {user.logged === false ? (
                <AppAppBarUnauthenticated essential={essential} menuOpen={menuOpen} />
              ) : null}
            </NoSsr>
          </div>
          {essential ? null : (
            <div className={clsx(classes.menu, 'mui-fixed')}>
              <a href="#" onClick={this.handleToggleMenu}>
                {menuOpen ? (
                  <IconClose
                    className={clsx(classes.menuIcon, classes.closeIcon, classes.white, {
                      [classes.hide]: menuOpen,
                    })}
                  />
                ) : (
                  <IconMenu
                    className={clsx(classes.menuIcon, classes.burgerIcon, {
                      [classes.hide]: menuOpen,
                    })}
                  />
                )}
              </a>
            </div>
          )}
        </div>
      </StyledAppBar>
    );
  }
}

AppAppBar.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  essential: PropTypes.bool,
  position: PropTypes.string,
  user: PropTypes.object,
};

export default compose(
  
  connect((state) => ({ user: state.data.user })),
)(AppAppBar);
