import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  const { label, onClick } = props;
  return <button onClick={(e) => onClick?.(e.nativeEvent)}>{label}</button>;
}

Component.propTypes = {
  /**
   * Regular prop.
   */
  label: PropTypes.string.isRequired,
  /**
   * Second declaration: fires on click (augmented).
   * @param {MouseEvent | React.MouseEvent} event The event.
   */
  onClick: PropTypes.func,
};

export default Component;
