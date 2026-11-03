'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getSvgIconUtilityClass } from './svgIconClasses';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { color, fontSize, classes } = ownerState;

  const slots = {
    root: [
      'root',
      color !== 'inherit' && `color${capitalize(color)}`,
      `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getSvgIconUtilityClass, classes);
};

const SvgIconRoot = styled('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'inherit' && styles[`color${capitalize(ownerState.color)}`],
      styles[`fontSize${capitalize(ownerState.fontSize)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    flexShrink: 0,
    ...getTransitionStyles(theme, 'fill', {
      duration: (theme.vars ?? theme).transitions?.duration?.shorter,
    }),
    variants: [
      {
        props: (props) => !props.hasSvgAsChild,
        style: {
          // the <svg> will define the property that has `currentColor`
          // for example heroicons uses fill="none" and stroke="currentColor"
          fill: 'currentColor',
        },
      },
      {
        props: { fontSize: 'inherit' },
        style: { fontSize: 'inherit' },
      },
      {
        props: { fontSize: 'small' },
        style: { fontSize: theme.typography?.pxToRem?.(20) || '1.25rem' },
      },
      {
        props: { fontSize: 'medium' },
        style: { fontSize: theme.typography?.pxToRem?.(24) || '1.5rem' },
      },
      {
        props: { fontSize: 'large' },
        style: { fontSize: theme.typography?.pxToRem?.(35) || '2.1875rem' },
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((theme.vars ?? theme).palette)
        .filter(([, value]) => value && value.main)
        .map(([color]) => ({
          props: { color },
          style: { color: (theme.vars ?? theme).palette?.[color]?.main },
        })),
      {
        props: { color: 'action' },
        style: { color: (theme.vars ?? theme).palette?.action?.active },
      },
      {
        props: { color: 'disabled' },
        style: { color: (theme.vars ?? theme).palette?.action?.disabled },
      },
      {
        props: { color: 'inherit' },
        style: { color: undefined },
      },
    ],
  })),
);

const SvgIcon = React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSvgIcon' });
  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24',
    ...other
  } = props;

  const hasSvgAsChild = React.isValidElement(children) && children.type === 'svg';

  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
    hasSvgAsChild,
  };

  const more = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  const classes = useUtilityClasses(ownerState);

  return (
    <SvgIconRoot
      as={component}
      className={clsx(classes.root, className)}
      focusable="false"
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      ref={ref}
      {...more}
      {...other}
      {...(hasSvgAsChild && children.props)}
      ownerState={ownerState}
    >
      {hasSvgAsChild ? children.props.children : children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </SvgIconRoot>
  );
});

SvgIcon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'inherit',
      'action',
      'disabled',
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'large', 'medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string,
};

SvgIcon.muiName = 'SvgIcon';

export default SvgIcon;
