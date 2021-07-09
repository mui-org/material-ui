import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { exactProp } from '@material-ui/utils';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';

const DeferredAppLayoutDocsFooter = React.lazy(() =>
  import('docs/src/modules/components/AppLayoutDocsFooter'),
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ad: {
    '& .description': {
      marginBottom: 198,
    },
    '& .description.ad': {
      marginBottom: 40,
    },
  },
  toc: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 175px)',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 175px - 240px)',
    },
  },
  disableToc: {
    [theme.breakpoints.up('lg')]: {
      marginRight: '5%',
    },
  },
}));

function AppLayoutDocs(props) {
  const {
    children,
    description,
    disableAd = false,
    disableToc = false,
    location,
    title,
    toc,
  } = props;
  const classes = useStyles();

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  return (
    <AppFrame>
      <AdManager>
        <Head title={`${title} - Material-UI`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad placement="body" />
          </AdGuest>
        )}
        <div
          className={clsx(classes.root, {
            [classes.ad]: !disableAd,
            [classes.toc]: !disableToc,
            [classes.disableToc]: disableToc,
          })}
        >
          <AppContainer className={classes.container}>
            <div className={classes.actions}>
              {location && <EditPage markdownLocation={location} />}
            </div>
            {children}
            <React.Suspense fallback={null}>
              <DeferredAppLayoutDocsFooter />
            </React.Suspense>
          </AppContainer>
        </div>
        <React.Suspense fallback={null}>
          {disableToc ? null : <AppTableOfContents items={toc} />}
        </React.Suspense>
      </AdManager>
    </AppFrame>
  );
}

AppLayoutDocs.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  disableAd: PropTypes.bool.isRequired,
  disableToc: PropTypes.bool.isRequired,
  location: PropTypes.string,
  title: PropTypes.string.isRequired,
  toc: PropTypes.array.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  AppLayoutDocs.propTypes = exactProp(AppLayoutDocs.propTypes);
}

export default AppLayoutDocs;
