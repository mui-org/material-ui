import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { createTheme, alpha, darken } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    wordBreak: 'break-word',
    '& .anchor-link': {
      marginTop: -96, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre': {
      margin: theme.spacing(3, 'auto'),
      padding: theme.spacing(2),
      backgroundColor: '#272c34',
      direction: 'ltr',
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      maxWidth: 'calc(100vw - 32px)',
      [theme.breakpoints.up('md')]: {
        maxWidth: 'calc(100vw - 32px - 16px)',
      },
    },
    // inline code
    '& code': {
      direction: 'ltr',
      lineHeight: 1.4,
      display: 'inline-block',
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      WebkitFontSmoothing: 'subpixel-antialiased',
      padding: '0 3px',
      color: theme.palette.text.primary,
      backgroundColor:
        theme.palette.mode === 'light'
          ? 'rgba(255, 229, 100, 0.2)'
          : alpha(theme.palette.primary.main, 0.08),
      fontSize: '.85em',
      borderRadius: 2,
    },
    '& code[class*="language-"]': {
      backgroundColor: '#272c34',
      color: '#fff',
      // Avoid layout jump after hydration (style injected by prism)
      lineHeight: 1.5,
    },
    // code blocks
    '& pre code': {
      fontSize: '.9em',
    },
    '& .token.operator': {
      background: 'transparent',
    },
    '& h1': {
      ...theme.typography.h3,
      fontSize: 40,
      margin: '16px 0',
    },
    '& .description': {
      ...theme.typography.h5,
      margin: '0 0 40px',
    },
    '& h2': {
      ...theme.typography.h4,
      fontSize: 30,
      margin: '40px 0 16px',
    },
    '& h3': {
      ...theme.typography.h5,
      margin: '40px 0 16px',
    },
    '& h4': {
      ...theme.typography.h6,
      margin: '32px 0 16px',
    },
    '& h5': {
      ...theme.typography.subtitle2,
      margin: '32px 0 16px',
    },
    '& p, & ul, & ol': {
      marginTop: 0,
      marginBottom: 16,
    },
    '& ul': {
      paddingLeft: 30,
    },
    '& h1, & h2, & h3, & h4': {
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-all',
      },
      '& .anchor-link-style': {
        // To prevent the link to get the focus.
        display: 'none',
      },
      '& a:not(.anchor-link-style):hover': {
        color: 'currentColor',
        borderBottom: '1px solid currentColor',
        textDecoration: 'none',
      },
      '&:hover .anchor-link-style': {
        display: 'inline-block',
        padding: '0 8px',
        color: theme.palette.text.secondary,
        '&:hover': {
          color: theme.palette.text.primary,
        },
        '& svg': {
          width: '0.7em',
          height: '0.7em',
          fill: 'currentColor',
        },
      },
    },
    '& table': {
      // Trade display table for scroll overflow
      display: 'block',
      wordBreak: 'normal',
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      borderCollapse: 'collapse',
      marginBottom: '16px',
      borderSpacing: 0,
      overflow: 'hidden',
      '& .prop-name': {
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
      },
      '& .required': {
        color: theme.palette.mode === 'light' ? '#006500' : '#a5ffa5',
      },
      '& .optional': {
        color: theme.palette.type === 'light' ? '#080065' : '#a5b3ff',
      },
      '& .prop-type': {
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        color: theme.palette.mode === 'light' ? '#932981' : '#ffb6ec',
      },
      '& .prop-default': {
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        borderBottom: `1px dotted ${theme.palette.divider}`,
      },
    },
    '& td': {
      ...theme.typography.body2,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: 16,
      color: theme.palette.text.primary,
    },
    '& td code': {
      lineHeight: 1.6,
    },
    '& th': {
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: 16,
    },
    '& blockquote': {
      borderLeft: '5px solid #ffe564',
      backgroundColor: 'rgba(255,229,100,0.2)',
      padding: '4px 24px',
      margin: '24px 0',
      '& p': {
        marginTop: '16px',
      },
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      textDecorationColor: alpha(theme.palette.primary.main, 0.4),
      '&:hover': {
        textDecorationColor: 'inherit',
      },
    },
    '& a code': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.main
          : darken(theme.palette.primary.main, 0.04),
    },
    '& img, video': {
      maxWidth: '100%',
    },
    '& img': {
      // Avoid layout jump
      display: 'inline-block',
    },
    '& hr': {
      height: 1,
      margin: theme.spacing(6, 0),
      border: 0,
      flexShrink: 0,
      backgroundColor: theme.palette.divider,
    },
    '& kbd.key': {
      // Style taken from GitHub
      padding: '4px 5px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      margin: '0 1px',
      font: '11px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
      lineHeight: '10px',
      color: theme.palette.text.primary,
      verticalAlign: 'middle',
      backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '#fafbfc',
      border: `1px solid ${theme.palette.mode === 'dark' ? '#6e7681' : '#d1d5da'}`,
      borderRadius: 6,
      boxShadow: `inset 0 -1px 0 ${theme.palette.mode === 'dark' ? '#6e7681' : '#d1d5da'}`,
    },
  },
});
const defaultTheme = createTheme();
const useStyles = makeStyles(styles, { name: 'MarkdownElement', flip: false, defaultTheme });

const MarkdownElement = React.forwardRef(function MarkdownElement(props, ref) {
  const { className, renderedMarkdown, ...other } = props;
  const classes = useStyles();
  const more = {};

  if (typeof renderedMarkdown === 'string') {
    // workaround for https://github.com/facebook/react/issues/17170
    // otherwise we could just set `dangerouslySetInnerHTML={undefined}`
    more.dangerouslySetInnerHTML = { __html: renderedMarkdown };
  }

  return (
    <div
      className={clsx(classes.root, 'markdown-body', className)}
      {...more}
      {...other}
      ref={ref}
    />
  );
});

MarkdownElement.propTypes = {
  className: PropTypes.string,
  renderedMarkdown: PropTypes.string,
};

export default MarkdownElement;
