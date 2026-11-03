import * as React from 'react';
import type { Instance } from '@popperjs/core';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  children: React.ReactElement<unknown>;
  value: number;
}

export default function ValueLabelComponent(props: Props) {
  const { children, value } = props;

  const popperRef = React.useRef<Instance>(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      slotProps={{
        popper: { popperRef },
      }}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}
