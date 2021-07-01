import * as React from 'react';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '../components/Typography';

const BoxStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'success',
})(({ theme, error, success }) => ({
  padding: theme.spacing(2),
  ...(error && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
  ...(success && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
}));

function FormFeedback(props) {
  const { className, children, error, success, ...others } = props;

  return (
    <BoxStyled error={error} success={success} className={className} {...others}>
      <Typography color="inherit">{children}</Typography>
    </BoxStyled>
  );
}

FormFeedback.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default FormFeedback;
