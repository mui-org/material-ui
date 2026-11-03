'use client';
import * as React from 'react';
import clsx from 'clsx';
import styled from '@mui/styled-engine';
import type { OverridableComponent } from '@mui/types';
import styleFunctionSx from '../styleFunctionSx';
import useTheme from '../useTheme';
import type { BoxTypeMap } from '../Box';
import type { Theme as SystemTheme } from '../createTheme';

export default function createBox<
  T extends object = SystemTheme,
  AdditionalProps extends Record<string, unknown> = {},
>(
  options: {
    themeId?: string | undefined;
    defaultTheme?: T | undefined;
    defaultClassName?: string | undefined;
    generateClassName?: ((componentName: string) => string) | undefined;
  } = {},
): OverridableComponent<BoxTypeMap<AdditionalProps, 'div', T>> {
  const { themeId, defaultTheme, defaultClassName = 'MuiBox-root', generateClassName } = options;
  const BoxRoot: any = (styled as any)('div', {
    shouldForwardProp: (prop: string) => prop !== 'theme' && prop !== 'sx' && prop !== 'as',
  })(styleFunctionSx);

  const Box = React.forwardRef(function Box(inProps: any, ref) {
    const theme: any = useTheme(defaultTheme);
    const { className, component = 'div', ...other } = inProps;

    return (
      <BoxRoot
        as={component}
        ref={ref}
        className={clsx(
          className,
          generateClassName ? generateClassName(defaultClassName) : defaultClassName,
        )}
        theme={themeId ? theme[themeId] || theme : theme}
        {...other}
      />
    );
  });

  return Box as unknown as OverridableComponent<BoxTypeMap<AdditionalProps, 'div', T>>;
}
