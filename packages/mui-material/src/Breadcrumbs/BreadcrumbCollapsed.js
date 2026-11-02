'use client';
import PropTypes from 'prop-types';
import { emphasize } from '@mui/system/colorManipulator';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';

const BreadcrumbCollapsedButton = styled(ButtonBase, {
  name: 'MuiBreadcrumbCollapsed',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    marginLeft: `calc(${theme.spacing(1)} * 0.5)`,
    marginRight: `calc(${theme.spacing(1)} * 0.5)`,
    backgroundColor: (theme.vars || theme).palette.grey[100],
    color: (theme.vars || theme).palette.grey[700],
    borderRadius: 2,
    '&:hover, &:focus': {
      backgroundColor: (theme.vars || theme).palette.grey[200],
    },
    '&:active': {
      boxShadow: theme.shadows[0],
      backgroundColor: emphasize(theme.palette.grey[200], 0.12),
    },
    ...theme.applyStyles('dark', {
      backgroundColor: (theme.vars || theme).palette.grey[700],
      color: (theme.vars || theme).palette.grey[100],
      '&:hover, &:focus': {
        backgroundColor: (theme.vars || theme).palette.grey[600],
      },
      '&:active': {
        backgroundColor: emphasize(theme.palette.grey[600], 0.12),
      },
    }),
  })),
);

const BreadcrumbCollapsedIcon = styled(MoreHorizIcon)({
  width: 24,
  height: 16,
});

/**
 * @ignore - internal component.
 */
function BreadcrumbCollapsed(props) {
  const { slots = {}, slotProps = {}, ...otherProps } = props;
  const { nativeButton, ...buttonBaseProps } = otherProps;
  const ownerState = props;

  return (
    <li>
      <BreadcrumbCollapsedButton focusRipple {...buttonBaseProps} ownerState={ownerState}>
        <BreadcrumbCollapsedIcon
          as={slots.CollapsedIcon}
          ownerState={ownerState}
          {...slotProps.collapsedIcon}
        />
      </BreadcrumbCollapsedButton>
    </li>
  );
}

BreadcrumbCollapsed.propTypes = {
  /**
   * The props used for the CollapsedIcon slot.
   * @default {}
   */
  slotProps: PropTypes.shape({
    collapsedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the BreadcumbCollapsed.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    CollapsedIcon: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default BreadcrumbCollapsed;
