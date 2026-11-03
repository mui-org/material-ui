import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
const PREFIX = 'Test';

const classes = {
  root: `${PREFIX}-root`,
  root2: `${PREFIX}-root2`,
  actions: `${PREFIX}-actions`,
  root3: `${PREFIX}-root3`,
  actions2: `${PREFIX}-actions2`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    backgroundColor: 'red',
  },

  [`& .${classes.root2}`]: {
    backgroundColor: theme.palette.primary.main,
  },

  [`& .${classes.actions}`]: {
    padding: theme.spacing(1),
  },

  [`& .${classes.root3}`]: {
    backgroundColor: 'blue',
  },

  [`& .${classes.actions2}`]: {
    padding: '0px',
  }
}));

const Button1 = Button;

const Button2 = Button;

const Button3 = Button;

export const Test = () => (
  <Root>
    <Button1
      classes={{
        root: classes.root
      }} />
    <Button2
      classes={{
        root: classes.root2,
        actions: classes.actions
      }} />
    <Button3
      classes={{
        root: classes.root3,
        actions: classes.actions2
      }} />
  </Root>
);
