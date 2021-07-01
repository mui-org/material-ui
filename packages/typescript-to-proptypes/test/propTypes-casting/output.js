import * as React from 'react';
import PropTypes from 'prop-types';
// empty props are likely a mistake.
// We want to make sure we catch this instead of keeping .propTypes
export default function Component(props) {
  return <div />;
}
