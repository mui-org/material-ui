import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  const { name, onItemClick } = props;
  return <button onClick={(e) => onItemClick?.(e.nativeEvent)}>{name}</button>;
}

Component.propTypes = {
  /**
   * A normal prop.
   */
  name: PropTypes.string.isRequired,
  /**
   * Augmented description of the callback.
   * @param {MouseEvent | React.MouseEvent} event The event source (augmented).
   */
  onItemClick: PropTypes.func,
};

export default Component;
