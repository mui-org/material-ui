import * as React from 'react';

interface BaseProps {
  /**
   * The label from base.
   * @default 'base'
   */
  label: string;
  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;
}

interface ExtraProps {
  /**
   * The label from extra.
   * @default 'extra'
   */
  label: string;
  /**
   * The size of the component.
   */
  size?: 'small' | 'medium' | 'large';
}

interface CombinedProps extends BaseProps, ExtraProps {}

export default function Component(props: CombinedProps) {
  const { label, disabled, size } = props;
  return (
    <button disabled={disabled} data-size={size}>
      {label}
    </button>
  );
}
