import * as React from 'react';
import type { ComponentProps } from './types';

export default function Component(props: ComponentProps) {
  const { label, onClick } = props;
  return <button onClick={(e) => onClick?.(e.nativeEvent)}>{label}</button>;
}
