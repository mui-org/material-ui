import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import defer from './defer';

function FormButton(props) {
  const { disabled, mounted, ...other } = props;
  return (
    <Button
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...other}
    />
  );
}

FormButton.propTypes = {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
};

export default defer(FormButton);
