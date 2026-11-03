import * as React from 'react';

type BaseProps = {
  /**
   * Callback fired.
   * @param {MouseEvent} event The event.
   */
  onClick?(event: MouseEvent): void;
};

type ExtendedProps = {
  /**
   * Callback fired (extended).
   * @param {MouseEvent} event The event.
   */
  onClick?(event: MouseEvent): void;
};

type CombinedProps = BaseProps & ExtendedProps;

export default function Component(props: CombinedProps) {
  const { onClick } = props;
  return <button onClick={(e) => onClick?.(e.nativeEvent)}>click</button>;
}
