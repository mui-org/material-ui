import * as React from 'react';

type BaseProps = {
  /**
   * Callback fired when item clicked.
   * @param {MouseEvent} event The event source.
   * @param {string} id The item identifier.
   */
  onItemClick?(event: MouseEvent, id: string): void;
};

type ExtendedProps = {
  /**
   * Callback fired when item clicked.
   * @param {MouseEvent | React.MouseEvent} event The event source (extended).
   * @param {string} id The item identifier.
   */
  onItemClick?(event: MouseEvent | React.MouseEvent, id: string): void;
};

type CombinedProps = BaseProps & ExtendedProps;

export default function Component(props: CombinedProps) {
  const { onItemClick } = props;
  return <button onClick={(e) => onItemClick?.(e.nativeEvent, '1')}>click</button>;
}
