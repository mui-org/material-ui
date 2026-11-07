'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import SystemDefaultPropsProvider, {
  useDefaultProps as useSystemDefaultProps,
} from '@mui/system/DefaultPropsProvider';
import type { ComponentsPropsList } from '../styles/props';

function DefaultPropsProvider(
  props: React.PropsWithChildren<{
    value: { [P in keyof ComponentsPropsList]?: Partial<ComponentsPropsList[P]> };
  }>,
) {
  return <SystemDefaultPropsProvider {...props} />;
}

DefaultPropsProvider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  value: PropTypes.object.isRequired,
} as any;

export default DefaultPropsProvider;

export function useDefaultProps<Props extends Record<string, any>>(params: {
  props: Props;
  name: string;
}) {
  return useSystemDefaultProps(params) as Props;
}
