import React from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import * as recompose from 'recompose';
import Typography from '@material-ui/core/Typography';
import Link from 'modules/components/Link';

const PREFIX = 'AppAppBarCart';

const classes = {
  root: `${PREFIX}-root`,
  icon: `${PREFIX}-icon`,
  badge: `${PREFIX}-badge`,
  transparentBadge: `${PREFIX}-transparentBadge`
};

const StyledIconButton = styled(IconButton)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    padding: 8,
    '&&&': {
      marginLeft: 0,
    },
  },

  [`& .${classes.icon}`]: {
    fontSize: 24,
  },

  [`& .${classes.badge}`]: {
    right: 2,
    top: -8,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  [`& .${classes.transparentBadge}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  }
}));

// eslint-disable-next-line react/display-name
const LinkToCart = React.forwardRef((linkProps, ref) => (
  <Link {...linkProps} to="/order-cart/" ref={ref} />
));

function AppAppBarCart(props) {
  const {  className, variant, cart, transparent } = props;
  const count = cart.count || 0;

  return variant === 'text' ? (
    <Typography component={LinkToCart} className={className}>
      {'Cart'} {count > 0 && `(${count})`}
    </Typography>
  ) : (
    <StyledIconButton
      color={transparent ? 'inherit' : undefined}
      component={LinkToCart}
      className={clsx(classes.root, className)}
    >
      <ShoppingCartIcon className={classes.icon} />
      {count > 0 && (
        <Badge
          color="primary"
          classes={{ badge: clsx(classes.badge, { [classes.transparentBadge]: transparent }) }}
          badgeContent={count > 9 ? '+9' : count}
        >
          {''}
        </Badge>
      )}
    </StyledIconButton>
  );
}

AppAppBarCart.displayName = 'AppAppBarCart';

AppAppBarCart.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'icon']),
  transparent: PropTypes.bool,
};

AppAppBarCart.defaultProps = {
  variant: 'icon',
};

export default recompose.compose(
  
  connect((state) => ({ cart: state.data.cart })),
)(AppAppBarCart);
