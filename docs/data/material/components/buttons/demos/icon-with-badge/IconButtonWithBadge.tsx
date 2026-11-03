import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function IconButtonWithBadge() {
  return (
    // @focus-start @padding 2
    <IconButton aria-label="view cart with 2 items">
      <ShoppingCartIcon fontSize="small" />
      <CartBadge badgeContent={2} color="primary" overlap="circular" />
    </IconButton>
    // @focus-end
  );
}
