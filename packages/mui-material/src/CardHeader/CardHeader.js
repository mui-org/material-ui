'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import Typography, { typographyClasses } from '../Typography';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import cardHeaderClasses, { getCardHeaderUtilityClass } from './cardHeaderClasses';
import useSlot from '../utils/useSlot';
import { useCardContext } from '../Card/CardContext';
import Link from '../Link';
import ButtonBase from '../ButtonBase';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    avatar: ['avatar'],
    action: ['action'],
    content: ['content'],
    title: ['title'],
    subheader: ['subheader'],
  };

  return composeClasses(slots, getCardHeaderUtilityClass, classes);
};

const CardHeaderRoot = styled('div', {
  name: 'MuiCardHeader',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [
      { [`& .${cardHeaderClasses.title}`]: styles.title },
      { [`& .${cardHeaderClasses.subheader}`]: styles.subheader },
      styles.root,
    ];
  },
})({
  display: 'flex',
  alignItems: 'center',
  margin: 16,
  '& > *': {
    zIndex: 2,
  },
});

const CardHeaderAvatar = styled('div', {
  name: 'MuiCardHeader',
  slot: 'Avatar',
})({
  display: 'flex',
  flex: '0 0 auto',
  marginRight: 16,
});

const CardHeaderAction = styled('div', {
  name: 'MuiCardHeader',
  slot: 'Action',
})({
  flex: '0 0 auto',
  alignSelf: 'flex-start',
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4,
});

const CardHeaderContent = styled('div', {
  name: 'MuiCardHeader',
  slot: 'Content',
})({
  flex: '1 1 auto',
  // Combine this and the below selector once https://github.com/emotion-js/emotion/issues/3366 is solved
  [`.${typographyClasses.root}:where(& .${cardHeaderClasses.title})`]: {
    display: 'block',
  },
  [`.${typographyClasses.root}:where(& .${cardHeaderClasses.subheader})`]: {
    display: 'block',
  },
});

const CardHeader = React.forwardRef(function CardHeader(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCardHeader' });
  const {
    action,
    avatar,
    component = 'div',
    disableTypography = false,
    subheader: subheaderProp,
    title: titleProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    disableTypography,
  };

  const { href, onClick } = useCardContext();

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  let title = titleProp;
  const [TitleSlot, titleSlotProps] = useSlot('title', {
    className: classes.title,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? 'body2' : 'h5',
      component: 'span',
    },
  });
  const [LinkSlot, linkSlotProps] = useSlot('link', {
    elementType: Link,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      // could also point to the read more button with aria-describedby, but that's not guaranteed to be present.
      'aria-description': 'read more',
      color: 'textPrimary',
      href,
      // underline: 'none', this does not seem to work.
      sx: {
        textDecoration: 'none',
        outline: 'none',
        '&:focus-visible': {
          '&::before': {
            outline: 'auto',
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        },
      },
    },
  });
  const [ButtonSlot, buttonSlotProps] = useSlot('button', {
    elementType: ButtonBase,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      // could also point to the read more button with aria-describedby, but that's not guaranteed to be present.
      'aria-description': 'read more',
      color: 'textPrimary',
      onClick,
      sx: {
        font: 'inherit',
        position: 'static',
        '&:focus-visible': {
          outline: 'none',
          '&::before': {
            outline: 'auto',
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        },
      },
    },
  });

  if (title != null && title.type !== Typography && !disableTypography) {
    let titleContent = title;

    if (href) {
      titleContent = <LinkSlot {...linkSlotProps}>{title}</LinkSlot>;
    } else if (onClick) {
      titleContent = <ButtonSlot {...buttonSlotProps}>{title}</ButtonSlot>;
    }

    title = <TitleSlot {...titleSlotProps}>{titleContent}</TitleSlot>;
  }

  let subheader = subheaderProp;
  const [SubheaderSlot, subheaderSlotProps] = useSlot('subheader', {
    className: classes.subheader,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? 'body2' : 'body1',
      color: 'textSecondary',
      component: 'span',
    },
  });
  if (subheader != null && subheader.type !== Typography && !disableTypography) {
    subheader = <SubheaderSlot {...subheaderSlotProps}>{subheader}</SubheaderSlot>;
  }

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: CardHeaderRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component,
    },
    ownerState,
  });

  const [AvatarSlot, avatarSlotProps] = useSlot('avatar', {
    className: classes.avatar,
    elementType: CardHeaderAvatar,
    externalForwardedProps,
    ownerState,
  });

  const [ContentSlot, contentSlotProps] = useSlot('content', {
    className: classes.content,
    elementType: CardHeaderContent,
    externalForwardedProps,
    ownerState,
  });

  const [ActionSlot, actionSlotProps] = useSlot('action', {
    className: classes.action,
    elementType: CardHeaderAction,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootSlotProps}>
      {avatar && <AvatarSlot {...avatarSlotProps}>{avatar}</AvatarSlot>}
      <ContentSlot {...contentSlotProps}>
        {title}
        {subheader}
      </ContentSlot>
      {action && <ActionSlot {...actionSlotProps}>{action}</ActionSlot>}
    </RootSlot>
  );
});

CardHeader.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display in the card header.
   */
  action: PropTypes.node,
  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    avatar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    subheader: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    avatar: PropTypes.elementType,
    content: PropTypes.elementType,
    root: PropTypes.elementType,
    subheader: PropTypes.elementType,
    title: PropTypes.elementType,
  }),
  /**
   * The content of the component.
   */
  subheader: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The content of the component.
   */
  title: PropTypes.node,
};

export default CardHeader;
