import * as React from 'react';
import MuiPaper, { PaperProps } from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';

interface ExtraPaperProps {
  background: 'light' | 'main' | 'dark';
  padding?: boolean;
}

const PaperRoot = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding',
})<ExtraPaperProps>(({ theme, background, padding }) => ({
  backgroundColor: theme.palette.secondary[background],
  ...(padding && {
    padding: theme.spacing(1),
  }),
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
