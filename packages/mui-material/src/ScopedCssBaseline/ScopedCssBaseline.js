'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { html, body } from '../CssBaseline/CssBaseline';
import { getScopedCssBaselineUtilityClass } from './scopedCssBaselineClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getScopedCssBaselineUtilityClass, classes);
};

const ScopedCssBaselineRoot = styled('div', {
  name: 'MuiScopedCssBaseline',
  slot: 'Root',
})(
  memoTheme(({ theme }) => {
    const colorSchemeStyles = {};
    if (theme.colorSchemes) {
      Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
        const selector = theme.getColorSchemeSelector(key);
        if (selector.startsWith('@')) {
          colorSchemeStyles[selector] = {
            colorScheme: scheme.palette?.mode,
          };
        } else {
          colorSchemeStyles[`&${selector.replace(/\s*&/, '')}`] = {
            colorScheme: scheme.palette?.mode,
          };
        }
      });
    }
    return {
      ...html(theme, false),
      ...body(theme),
      '& *, & *::before, & *::after': {
        boxSizing: 'inherit',
      },
      '& strong, & b': {
        fontWeight: theme.typography.fontWeightBold,
      },
      variants: [
        {
          props: { enableColorScheme: true },
          style: theme.vars ? colorSchemeStyles : { colorScheme: theme.palette.mode },
        },
      ],
    };
  }),
);

const ScopedCssBaseline = React.forwardRef(function ScopedCssBaseline(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiScopedCssBaseline' });
  const { className, component = 'div', enableColorScheme, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ScopedCssBaselineRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

ScopedCssBaseline.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   */
  enableColorScheme: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ScopedCssBaseline;
