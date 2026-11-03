import type * as React from 'react';

const visuallyHidden: React.CSSProperties = {
  border: 0,
  clipPath: 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

export default visuallyHidden;
