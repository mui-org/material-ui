import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { styled, createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { renderInline as renderInlineMarkdown } from '@material-ui/markdown';

const ErrorMessageSection = styled('div')({
  // reset display: block from Demo
  display: 'block',
});

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      boxShadow: theme.shadows['2'],
      color: theme.palette.error.main,
      padding: theme.spacing(1, 2),
    },
  }),
  { defaultTheme },
);

const ErrorMessageMarkdown = (props) => {
  const { className, ...other } = props;
  const classes = useStyles();

  return <MarkdownElement className={clsx(classes.root, className)} {...other} />;
};

ErrorMessageMarkdown.propTypes = {
  className: PropTypes.string,
};

export default function ErrorDecoder() {
  const {
    query: { code, ...query },
  } = useRouter();
  const queryArgs = query['args[]'];
  const args = React.useMemo(
    () => (Array.isArray(queryArgs) ? queryArgs : [queryArgs]),
    [queryArgs],
  );

  const [data, dispatch] = React.useReducer(
    (previousState, action) => {
      switch (action.type) {
        case 'rejected':
          return { errorCodes: null, state: 'rejected' };
        case 'resolved':
          return {
            errorCodes: action.payload,
            state: 'resolved',
          };
        default:
          throw new Error(`We made a mistake passing an unknown action.`);
      }
    },
    { errorCodes: null, state: 'loading' },
  );

  React.useEffect(() => {
    let cancelled = false;

    fetch('/static/error-codes.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (cancelled === false) {
          dispatch({ type: 'resolved', payload: json });
        }
      })
      .catch(() => {
        dispatch({ type: 'rejected' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const errorMessage = React.useMemo(() => {
    const rawMessage = data.errorCodes?.[code];
    if (rawMessage === undefined) {
      return undefined;
    }

    let replacementIndex = -1;
    const readableMessage = rawMessage.replace(/%s/g, () => {
      replacementIndex += 1;
      const dangerousArgument = args[replacementIndex];
      if (dangerousArgument === undefined) {
        return '[missing argument]';
      }
      // String will be injected into innerHTML.
      // We need to escape first
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations
      const div = document.createElement('div');
      div.innerText = dangerousArgument;
      return div.innerHTML;
    });

    return renderInlineMarkdown(readableMessage);
  }, [args, code, data.errorCodes]);

  if (data.state === 'loading') {
    return <Typography>Loading error codes</Typography>;
  }

  if (data.state === 'rejected') {
    return (
      <Typography color="error">
        Seems like we&apos;re having some issues loading the original message. Try
        reloading the page. If the error persists please report this isse on our{' '}
        <Link
          href="https://github.com/mui-org/material-ui/issues/new?template=1.bug.md"
          target="_blank"
        >
          issue tracker
        </Link>
        .
      </Typography>
    );
  }

  if (errorMessage === undefined) {
    return (
      <Typography>
        When you encounter an error, you&apos;ll receive a link to this page for that
        specific error and we&apos;ll show you the full error text.
      </Typography>
    );
  }

  return (
    <ErrorMessageSection>
      <p>The original text of the error you encountered:</p>
      <ErrorMessageMarkdown renderedMarkdown={errorMessage} />
    </ErrorMessageSection>
  );
}
