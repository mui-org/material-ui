import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  const { label, disabled, size } = props;
  return (
    <button disabled={disabled} data-size={size}>
      {label}
    </button>
  );
}

Component.propTypes = {
  /**
   * If true, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The label from base.
   * @default 'base'
   */
  label: PropTypes.string.isRequired,
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
};

export default Component;
