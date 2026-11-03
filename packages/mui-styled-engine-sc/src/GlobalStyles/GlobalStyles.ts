import type * as React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import type { CSSObject, StyleFunction } from 'styled-components';

export interface GlobalStylesProps<Theme extends object = {}> {
  defaultTheme?: object | undefined;
  styles: string | CSSObject | StyleFunction<Theme>;
}

function isEmpty(obj: object | null | undefined) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

const GlobalStyles = createGlobalStyle((props: any) => {
  const { styles, defaultTheme = {} } = props;

  if (typeof styles === 'function') {
    return styles(isEmpty(props.theme) ? defaultTheme : props.theme);
  }

  return styles;
}) as unknown as <Theme extends object = {}>(props: GlobalStylesProps<Theme>) => React.JSX.Element;

export default GlobalStyles;

(GlobalStyles as any).propTypes /* remove-proptypes */ = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
};
