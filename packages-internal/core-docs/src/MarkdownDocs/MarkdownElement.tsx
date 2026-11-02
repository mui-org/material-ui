import * as React from 'react';
import clsx from 'clsx';
import { alpha, styled } from '@mui/material/styles';
import useForkRef from '@mui/utils/useForkRef';
import { brandingDarkTheme as darkTheme, brandingLightTheme as lightTheme } from '../branding';

const Root = styled('div')(
  ({ theme }) => ({
    ...lightTheme.typography.body1,
    lineHeight: 1.625, // Rounds up to 26px－increased compared to the 1.5 default to make the docs easier to read.
    color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
    '& :focus-visible': {
      outline: `3px solid ${alpha(lightTheme.palette.primary[500], 0.5)}`,
      outlineOffset: 2,
    },
    '& strong': {
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
    },
    wordBreak: 'break-word',
    '& pre': {
      lineHeight: 1.5, // Developers like when the code is dense.
      margin: theme.spacing(2, 'auto'),
      padding: theme.spacing(2),
      backgroundColor: 'hsl(210, 25%, 9%)', // a special, one-off, color tailored for the code blocks using MUI's branding theme blue palette as the starting point. It has a less saturaded color but still maintaining a bit of the blue tint.
      color: 'hsl(60, 30%, 96%)',
      colorScheme: 'dark',
      borderRadius: `var(--muidocs-shape-borderRadius, ${
        theme.shape?.borderRadius ?? lightTheme.shape.borderRadius
      }px)`,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      fontSize: lightTheme.typography.pxToRem(13),
      maxHeight: '400px',
    },
    '& code': {
      ...lightTheme.typography.body2,
      fontFamily: lightTheme.typography.fontFamilyCode,
      fontWeight: 400,
      WebkitFontSmoothing: 'subpixel-antialiased',
    },
    '& pre > code': {
      // Reset for Safari
      // https://github.com/necolas/normalize.css/blob/master/normalize.css#L102
      fontSize: 'inherit',
    },
    // inline code block
    '& :not(pre) > code': {
      padding: '2px 4px',
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      // Translucent, so the pill is a shade of whatever background it sits on.
      backgroundColor: alpha(lightTheme.palette.grey[900], 0.035),
      border: '1px solid',
      borderColor: alpha(lightTheme.palette.grey[900], 0.125),
      borderRadius: 6,
      fontSize: lightTheme.typography.pxToRem(13),
      direction: 'ltr /*! @noflip */',
      boxDecorationBreak: 'clone',
    },
    '& h1': {
      ...lightTheme.typography.h3,
      fontSize: lightTheme.typography.pxToRem(36),
      fontFamily: lightTheme.typography.fontFamilyTagline,
      margin: '10px 0',
      color: `var(--muidocs-palette-primaryDark-900, ${lightTheme.palette.primaryDark[900]})`,
      fontWeight: 600,
      letterSpacing: -0.2,
    },
    '& .description': {
      ...lightTheme.typography.subtitle1,
      fontWeight: 400,
      margin: '0 0 24px',
    },
    '& .component-tabs': {
      margin: '0 0 40px',
    },
    '& h2': {
      ...lightTheme.typography.h5,
      fontFamily: lightTheme.typography.fontFamilyTagline,
      fontSize: theme.typography.pxToRem(26),
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '40px 0 4px',
    },
    '& h3': {
      ...lightTheme.typography.h6,
      fontFamily: lightTheme.typography.fontFamilyTagline,
      fontSize: theme.typography.pxToRem(20),
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '24px 0 4px',
    },
    '& h4': {
      ...lightTheme.typography.subtitle1,
      fontFamily: lightTheme.typography.fontFamilyTagline,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '20px 0 6px',
    },
    '& h5': {
      ...lightTheme.typography.subtitle2,
      fontFamily: lightTheme.typography.fontFamilyTagline,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '20px 0 8px',
    },
    '& p': {
      marginTop: 0,
      marginBottom: 16,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
    },
    '& ul, & ol': {
      paddingLeft: 30,
      marginTop: 0,
      marginBottom: 16,
      '& ul, & ol': {
        marginBottom: 6,
      },
    },
    '& a[target="_blank"]::after': {
      content: '""',
      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' focusable='false' aria-hidden='true' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z'%3E%3C/path%3E%3C/svg%3E")`,
      display: 'inline-flex',
      width: '1em',
      height: '1em',
      color: 'inherit',
      backgroundColor: 'currentColor',
      transform: 'translate(0, 2px)',
      transition: 'transform 0.3s cubic-bezier(0.1, 0.8, 0.3, 1)', // bounce effect
      opacity: 0.8,
    },
    '& a[target="_blank"]:hover::after': {
      opacity: 1,
      transform: 'translate(1px, 0)',
    },
    '& a.remove-link-arrow::after': {
      // Allows to remove link arrows for images
      display: 'none',
    },
    '& .ad.description a::after': {
      // Remove link arrow for ads
      display: 'none',
    },
    '& a': {
      // Style taken from the Link component
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
      fontWeight: theme.typography.fontWeightMedium,
      textDecoration: 'underline',
      textDecorationColor: alpha(lightTheme.palette.primary.main, 0.4),
      '&:hover': {
        textDecorationColor: 'inherit',
      },
    },
    '& a code': {
      color: 'inherit',
    },
    '& h1, & h2, & h3, & h4': {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-all',
      },
      '& .title-link-to-anchor': {
        color: 'inherit',
        textDecoration: 'none',
        boxShadow: 'none',
        fontWeight: 'inherit',
        position: 'relative',
        userSelect: 'text',
      },
      '& .anchor-icon': {
        // To prevent the link to get the focus.
        display: 'inline-flex',
        alignItems: 'center',
        visibility: 'hidden',
      },
      '& .anchor-icon, & .comment-link': {
        padding: 0,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        textAlign: 'center',
        marginLeft: 8,
        height: 26,
        width: 26,
        color: `var(--muidocs-palette-grey-600, ${lightTheme.palette.grey[600]})`,
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        borderRadius: 8,
        transition: theme.transitions.create(
          ['visibility', 'background-color', 'color', 'border-color'],
          {
            duration: theme.transitions.duration.shortest,
          },
        ),
        '&:hover': {
          backgroundColor: alpha(lightTheme.palette.primary[100], 0.4),
          borderColor: `var(--muidocs-palette-primary-100, ${lightTheme.palette.primary[100]})`,
          color: `var(--muidocs-palette-primary-main, ${lightTheme.palette.primary.main})`,
        },
        '& svg': {
          height: 14,
          width: 14,
          fill: 'currentColor',
          pointerEvents: 'none',
          verticalAlign: 'middle',
        },
      },
      '&:hover .anchor-icon': {
        visibility: 'visible',
      },
      '& .comment-link': {
        display: 'none', // So we can have the comment button opt-in.
        marginLeft: 'auto',
        transition: theme.transitions.create(['background-color', 'color', 'border-color'], {
          duration: theme.transitions.duration.shortest,
        }),
        '& svg': {
          fill: 'currentColor',
          marginRight: 1.5,
        },
      },
    },
    '& h1 code, & h2 code, & h3 code': {
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
    },
    '& h1 code': {
      fontWeight: lightTheme.typography.fontWeightSemiBold,
    },
    '& h2 code': {
      fontSize: lightTheme.typography.pxToRem(24),
      fontWeight: lightTheme.typography.fontWeightSemiBold,
    },
    '& h3 code': {
      fontSize: lightTheme.typography.pxToRem(18),
    },
    '& table': {
      // Trade display table for scroll overflow
      display: 'block',
      wordBreak: 'normal',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderCollapse: 'collapse',
      marginBottom: '20px',
      borderSpacing: 0,
      '& .prop-name, & .prop-type, & .prop-default, & .slot-name, & .slot-defaultClass, & .slot-default':
        {
          fontWeight: 400,
          fontFamily: lightTheme.typography.fontFamilyCode,
          WebkitFontSmoothing: 'subpixel-antialiased',
          fontSize: lightTheme.typography.pxToRem(13),
        },
      '& .required': {
        color: '#006500',
      },
      '& .optional': {
        color: '#45529f',
      },
      '& .prop-type, & .slot-defaultClass': {
        color: '#932981',
      },
      '& .prop-default, & .slot-default': {
        borderBottom: `1px dotted var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      },
    },
    '& td': {
      ...theme.typography.body2,
      borderBottom: `1px solid var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      paddingRight: 20,
      paddingTop: 16,
      paddingBottom: 16,
      color: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
    },
    '& td code': {
      lineHeight: 1.6,
    },
    '& th': {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: 500,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      whiteSpace: 'pre',
      borderBottom: `1px solid var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      paddingRight: 20,
      paddingTop: 12,
      paddingBottom: 12,
    },
    '& blockquote': {
      position: 'relative',
      padding: '0 16px',
      margin: 0,
      borderLeft: '1.5px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      '& p': {
        fontSize: theme.typography.pxToRem(12.5),
        fontFamily: lightTheme.typography.fontFamilyCode,
        fontWeight: lightTheme.typography.fontWeightMedium,
        lineHeight: theme.typography.pxToRem(24),
        textIndent: 20,
      },
      '&::before': {
        position: 'absolute',
        // eslint-disable-next-line mui/straight-quotes
        content: '"“"',
        color: `var(--muidocs-palette-grey-300, ${lightTheme.palette.grey[300]})`,
        fontSize: '2.5rem',
        top: 8,
        marginLeft: -6,
        lineHeight: 0.5,
      },
    },
    '& .MuiCallout-root': {
      display: 'flex',
      gap: '8px',
      padding: '12px',
      margin: '16px 0',
      border: '1px solid',
      color: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
      borderColor: `var(--muidocs-palette-grey-100, ${lightTheme.palette.grey[100]})`,
      borderRadius: `var(--muidocs-shape-borderRadius, ${
        theme.shape?.borderRadius ?? lightTheme.shape.borderRadius
      }px)`,
      '& .MuiCallout-content': {
        minWidth: 0, // Allows content to shrink. Useful when callout contains code block
        flexGrow: 1,
      },
      '& code': {
        height: 'fit-content',
      },
      '& :not(pre) > code': {
        backgroundColor: alpha(lightTheme.palette.grey[900], 0.06),
        borderColor: alpha(lightTheme.palette.grey[900], 0.18),
      },
      '& p': {
        marginBottom: '8px',
        '& > p:last-child, & > ul:last-child': {
          // Avoid margin on last child
          marginBottom: 0,
        },
        '& > ul': {
          // Because of the gap left by the icon, we visually need less padding
          paddingLeft: 22,
        },
      },
      '& .MuiCode-root': {
        '& pre': {
          margin: '4px 0 0 0',
          borderRadius: '12px 12px 6px 12px',
          borderColor: alpha(lightTheme.palette.primaryDark[600], 0.6),
          '& code': {
            backgroundColor: 'transparent',
          },
        },
      },
      '& .MuiCallout-icon-container': {
        width: 26, // to match text's line-height
        height: 26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        '& svg': {
          width: 18,
          height: 18,
        },
      },
      '& ul, & p': {
        '&:last-child': {
          margin: 0,
        },
      },
      '& ul, li, p': {
        color: 'inherit',
      },
      '&.MuiCallout-error': {
        color: `var(--muidocs-palette-error-900, ${lightTheme.palette.error[900]})`,
        backgroundColor: `var(--muidocs-palette-error-50, ${lightTheme.palette.error[50]})`,
        borderColor: `var(--muidocs-palette-error-100, ${lightTheme.palette.error[100]})`,
        '& strong': {
          color: `var(--muidocs-palette-error-800, ${lightTheme.palette.error[800]})`,
        },
        '& svg': {
          fill: `var(--muidocs-palette-error-500, ${lightTheme.palette.error[600]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-error-800, ${lightTheme.palette.error[800]})`,
          textDecorationColor: alpha(lightTheme.palette.error.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
      '&.MuiCallout-info': {
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
        backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
        borderColor: `var(--muidocs-palette-grey-100, ${lightTheme.palette.grey[100]})`,
        '& strong': {
          color: `var(--muidocs-palette-primary-800, ${lightTheme.palette.primary[800]})`,
        },
        '& svg': {
          fill: `var(--muidocs-palette-grey-600, ${lightTheme.palette.grey[600]})`,
        },
        // primary-600 linked code is under 4.5:1 on the code pill over this background.
        '& a': {
          color: `var(--muidocs-palette-primary-700, ${lightTheme.palette.primary[700]})`,
        },
      },
      '&.MuiCallout-success': {
        color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
        backgroundColor: `var(--muidocs-palette-success-50, ${lightTheme.palette.success[50]})`,
        borderColor: `var(--muidocs-palette-success-100, ${lightTheme.palette.success[100]})`,
        '& strong': {
          color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
        },
        '& svg': {
          fill: `var(--muidocs-palette-success-600, ${lightTheme.palette.success[600]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
          textDecorationColor: alpha(lightTheme.palette.success.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
      '&.MuiCallout-warning': {
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
        backgroundColor: alpha(lightTheme.palette.warning[50], 0.5),
        borderColor: alpha(lightTheme.palette.warning[700], 0.15),
        '& strong': {
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
        },
        '& svg': {
          fill: `var(--muidocs-palette-warning-600, ${lightTheme.palette.warning[600]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
          textDecorationColor: alpha(lightTheme.palette.warning.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
    },
    '& img, & video': {
      // Use !important so that inline style on <img> or <video> can't win.
      // This avoid horizontal overflows on mobile.
      maxWidth: '100% !important',
      // Avoid the image to be fixed height, so it can respect the aspect ratio.
      height: 'auto',
    },
    '& img': {
      // Avoid layout jump
      display: 'inline-block',
      // Avoid very sharp edges
      borderRadius: 2,
    },
    '& hr': {
      height: 1,
      margin: theme.spacing(5, 0),
      border: 0,
      flexShrink: 0,
      backgroundColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
    },
    '& kbd.key': {
      padding: 6,
      display: 'inline-block',
      whiteSpace: 'nowrap',
      margin: '0 1px',
      fontFamily: lightTheme.typography.fontFamilyCode,
      fontSize: lightTheme.typography.pxToRem(11),
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      lineHeight: '10px',
      verticalAlign: 'middle',
      borderRadius: 6,
      border: `1px solid var(--muidocs-palette-grey-300, ${lightTheme.palette.grey[300]})`,
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
      boxShadow: `inset 0 -2px 0 var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
    },
    '& details': {
      width: '100%',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
      border: '1px solid',
      borderColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      borderRadius: `var(--muidocs-shape-borderRadius, ${
        theme.shape?.borderRadius ?? lightTheme.shape.borderRadius
      }px)`,
      '& pre': {
        marginTop: theme.spacing(1),
      },
    },
    '& summary': {
      cursor: 'pointer',
      padding: theme.spacing(1),
      borderRadius: 6,
      listStyleType: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: theme.transitions.create(['background'], {
        duration: theme.transitions.duration.shortest,
      }),
      ':after': {
        content: '""',
        maskImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='black' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")`,
        display: 'inline-flex',
        width: '1em',
        height: '1em',
        color: 'inherit',
        backgroundColor: 'currentColor',
      },
      '&:hover': {
        backgroundColor: `var(--muidocs-palette-grey-100, ${lightTheme.palette.grey[50]})`,
      },
    },
    '& details[open] > summary::after': {
      content: '""',
      maskImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 10L8 6L4 10' stroke='black' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")`,
    },
    '& .MuiCode-root': {
      direction: 'ltr /*! @noflip */',
      position: 'relative',
      // Font size reset to fix a bug with Safari 16.0 when letterSpacing is set
      fontSize: 10,
      '&:has(.MuiCode-title)': {
        margin: theme.spacing(2, 'auto'),
        border: `1px solid var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
        borderRadius: theme.shape.borderRadius,
        overflow: 'clip',
        '& .MuiCode-copy': {
          top: '56px',
        },
      },
    },
    '& .MuiCode-copy-container': {
      // This container is only used in demo and highlight code
      position: 'sticky',
      zIndex: 1,
      top: 0,
    },
    '& .MuiCode-copy': {
      cursor: 'pointer',
      position: 'absolute',
      top: 12,
      right: 12,
      display: 'inline-flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      padding: theme.spacing(0.5),
      paddingBottom: '5px', // optical alignment
      fontFamily: lightTheme.typography.fontFamily,
      fontWeight: lightTheme.typography.fontWeightMedium,
      fontSize: lightTheme.typography.pxToRem(12),
      borderRadius: 6,
      border: '1px solid',
      borderColor: alpha(lightTheme.palette.primaryDark[600], 0.5),
      backgroundColor: alpha(lightTheme.palette.primaryDark[800], 0.5),
      color: `var(--muidocs-palette-grey-300, ${lightTheme.palette.grey[300]})`,
      transition: theme.transitions.create(['background', 'borderColor', 'display'], {
        duration: theme.transitions.duration.shortest,
      }),
      '@media (max-width: 640px)': {
        display: 'none',
      },
      '& .MuiCode-copied-label': {
        display: 'none',
      },
      '&:hover, &:focus': {
        borderColor: `var(--muidocs-palette-primaryDark-400, ${lightTheme.palette.primaryDark[400]})`,
        backgroundColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
        color: '#FFF',
        '& .MuiCode-copyKeypress': {
          display: 'block',
          // Approximate no hover capabilities with no keyboard
          // https://github.com/w3c/csswg-drafts/issues/3871
          '@media (any-hover: none)': {
            display: 'none',
          },
        },
      },
      '& .MuiCode-copyKeypress': {
        display: 'none',
        position: 'absolute',
        right: 34,
      },
      '&[data-copied]': {
        borderColor: `var(--muidocs-palette-primaryDark-400, ${lightTheme.palette.primaryDark[400]})`,
        backgroundColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
        color: '#fff',
        '& .MuiCode-copyKeypress': {
          opacity: 0,
        },
        '& .MuiCode-copy-label': {
          display: 'none',
        },
        '& .MuiCode-copied-label': {
          display: 'block',
        },
      },
    },
    '& .MuiCode-copyKeypress': {
      pointerEvents: 'none',
      userSelect: 'none',
      marginRight: theme.spacing(1.2),
      marginBottom: theme.spacing(0.2),
      whiteSpace: 'nowrap',
      opacity: 0.6,
    },
    // The copy shortcut differs per OS. Resolve it from a `data-mac` attribute set on
    // `<html>` after hydration.
    '& .MuiCode-copyKeypressKey::before': {
      content: '"Ctrl + "',
    },
    '[data-mac] & .MuiCode-copyKeypressKey::before': {
      content: '"⌘"',
    },
    '& li': {
      // tight lists https://spec.commonmark.org/0.30/#tight
      marginBottom: 4,
      '& pre': {
        marginTop: theme.spacing(1),
      },
      // loose lists https://spec.commonmark.org/0.30/#loose
      '& > p': {
        marginBottom: theme.spacing(1),
      },
    },
    '& .feature-list': {
      padding: 0,
      listStyle: 'none',
      '& li': {
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        '::before': {
          content: `url('/static/branding/pricing/yes-light.svg')`,
          width: '18px',
          height: '18px',
        },
      },
    },
    '& .MuiCode-title': {
      padding: theme.spacing(1.5),
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1.5),
      borderBottom: `1px solid var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
      backgroundColor: `var(--muidocs-palette-primaryDark-900, ${lightTheme.palette.primaryDark[900]})`,
      fontFamily: theme.typography.fontFamilyCode,
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightBold,
      color: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      '::before': {
        content: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3333 3.99996H8L7.06 3.05996C6.80667 2.80663 6.46667 2.66663 6.11334 2.66663H2.66667C1.93334 2.66663 1.34 3.26663 1.34 3.99996L1.33334 12C1.33334 12.7333 1.93334 13.3333 2.66667 13.3333H13.3333C14.0667 13.3333 14.6667 12.7333 14.6667 12V5.33329C14.6667 4.59996 14.0667 3.99996 13.3333 3.99996ZM12.6667 12H3.33334C2.96667 12 2.66667 11.7 2.66667 11.3333V5.99996C2.66667 5.63329 2.96667 5.33329 3.33334 5.33329H12.6667C13.0333 5.33329 13.3333 5.63329 13.3333 5.99996V11.3333C13.3333 11.7 13.0333 12 12.6667 12Z' fill='%2399CCF3'/%3E%3C/svg%3E%0A");`,
        width: '16px',
        height: '16px',
      },
      '& + pre': {
        margin: 0,
        border: 'none',
        borderRadius: 0,
      },
    },
  }),
  ({ theme }) => ({
    [`*:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      color: 'rgb(255, 255, 255)',
      '& :not(pre) > code': {
        // inline code block
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: alpha(darkTheme.palette.grey[50], 0.1),
        backgroundColor: alpha(darkTheme.palette.grey[50], 0.055),
      },
      '& strong': {
        color: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
      },
      '& hr': {
        backgroundColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& a': {
        color: `var(--muidocs-palette-primary-300, ${darkTheme.palette.primary[300]})`,
      },
      '& a code': {
        color: 'inherit',
      },
      '& h1, & h2, & h3, & h4, & h5': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
        '& .anchor-icon, & .comment-link': {
          color: `var(--muidocs-palette-primary-300, ${darkTheme.palette.primaryDark[400]})`,
          '&:hover': {
            color: `var(--muidocs-palette-primary-100, ${darkTheme.palette.primary[100]})`,
            borderColor: `var(--muidocs-palette-primary-900, ${darkTheme.palette.primary[900]})`,
            backgroundColor: alpha(darkTheme.palette.primary[900], 0.6),
          },
        },
      },
      '& p, & ul, & ol': {
        color: `var(--muidocs-palette-grey-400, ${darkTheme.palette.grey[400]})`,
      },
      '& h1 code, & h2 code, & h3 code': {
        color: `var(--muidocs-palette-grey-100, ${darkTheme.palette.grey[100]})`,
      },
      '& table': {
        '& .required': {
          color: '#a5ffa5',
        },
        '& .optional': {
          color: '#a5b3ff',
        },
        '& .prop-type, & .slot-defaultClass': {
          color: '#ffb6ec',
        },
        '& .prop-default, & .slot-default': {
          borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        },
      },
      '& td': {
        color: `var(--muidocs-palette-text-secondary, ${darkTheme.palette.text.secondary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& th': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& blockquote': {
        borderColor: `var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
        '&::before': {
          color: `var(--muidocs-palette-primaryDark-500, ${darkTheme.palette.primaryDark[500]})`,
        },
      },
      '& .MuiCallout-root': {
        borderColor: `var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
        '& :not(pre) > code': {
          backgroundColor: alpha(darkTheme.palette.grey[50], 0.12),
          borderColor: alpha(darkTheme.palette.grey[50], 0.2),
        },
        '&.MuiCallout-error': {
          color: `var(--muidocs-palette-error-50, ${darkTheme.palette.error[50]})`,
          backgroundColor: alpha(darkTheme.palette.error[700], 0.15),
          borderColor: alpha(darkTheme.palette.error[400], 0.1),
          '& strong': {
            color: `var(--muidocs-palette-error-300, ${darkTheme.palette.error[300]})`,
          },
          '& svg': {
            fill: `var(--muidocs-palette-error-500, ${darkTheme.palette.error[500]})`,
          },
          '& a': {
            color: `var(--muidocs-palette-error-200, ${darkTheme.palette.error[200]})`,
          },
        },
        '&.MuiCallout-info': {
          color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
          backgroundColor: alpha(darkTheme.palette.grey[700], 0.15),
          borderColor: alpha(darkTheme.palette.grey[800], 0.5),
          '& strong': {
            color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
          },
          '& svg': {
            fill: `var(--muidocs-palette-grey-400, ${darkTheme.palette.grey[400]})`,
          },
          // Undoes the light info link color, which outranks the dark `'& a'`.
          '& a': {
            color: `var(--muidocs-palette-primary-300, ${darkTheme.palette.primary[300]})`,
          },
        },
        '&.MuiCallout-success': {
          color: `var(--muidocs-palette-success-50, ${darkTheme.palette.success[50]})`,
          backgroundColor: alpha(darkTheme.palette.success[700], 0.12),
          borderColor: alpha(lightTheme.palette.success[400], 0.1),
          '& strong': {
            color: `var(--muidocs-palette-success-200, ${darkTheme.palette.success[200]})`,
          },
          '& svg': {
            fill: `var(--muidocs-palette-success-500, ${darkTheme.palette.success[500]})`,
          },
          '& a': {
            color: `var(--muidocs-palette-success-100, ${darkTheme.palette.success[100]})`,
          },
        },
        '&.MuiCallout-warning': {
          color: `var(--muidocs-palette-warning-50, ${darkTheme.palette.warning[50]})`,
          backgroundColor: alpha(darkTheme.palette.warning[700], 0.12),
          borderColor: alpha(darkTheme.palette.warning[400], 0.1),
          '& strong': {
            color: `var(--muidocs-palette-warning-200, ${darkTheme.palette.warning[200]})`,
          },
          '& svg': {
            fill: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
          },
          '& a': {
            color: `var(--muidocs-palette-warning-100, ${darkTheme.palette.warning[100]})`,
          },
        },
      },
      '& kbd.key': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        backgroundColor: `var(--muidocs-palette-primaryDark-800, ${darkTheme.palette.primaryDark[800]})`,
        border: `1px solid var(--muidocs-palette-primaryDark-600, ${darkTheme.palette.primaryDark[600]})`,
        boxShadow: `inset 0 -2px 0 var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
      },
      '& details': {
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& summary': {
        '&:hover': {
          backgroundColor: `var(--muidocs-palette-primaryDark-800, ${darkTheme.palette.primaryDark[800]})`,
        },
      },
      '& .feature-list': {
        '& li': {
          '::before': {
            content: `url('/static/branding/pricing/yes-dark.svg')`,
          },
        },
      },
    },
  }),
);

function handleHeaderClick(event: Event) {
  const selection = document.getSelection();

  if (selection === null) {
    return;
  }

  if (selection.type === 'Range') {
    // Disable the <a> behavior to be able to select text.
    event.preventDefault();
  }
}

export interface MarkdownElementProps {
  className?: string;
  renderedMarkdown?: string;
  children?: React.ReactNode;
}

export const MarkdownElement = React.forwardRef<HTMLDivElement, MarkdownElementProps>(
  function MarkdownElement(props, ref) {
    const { className, renderedMarkdown, ...other } = props;
    const rootRef = React.useRef<HTMLElement>(null);
    const handleRef = useForkRef(rootRef, ref);

    React.useEffect(() => {
      const elements = rootRef.current!.getElementsByClassName('title-link-to-anchor');

      for (let i = 0; i < elements.length; i += 1) {
        // More reliable than `-webkit-user-drag` (https://caniuse.com/webkit-user-drag)
        elements[i].setAttribute('draggable', 'false');
        elements[i].addEventListener('click', handleHeaderClick);
      }
    }, []);

    const more: React.ComponentProps<typeof Root> = {};

    if (typeof renderedMarkdown === 'string') {
      // workaround for https://github.com/react/react/issues/17170
      // otherwise we could just set `dangerouslySetInnerHTML={undefined}`
      more.dangerouslySetInnerHTML = { __html: renderedMarkdown };
    }

    return (
      <Root className={clsx('markdown-body', className)} {...more} {...other} ref={handleRef} />
    );
  },
);
