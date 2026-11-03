import MuiPaper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PaperRoot = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding',
})(({ theme }) => ({
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

function Paper(props) {
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

Paper.propTypes = {
  background: PropTypes.oneOf(['dark', 'light', 'main']).isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,
  padding: PropTypes.bool,
};

export default Paper;
