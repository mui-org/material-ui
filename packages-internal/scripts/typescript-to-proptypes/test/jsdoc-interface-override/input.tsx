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

interface OverrideProps extends BaseProps {
  /**
   * The overridden label description.
   * @default 'override'
   */
  label: string;
}

export default function Component(props: OverrideProps) {
  const { label, disabled } = props;
  return <button disabled={disabled}>{label}</button>;
}
