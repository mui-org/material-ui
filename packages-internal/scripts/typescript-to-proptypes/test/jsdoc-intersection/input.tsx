import * as React from 'react';

type BaseProps = {
  /**
   * The label of the component.
   * @default 'base'
   */
  label: string;
  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;
};

type ExtraProps = {
  /**
   * The label from extra props.
   * @default 'extra'
   */
  label: string;
  /**
   * The size of the component.
   */
  size?: 'small' | 'medium' | 'large';
};

type CombinedProps = BaseProps & ExtraProps;

export default function Component(props: CombinedProps) {
  const { label, disabled, size } = props;
  return (
    <button disabled={disabled} data-size={size}>
      {label}
    </button>
  );
}
