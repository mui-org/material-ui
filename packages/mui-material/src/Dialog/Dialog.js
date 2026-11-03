'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useId from '@mui/utils/useId';
import capitalize from '../utils/capitalize';
import Modal from '../Modal';
import Fade from '../Fade';
import Paper from '../Paper';
import { getDialogUtilityClass } from './dialogClasses';
import DialogContext from './DialogContext';
import Backdrop from '../Backdrop';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import useSlot from '../utils/useSlot';
import { FOCUSABLE_ATTRIBUTE } from '../utils/focusable';

const DialogBackdrop = styled(Backdrop, {
  name: 'MuiDialog',
  slot: 'Backdrop',
})({
  // Improve scrollable dialog support.
  zIndex: -1,
});

const useUtilityClasses = (ownerState) => {
  const { classes, scroll, maxWidth, fullWidth, fullScreen } = ownerState;

  const slots = {
    root: ['root'],
    backdrop: ['backdrop'],
    container: ['container', `scroll${capitalize(scroll)}`],
    paper: [
      'paper',
      `paperWidth${capitalize(String(maxWidth))}`,
      fullWidth && 'paperFullWidth',
      fullScreen && 'paperFullScreen',
    ],
  };

  return composeClasses(slots, getDialogUtilityClass, classes);
};

const DialogRoot = styled(Modal, {
  name: 'MuiDialog',
  slot: 'Root',
})({
  '@media print': {
    // Use !important to override the Modal inline-style.
    position: 'absolute !important',
  },
});

const DialogContainer = styled('div', {
  name: 'MuiDialog',
  slot: 'Container',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.container, styles[`scroll${capitalize(ownerState.scroll)}`]];
  },
})({
  height: '100%',
  '@media print': {
    height: 'auto',
  },
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  variants: [
    {
      props: {
        scroll: 'paper',
      },
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      props: {
        scroll: 'body',
      },
      style: {
        overflowY: 'auto',
        overflowX: 'hidden',
        textAlign: 'center',
        '&::after': {
          content: '""',
          display: 'inline-block',
          verticalAlign: 'middle',
          height: '100%',
          width: '0',
        },
      },
    },
  ],
});

const DialogPaper = styled(Paper, {
  name: 'MuiDialog',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.paper,
      styles[`paperWidth${capitalize(String(ownerState.maxWidth))}`],
      ownerState.fullWidth && styles.paperFullWidth,
      ownerState.fullScreen && styles.paperFullScreen,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    margin: 32,
    position: 'relative',
    overflowY: 'auto',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    '@media print': {
      overflowY: 'visible',
      boxShadow: 'none',
    },
    variants: [
      {
        props: {
          scroll: 'paper',
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100% - 64px)',
        },
      },
      {
        props: {
          scroll: 'body',
        },
        style: {
          display: 'inline-block',
          verticalAlign: 'middle',
          textAlign: 'initial',
        },
      },
      {
        props: ({ ownerState }) => !ownerState.maxWidth,
        style: {
          maxWidth: 'calc(100% - 64px)',
        },
      },
      {
        props: {
          maxWidth: 'xs',
        },
        style: {
          maxWidth:
            theme.breakpoints.unit === 'px'
              ? Math.max(theme.breakpoints.values.xs, 444)
              : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`,
        },
      },
      {
        props: {
          maxWidth: 'xs',
          scroll: 'body',
        },
        style: {
          [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
            maxWidth: 'calc(100% - 64px)',
          },
        },
      },
      ...Object.keys(theme.breakpoints.values)
        .filter((maxWidth) => maxWidth !== 'xs')
        .map((maxWidth) => ({
          props: { maxWidth },
          style: {
            maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}`,
          },
        })),
      ...Object.keys(theme.breakpoints.values)
        .filter((maxWidth) => maxWidth !== 'xs')
        .map((maxWidth) => ({
          props: { maxWidth, scroll: 'body' },
          style: {
            [theme.breakpoints.down(theme.breakpoints.values[maxWidth] + 32 * 2)]: {
              maxWidth: 'calc(100% - 64px)',
            },
          },
        })),
      {
        props: ({ ownerState }) => ownerState.fullWidth,
        style: {
          width: 'calc(100% - 64px)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.fullScreen,
        style: {
          margin: 0,
          width: '100%',
          maxWidth: '100%',
          height: '100%',
          maxHeight: 'none',
          borderRadius: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.fullScreen && ownerState.scroll === 'body',
        style: {
          margin: 0,
          maxWidth: '100%',
        },
      },
    ],
  })),
);

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
const Dialog = React.forwardRef(function Dialog(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiDialog' });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledbyProp,
    'aria-modal': ariaModal = true,
    children,
    className,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onClick,
    onClose,
    open,
    PaperComponent = Paper,
    role = 'dialog',
    scroll = 'paper',
    slots = {},
    slotProps = {},
    transitionDuration = defaultTransitionDuration,
    ...other
  } = props;

  const ownerState = {
    ...props,
    fullScreen,
    fullWidth,
    maxWidth,
    scroll,
  };

  const classes = useUtilityClasses(ownerState);

  const backdropClick = React.useRef();
  const handleMouseDown = (event) => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };
  const handleBackdropClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = null;

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const ariaLabelledby = useId(ariaLabelledbyProp);
  const dialogContextValue = React.useMemo(() => {
    return { titleId: ariaLabelledby };
  }, [ariaLabelledby]);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    elementType: DialogRoot,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.root, className),
    ref,
  });

  const [BackdropSlot, backdropSlotProps] = useSlot('backdrop', {
    elementType: DialogBackdrop,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: classes.backdrop,
  });

  const [PaperSlot, paperSlotProps] = useSlot('paper', {
    elementType: DialogPaper,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: classes.paper,
    additionalProps: {
      elevation: 24,
      role,
      'aria-describedby': ariaDescribedby,
      'aria-labelledby': ariaLabelledby,
      'aria-modal': ariaModal,
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: '',
    },
  });

  const [ContainerSlot, containerSlotProps] = useSlot('container', {
    elementType: DialogContainer,
    externalForwardedProps,
    ownerState,
    className: classes.container,
  });

  const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
    elementType: Fade,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      appear: true,
      in: open,
      timeout: transitionDuration,
      role: 'presentation',
    },
  });

  return (
    <RootSlot
      closeAfterTransition
      slots={{ backdrop: BackdropSlot }}
      slotProps={{
        backdrop: {
          transitionDuration,
          ...backdropSlotProps,
        },
      }}
      onClose={onClose}
      open={open}
      onClick={handleBackdropClick}
      {...rootSlotProps}
      {...other}
    >
      <TransitionSlot {...transitionSlotProps}>
        {/* roles are applied via cloneElement from TransitionComponent */}
        {/* roles needs to be applied on the immediate child of Modal or it'll inject one */}
        <ContainerSlot onMouseDown={handleMouseDown} {...containerSlotProps}>
          <PaperSlot as={PaperComponent} {...paperSlotProps}>
            <DialogContext.Provider value={dialogContextValue}>{children}</DialogContext.Provider>
          </PaperSlot>
        </ContainerSlot>
      </TransitionSlot>
    </RootSlot>
  );
});

Dialog.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby': PropTypes.string,
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * Informs assistive technologies that the element is modal.
   * It's added on the element with role="dialog".
   * @default true
   */
  'aria-modal': PropTypes.oneOfType([PropTypes.oneOf(['false', 'true']), PropTypes.bool]),
  /**
   * Dialog children, usually the included sub-components.
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
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: PropTypes.bool,
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: PropTypes.elementType,
  /**
   * The ARIA role for the dialog element.
   * The main dialog role is `dialog`, but `alertdialog` can be used if the content of the dialog requires immediate attention.
   * See https://www.w3.org/TR/wai-aria-1.2/#dialog and https://www.w3.org/TR/wai-aria-1.2/#alertdialog for more details.
   * @default 'dialog'
   */
  role: PropTypes.oneOf(['alertdialog', 'dialog']),
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: PropTypes.oneOf(['body', 'paper']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    container: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    container: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default Dialog;
