import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { exactProp } from '@material-ui/utils';
import NoSsr from '@material-ui/core/NoSsr';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import AppLayoutDocsFooter from 'docs/src/modules/components/AppLayoutDocsFooter';

const TOC_WIDTH = 175;
const NAV_WIDTH = 240;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ disableToc, theme }) => {
  return {
    display: 'flex',
    width: '100%',
    ...(disableToc && {
      [theme.breakpoints.up('lg')]: {
        marginRight: '5%',
      },
    }),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH}px)`,
    },
  };
});

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) => prop !== 'disableAd' && prop !== 'disableToc',
})(({ disableAd, disableToc, theme }) => {
  return {
    position: 'relative',
    ...(!disableAd && {
      '& .description': {
        marginBottom: 198,
      },
      '& .description.ad': {
        marginBottom: 40,
      },
      ...(!disableToc && {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${TOC_WIDTH}px)`,
        },
      }),
    }),
  };
});

const ActionsDiv = styled('div')({
  position: 'absolute',
  right: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

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
        <Main disableToc={disableToc}>
          <StyledAppContainer disableAd={disableAd} disableToc={disableToc}>
            <ActionsDiv>{location && <EditPage markdownLocation={location} />}</ActionsDiv>
            {children}
            <NoSsr>
              <AppLayoutDocsFooter />
            </NoSsr>
          </StyledAppContainer>
          {disableToc ? null : <AppTableOfContents items={toc} />}
        </Main>
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
