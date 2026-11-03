import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Typography from '../components/Typography';

const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'success',
})(({ theme }) => ({
  padding: theme.spacing(2),
  variants: [
    {
      props: ({ error }) => error,
      style: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
      },
    },
    {
      props: ({ success }) => success,
      style: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
      },
    },
  ],
}));

function FormFeedback(props) {
  const { className, children, error, success, ...other } = props;

  return (
    <Root error={error} success={success} className={className} {...other}>
      <Typography sx={{ color: 'inherit' }}>{children}</Typography>
    </Root>
  );
}

FormFeedback.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default FormFeedback;
