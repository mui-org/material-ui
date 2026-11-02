import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  padding: theme.spacing(1),
}));

export default function TypographyTheme() {
  return (
    // @focus @padding 2
    <Div>{"This div's text looks like that of a button."}</Div>
  );
}
