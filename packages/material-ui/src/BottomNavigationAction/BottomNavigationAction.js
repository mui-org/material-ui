import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import unsupportedProp from '../utils/unsupportedProp';
import bottomNavigationActionClasses, {
  getBottomNavigationActionUtilityClass,
} from './bottomNavigationActionClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, showLabel, selected } = styleProps;

  const slots = {
    root: ['root', !showLabel && !selected && 'iconOnly', selected && 'selected'],
    label: ['label', !showLabel && !selected && 'iconOnly', selected && 'selected'],
  };

  return composeClasses(slots, getBottomNavigationActionUtilityClass, classes);
};

const BottomNavigationActionRoot = styled(ButtonBase, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, !styleProps.showLabel && !styleProps.selected && styles.iconOnly];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  transition: theme.transitions.create(['color', 'padding-top'], {
    duration: theme.transitions.duration.short,
  }),
  padding: '6px 12px 8px',
  minWidth: 80,
  maxWidth: 168,
  color: theme.palette.text.secondary,
  flexDirection: 'column',
  flex: '1',
  ...(!styleProps.showLabel &&
    !styleProps.selected && {
      paddingTop: 16,
    }),
  [`&.${bottomNavigationActionClasses.selected}`]: {
    paddingTop: 6,
    color: theme.palette.primary.main,
  },
}));

const BottomNavigationActionLabel = styled('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})(({ theme, styleProps }) => ({
  /* Styles applied to the label's span element. */
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(12),
  opacity: 1,
  transition: 'font-size 0.2s, opacity 0.2s',
  transitionDelay: '0.1s',
  ...(!styleProps.showLabel &&
    !styleProps.selected && {
      opacity: 0,
      transitionDelay: '0s',
    }),
  [`&.${bottomNavigationActionClasses.selected}`]: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

const BottomNavigationAction = React.forwardRef(function BottomNavigationAction(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBottomNavigationAction' });
  const {
    className,
    icon,
    label,
    onChange,
    onTouchStart,
    onTouchEnd,
    onClick,
    // eslint-disable-next-line react/prop-types -- private, always overridden by BottomNavigation
    selected,
    showLabel,
    value,
    ...other
  } = props;

  const styleProps = props;
  const classes = useUtilityClasses(styleProps);

  const touchStartPos = React.useRef();
  const touchTimer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(touchTimer.current);
    };
  }, [touchTimer]);

  const handleTouchStart = (event) => {
    if (onTouchStart) {
      onTouchStart(event);
    }

    const { clientX, clientY } = event.touches[0];

    touchStartPos.current = {
      clientX,
      clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (onTouchEnd) onTouchEnd(event);

    const target = event.target;
    const { clientX, clientY } = event.changedTouches[0];

    if (
      Math.abs(clientX - touchStartPos.current.clientX) < 10 &&
      Math.abs(clientY - touchStartPos.current.clientY) < 10
    ) {
      touchTimer.current = setTimeout(() => {
        // Simulate the native tap behavior on mobile.
        // On the web, a tap won't trigger a click if a container is scrolling.
        //
        // Note that the synthetic behavior won't trigger a native <a> nor
        // it will trigger a click at all on iOS.
        target.dispatchEvent(new Event('click', { bubbles: true }));
      }, 10);
    }
  };

  const handleChange = (event) => {
    clearTimeout(touchTimer.current);

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <BottomNavigationActionRoot
      ref={ref}
      className={clsx(classes.root, className)}
      focusRipple
      onClick={handleChange}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      styleProps={styleProps}
      {...other}
    >
      {icon}
      <BottomNavigationActionLabel className={classes.label} styleProps={styleProps}>
        {label}
      </BottomNavigationActionLabel>
    </BottomNavigationActionRoot>
  );
});

BottomNavigationAction.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display.
   */
  icon: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
};

export default BottomNavigationAction;
