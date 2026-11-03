import * as React from 'react';
import type { ComponentProps } from './types';

export default function Component(props: ComponentProps) {
  const { name, onItemClick } = props;

  return <button onClick={(e) => onItemClick?.(e.nativeEvent)}>{name}</button>;
}
