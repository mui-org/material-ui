import * as React from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { CodeProviderLazy } from '@mui/internal-docs-infra/CodeProvider';
import { createEnhanceCodeEmphasis } from '@mui/internal-docs-infra/pipeline/enhanceCodeEmphasis';
import { AdManager, AD_MARGIN_TOP, AD_HEIGHT, AD_HEIGHT_MOBILE, AD_MARGIN_BOTTOM } from '../../Ad';
import { AppFrame } from './AppFrame';
import { AppContainer } from './AppContainer';
import { AppLayoutDocsFooter } from './AppLayoutDocsFooter';
import { AppLayoutHead as Head } from './AppLayoutHead';
import { BackToTop } from '../components/BackToTop';
import { convertProductIdToName } from '../../utils/convertProductIdToName';
import { getProductInfoFromUrl } from '../../utils/getProductInfoFromUrl';
import { TOC_WIDTH, AppTableOfContents } from '../../TableOfContents';
import type { TocItem } from '../../TableOfContents';

// Opt in to the `data-frame-indent` attribute that DemoContent's CSS uses
// to shift highlighted/focus frames left when collapsed. This mirrors the
// `emphasisOptions` configured for the build-time loader in next.config.ts
// so runtime-highlighted source (e.g. on variant switch) behaves the same.
const sourceEnhancers = [createEnhanceCodeEmphasis({ emitFrameIndent: true })];

interface MainProps {
  disableToc: boolean;
  wideLayout: boolean;
}

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc' && prop !== 'wideLayout',
})<MainProps>(({ theme }) => ({
  minHeight: '100vh',
  display: 'grid',
  width: '100%',
  '& .markdown-body .comment-link': {
    display: 'flex',
  },
  variants: [
    {
      props: ({ disableToc, wideLayout }) => !disableToc && !wideLayout,
      style: {
        [theme.breakpoints.up('sm')]: {
          gridTemplateColumns: '1fr auto',
        },
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: `1fr ${TOC_WIDTH}px`,
        },
      },
    },
    {
      props: ({ disableToc, wideLayout }) => !disableToc && wideLayout,
      style: {
        [theme.breakpoints.up('sm')]: {
          gridTemplateColumns: '1fr auto',
        },
        [`@media (min-width:${theme.breakpoints.values.xl + TOC_WIDTH}px)`]: {
          gridTemplateColumns: `1fr ${TOC_WIDTH}px`,
        },
      },
    },
  ],
}));

interface StyledAppContainerProps {
  disableAd: boolean;
  hasTabs: boolean;
  disableToc: boolean;
  wideLayout: boolean;
}

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) =>
    prop !== 'disableAd' && prop !== 'hasTabs' && prop !== 'disableToc' && prop !== 'wideLayout',
})<StyledAppContainerProps>(({ theme }) => {
  return {
    position: 'relative',
    // By default, a grid item cannot be smaller than the size of its content.
    // https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
    minWidth: 0,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '60px',
      paddingRight: '60px',
    },
    variants: [
      {
        props: ({ disableToc, wideLayout }) => disableToc && !wideLayout,
        style: {
          // 105ch ≈ 930px
          maxWidth: `calc(105ch + ${TOC_WIDTH / 2}px)`,
        },
      },
      {
        props: ({ disableToc, wideLayout }) => disableToc && wideLayout,
        style: {
          maxWidth: theme.breakpoints.values.xl,
          '& p, & li': {
            maxWidth: '105ch',
          },
        },
      },
      {
        props: ({ disableToc, wideLayout }) => !disableToc && !wideLayout,
        style: {
          // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
          fontFamily: 'Arial',
          // 105ch ≈ 930px
          maxWidth: '105ch',
        },
      },
      {
        props: ({ disableToc, wideLayout }) => !disableToc && wideLayout,
        style: {
          maxWidth: theme.breakpoints.values.xl,
          '& p, & li': {
            maxWidth: '105ch',
          },
        },
      },
      {
        props: ({ disableAd, hasTabs }) => !disableAd && hasTabs,
        style: {
          '&& .component-tabs .MuiTabs-root': {
            // 40px matches MarkdownElement h2 margin-top.
            marginBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT_MOBILE}px + 40px)`,
            [theme.breakpoints.up('sm')]: {
              marginBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT}px + 40px)`,
            },
          },
          '&& .component-tabs.ad .MuiTabs-root': {
            marginBottom: 0,
          },
        },
      },
      {
        props: ({ disableAd, hasTabs }) => !disableAd && !hasTabs,
        style: {
          '&& .description': {
            marginBottom: theme.spacing(AD_MARGIN_BOTTOM),
            paddingBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT_MOBILE}px)`,
            [theme.breakpoints.up('sm')]: {
              paddingBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT}px)`,
            },
          },
          '&& .description.ad': {
            paddingBottom: 0,
            marginBottom: 0,
          },
        },
      },
    ],
  };
});

export interface AppLayoutDocsProps {
  BannerComponent?: React.ElementType;
  cardOptions?: {
    description?: string;
    title?: string;
  };
  children: React.ReactNode;
  description: string;
  disableAd: boolean;
  disableLayout?: boolean;
  disableToc: boolean;
  hasTabs?: boolean;
  location: string;
  title: string;
  toc: TocItem[];
  wideLayout?: boolean;
}

export function AppLayoutDocs(props: AppLayoutDocsProps) {
  const router = useRouter();
  const {
    BannerComponent,
    cardOptions,
    children,
    description,
    disableAd = false,
    // TODO, disableLayout should be the default, retaining the layout between pages
    // improves the UX. It's faster to transition, and you don't lose UI states, like scroll.
    disableLayout = false,
    disableToc = false,
    wideLayout = false,
    hasTabs = false,
    location,
    title,
    toc,
  } = props;

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const productName = convertProductIdToName(getProductInfoFromUrl(router.asPath));
  if (!productName) {
    console.error('productName mapping missing for', router.asPath);
  }

  const Layout = disableLayout ? React.Fragment : AppFrame;
  const layoutProps = disableLayout ? {} : { BannerComponent };

  const card = `/edge-functions/og-image?product=${productName}&title=${cardOptions?.title ?? title}&description=${cardOptions?.description ?? description}`;
  return (
    <Layout {...layoutProps}>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-navDrawer-width': '300px',
          },
        }}
      />
      <AdManager {...(hasTabs && { classSelector: '.component-tabs' })}>
        <Head
          title={`${title}${productName ? ` - ${productName}` : ''}`}
          description={description}
          card={card}
        />
        <Main disableToc={disableToc} wideLayout={wideLayout}>
          {/*
            Render the TOCs first to avoid layout shift when the HTML is streamed.
            See https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/ for more details.
          */}
          <StyledAppContainer
            disableAd={disableAd}
            hasTabs={hasTabs}
            disableToc={disableToc}
            wideLayout={wideLayout}
          >
            <CodeProviderLazy sourceEnhancers={sourceEnhancers}>{children}</CodeProviderLazy>
            <AppLayoutDocsFooter tableOfContents={toc} location={location} />
          </StyledAppContainer>
          {disableToc ? null : <AppTableOfContents toc={toc} wideLayout={wideLayout} />}
          <BackToTop />
        </Main>
      </AdManager>
    </Layout>
  );
}
