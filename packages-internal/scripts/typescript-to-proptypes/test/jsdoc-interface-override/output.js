import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  const { label, disabled } = props;
  return <button disabled={disabled}>{label}</button>;
}

Component.propTypes = {
  /**
   * If true, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The overridden label description.
   * @default 'override'
   */
  label: PropTypes.string.isRequired,
};

export default Component;
