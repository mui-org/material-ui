import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '../svg-icons/ArrowLeft';
import ArrowRightIcon from '../svg-icons/ArrowRight';

export interface ExportedArrowSwitcherProps {
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    LeftArrowButton?: React.ElementType;
    LeftArrowIcon?: React.ElementType;
    RightArrowButton?: React.ElementType;
    RightArrowIcon?: React.ElementType;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: {
    leftArrowButton?: any;
    rightArrowButton?: any;
  };
  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText?: string;
  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText?: string;
}

interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  isLeftDisabled: boolean;
  isLeftHidden?: boolean;
  isRightDisabled: boolean;
  isRightHidden?: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const PickersArrowSwitcherRoot = styled(
  'div',
  {},
  { skipSx: true },
)({
  display: 'flex',
});

const PickersArrowSwitcherSpacer = styled(
  'div',
  {},
  { skipSx: true },
)(({ theme }) => ({
  width: theme.spacing(3),
}));

const PickersArrowSwitcherButton = styled(
  IconButton,
  {},
  { skipSx: true },
)(({ styleProps = {} }) => ({
  ...(!!styleProps.hidden && {
    visibility: 'hidden',
  }),
}));

const PickersArrowSwitcher = React.forwardRef(function PickersArrowSwitcher(
  props: Omit<ArrowSwitcherProps, 'as'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    components = {},
    componentsProps = {},
    isLeftDisabled,
    isLeftHidden,
    isRightDisabled,
    isRightHidden,
    leftArrowButtonText,
    onLeftClick,
    onRightClick,
    rightArrowButtonText,
    ...other
  } = props;
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const LeftArrowButton = components.LeftArrowButton || PickersArrowSwitcherButton;
  const leftArrowButtonProps = componentsProps.leftArrowButton || {};
  const LeftArrowIcon = components.LeftArrowIcon || ArrowLeftIcon;

  const RightArrowButton = components.RightArrowButton || PickersArrowSwitcherButton;
  const rightArrowButtonProps = componentsProps.rightArrowButton || {};
  const RightArrowIcon = components.RightArrowIcon || ArrowRightIcon;

  return (
    <PickersArrowSwitcherRoot ref={ref} className={className} {...other}>
      <LeftArrowButton
        size="small"
        aria-label={leftArrowButtonText}
        title={leftArrowButtonText}
        disabled={isLeftDisabled}
        edge="end"
        onClick={onLeftClick}
        {...leftArrowButtonProps}
        className={leftArrowButtonProps.className}
        styleProps={{ ...leftArrowButtonProps, hidden: isLeftHidden }}
      >
        {isRtl ? <RightArrowIcon /> : <LeftArrowIcon />}
      </LeftArrowButton>
      {children ? (
        <Typography variant="subtitle1" component="span">
          {children}
        </Typography>
      ) : (
        <PickersArrowSwitcherSpacer />
      )}
      <RightArrowButton
        size="small"
        aria-label={rightArrowButtonText}
        title={rightArrowButtonText}
        edge="start"
        disabled={isRightDisabled}
        onClick={onRightClick}
        {...rightArrowButtonProps}
        className={rightArrowButtonProps.className}
        styleProps={{ ...rightArrowButtonProps, hidden: isRightHidden }}
      >
        {isRtl ? <LeftArrowIcon /> : <RightArrowIcon />}
      </RightArrowButton>
    </PickersArrowSwitcherRoot>
  );
});

export default PickersArrowSwitcher;
