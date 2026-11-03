import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const StyledAppContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: `calc(var(--MuiDocs-header-height) + ${theme.spacing(4)})`,
    // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
    // 105ch ≈ 930px
    fontFamily: 'Arial',
    maxWidth: '105ch',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  };
});

export function AppContainer(props: React.ComponentProps<typeof Container>) {
  return <StyledAppContainer id="main-content" tabIndex={-1} maxWidth={false} {...props} />;
}
