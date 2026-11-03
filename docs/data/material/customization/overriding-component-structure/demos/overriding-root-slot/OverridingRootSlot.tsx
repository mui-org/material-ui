import Button from '@mui/material/Button';

export default function OverridingRootSlot() {
  return (
    // @focus-start @padding 2
    <Button component="a" href="https://mui.com/about/" target="_blank">
      About us
    </Button>
    // @focus-end
  );
}
