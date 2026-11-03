import * as React from 'react';

type BaseProps = {
  /**
   * Callback fired.
   * @param {MouseEvent} event The event source.
   */
  onClick?(event: MouseEvent): void;
};

type ExtendedProps = {
  onClick?(event: MouseEvent | React.MouseEvent): void;
};

type CombinedProps = BaseProps & ExtendedProps;

export default function Component(props: CombinedProps) {
  const { onClick } = props;
  return <button onClick={(e) => onClick?.(e.nativeEvent)}>click</button>;
}
