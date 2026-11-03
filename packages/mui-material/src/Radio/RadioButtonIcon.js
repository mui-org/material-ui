'use client';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { getTransitionStyles } from '../transitions/utils';

const RadioButtonIconRoot = styled('span', {
  name: 'MuiRadioButtonIcon',
  shouldForwardProp: rootShouldForwardProp,
})({
  position: 'relative',
  display: 'flex',
});

const RadioButtonIconBackground = styled(RadioButtonUncheckedIcon, {
  name: 'MuiRadioButtonIcon',
})({
  // Scale applied to prevent dot misalignment in Safari
  transform: 'scale(1)',
});

const RadioButtonIconDot = styled(RadioButtonCheckedIcon, {
  name: 'MuiRadioButtonIcon',
})(
  memoTheme(({ theme }) => ({
    left: 0,
    position: 'absolute',
    transform: 'scale(0)',
    ...getTransitionStyles(theme, 'transform', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: { checked: true },
        style: {
          transform: 'scale(1)',
          ...getTransitionStyles(theme, 'transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest,
          }),
        },
      },
    ],
  })),
);

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked = false, classes = {}, fontSize } = props;

  const ownerState = { ...props, checked };

  return (
    <RadioButtonIconRoot className={classes.root} ownerState={ownerState}>
      <RadioButtonIconBackground
        fontSize={fontSize}
        className={classes.background}
        ownerState={ownerState}
      />
      <RadioButtonIconDot fontSize={fontSize} className={classes.dot} ownerState={ownerState} />
    </RadioButtonIconRoot>
  );
}

RadioButtonIcon.propTypes /* remove-proptypes */ = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(['small', 'medium']),
};

export default RadioButtonIcon;
