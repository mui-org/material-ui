'use client';
import type * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import type { Interpolation } from '@emotion/react';

export interface GlobalStylesProps<Theme = {}> {
  defaultTheme?: object | undefined;
  styles: Interpolation<Theme>;
}

function isEmpty(obj: object | null | undefined) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

export default function GlobalStyles<Theme = {}>(
  props: GlobalStylesProps<Theme>,
): React.JSX.Element {
  const { styles, defaultTheme = {} } = props;

  const globalStyles =
    typeof styles === 'function'
      ? (themeInput: Theme) =>
          (styles as (theme: Theme) => Interpolation<Theme>)(
            isEmpty(themeInput as object) ? (defaultTheme as Theme) : themeInput,
          )
      : styles;

  return <Global styles={globalStyles as any} />;
}

(GlobalStyles as any).propTypes /* remove-proptypes */ = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
};
