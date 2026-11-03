import type { PaperProps } from '@mui/material/Paper';
import MuiPaper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface ExtraPaperProps {
  background: 'light' | 'main' | 'dark';
  padding?: boolean;
}

const PaperRoot = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding',
})<ExtraPaperProps>(({ theme }) => ({
  variants: [
    {
      props: ({ padding }) => !!padding,
      style: {
        padding: theme.spacing(1),
      },
    },
    {
      props: { background: 'main' },
      style: {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    {
      props: { background: 'light' },
      style: {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    {
      props: { background: 'dark' },
      style: {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
  ],
}));

export default function Paper(props: PaperProps & ExtraPaperProps) {
  const { background, classes, className, padding = false, ...other } = props;

  return (
    <PaperRoot
      square
      elevation={0}
      background={background}
      padding={padding}
      className={className}
      {...other}
    />
  );
}
