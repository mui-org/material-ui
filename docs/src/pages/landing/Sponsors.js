import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { prepareMarkdown } from '@material-ui/markdown/parseMarkdown';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';

const useStyles = makeStyles(
  (theme) => ({
    '@global': {
      '.anchor-link-style': {
        position: 'absolute',
        top: -9999,
        left: -9999,
      },
    },
    root: {
      minHeight: 600,
      textAlign: 'center',
    },
    markdownElement: {
      padding: theme.spacing(4, 0),
    },
  }),
  { name: 'Sponsors' },
);

export default function Sponsors({ docs }) {
  const classes = useStyles();
  const userLanguage = useUserLanguage();
  const { rendered } = docs[userLanguage];

  return (
    <div className={classes.root}>
      <NoSsr defer>
        <Container maxWidth="md">
          <Divider />
          {rendered.map((renderedMarkdown, index) => {
            return (
              <MarkdownElement
                key={index}
                className={classes.markdownElement}
                renderedMarkdown={renderedMarkdown}
              />
            );
          })}
        </Container>
      </NoSsr>
    </div>
  );
}

Sponsors.propTypes = {
  docs: PropTypes.object.isRequired,
};

const requireRaw = require.context('./', false, /\.md$/);

export async function getInitialProps() {
  const { docs } = prepareMarkdown({
    pageFilename: '/',
    requireRaw,
  });
  return { docs };
}
