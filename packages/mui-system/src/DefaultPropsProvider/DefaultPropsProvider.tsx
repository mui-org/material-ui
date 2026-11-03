'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import resolveProps from '@mui/utils/resolveProps';

const PropsContext = React.createContext<Record<string, any> | undefined>(undefined);

function DefaultPropsProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: Record<string, any> | undefined }>) {
  return <PropsContext.Provider value={value}>{children}</PropsContext.Provider>;
}

DefaultPropsProvider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  value: PropTypes.object,
} as any;

function getThemeProps<
  Theme extends {
    components?:
      | (Record<string, { defaultProps?: any; styleOverrides?: any; variants?: any }> & {
          mergeClassNameAndStyle?: boolean | undefined;
        })
      | undefined;
  },
  Props,
  Name extends string,
>(params: { props: Props; name: Name; theme?: Theme | undefined }): Props {
  const { theme, name, props } = params;

  if (!theme || !theme.components || !theme.components[name]) {
    return props;
  }
  const config = theme.components[name];

  if (config.defaultProps) {
    // compatible with v5 signature
    return resolveProps(config.defaultProps, props, theme.components.mergeClassNameAndStyle);
  }

  if (!config.styleOverrides && !config.variants) {
    // v6 signature, no property 'defaultProps'
    return resolveProps(config as any, props, theme.components.mergeClassNameAndStyle);
  }
  return props;
}

export function useDefaultProps<Props>({ props, name }: { props: Props; name: string }) {
  const ctx = React.useContext(PropsContext);
  return getThemeProps({ props, name, theme: { components: ctx } });
}

export default DefaultPropsProvider;
