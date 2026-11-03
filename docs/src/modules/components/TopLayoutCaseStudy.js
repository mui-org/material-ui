import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { exactProp } from '@mui/utils';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Divider from '@mui/material/Divider';

import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import AppHeader from 'docs/src/layouts/AppHeader';
import { AppContainer, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import AppFooter from 'docs/src/layouts/AppFooter';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import { RichMarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
import { pathnameToLanguage } from '@mui/internal-core-docs/helpers';
import { ROUTES } from '@mui/internal-core-docs/constants';
import { Link } from '@mui/internal-core-docs/Link';

const classes = {
  back: 'TopLayoutCaseStudy-back',
  time: 'TopLayoutCaseStudy-time',
  container: 'TopLayoutCaseStudy-container',
};

// Replicate the value used by https://medium.com/, a trusted reference.
const BLOG_MAX_WIDTH = 692;

const Root = styled('div')(
  ({ theme }) => ({
    flexGrow: 1,
    background: `linear-gradient(180deg, ${
      (theme.vars || theme).palette.grey[50]
    } 0%, #FFFFFF 100%)`,
    backgroundSize: '100% 500px',
    backgroundRepeat: 'no-repeat',
    [`& .${classes.back}`]: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(-1),
    },
    [`& .${classes.container}`]: {
      paddingTop: 60 + 20,
      marginBottom: theme.spacing(12),
      maxWidth: `calc(${BLOG_MAX_WIDTH}px + ${theme.spacing(2 * 2)})`,
      [theme.breakpoints.up('md')]: {
        maxWidth: `calc(${BLOG_MAX_WIDTH}px + ${theme.spacing(3 * 2)})`,
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: `calc(${BLOG_MAX_WIDTH}px + ${theme.spacing(8 * 2)})`,
      },
      '& h1': {
        marginBottom: theme.spacing(3),
      },
    },
    '& .markdown-body': {
      lineHeight: 1.7,
      '& img, & video': {
        border: '1px solid',
        // Avoid border to change inline style width properties
        boxSizing: 'content-box',
        borderColor: (theme.vars || theme).palette.grey[200],
        borderRadius: 8,
        display: 'block',
        margin: 'auto',
        marginBottom: 16,
      },
      '& figure': {
        margin: 0,
        padding: 0,
        marginBottom: 16,
        '& img, & video': {
          marginBottom: 8,
        },
      },
      '& figcaption': {
        color: (theme.vars || theme).palette.text.tertiary,
        fontSize: theme.typography.pxToRem(14),
        textAlign: 'center',
      },
      '& strong': {
        color: (theme.vars || theme).palette.grey[900],
      },
      '& summary': {
        padding: 8,
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightMedium,
        color: (theme.vars || theme).palette.grey[900],
      },
      '& details': {
        paddingLeft: 16,
        paddingRight: 16,
        background: alpha(theme.palette.grey[50], 0.5),
        border: '1px solid',
        borderRadius: 10,
        borderColor: (theme.vars || theme).palette.grey[200],
        transitionProperty: 'all',
        transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '200ms',
        '&:hover, &:focus-visible': {
          background: (theme.vars || theme).palette.grey[50],
          borderColor: (theme.vars || theme).palette.grey[300],
        },
      },
      '& th': {
        width: '100%',
        textAlign: 'left',
        borderBottom: `3px solid rgba(62, 80, 96, 0.2) !important`,
      },
      '& .blog-description': {
        fontSize: theme.typography.pxToRem(13),
        marginTop: 8,
        textAlign: 'center',
        color: (theme.vars || theme).palette.grey[700],
        '& a': {
          color: 'inherit',
          textDecoration: 'underline',
        },
      },
      '& .MuiCode-root + .blog-description': {
        marginTop: -20 + 8,
      },
    },
    [`& .${classes.time}`]: {
      color: (theme.vars || theme).palette.text.secondary,
      ...theme.typography.caption,
      fontWeight: 500,
    },
  }),
  ({ theme }) =>
    theme.applyDarkStyles({
      background: `linear-gradient(180deg, ${alpha(theme.palette.primary[900], 0.2)} 0%, ${
        (theme.vars || theme).palette.primaryDark[900]
      } 100%)`,
      backgroundSize: '100% 1000px',
      backgroundRepeat: 'no-repeat',
      '& .markdown-body': {
        '& strong': {
          color: (theme.vars || theme).palette.grey[100],
        },
        '& summary': {
          color: (theme.vars || theme).palette.grey[300],
        },
        '& img, & video': {
          borderColor: alpha(theme.palette.primaryDark[600], 0.5),
        },
        '& details': {
          background: alpha(theme.palette.primary[900], 0.3),
          borderColor: (theme.vars || theme).palette.primaryDark[700],
          '&:hover, &:focus-visible': {
            background: alpha(theme.palette.primary[900], 0.4),
            borderColor: (theme.vars || theme).palette.primaryDark[500],
          },
        },
        '& .blog-description': {
          color: (theme.vars || theme).palette.grey[500],
        },
      },
    }),
);

export default function TopLayoutCaseStudy(props) {
  const { className, docs, demos, demoComponents, srcComponents } = props;
  const { description, rendered, title, headers } = docs.en;
  const finalTitle = title || headers.title;
  const router = useRouter();
  const slug = router.pathname.replace(/(.*)\/(.*)/, '$2');
  const { canonicalAsServer } = pathnameToLanguage(router.asPath);
  const card = `/static/blog/${slug}/card.png`;

  // Guard with NEXT_RUNTIME so this check is dead-code-eliminated from client bundles.
  if (process.env.NEXT_RUNTIME) {
    if (headers.manualCard === undefined) {
      throw new Error(
        [
          `MUI: the "manualCard" markdown header for the blog post "${slug}" is missing.`,
          `Set manualCard: true or manualCard: false header in docs/pages/blog/${slug}.md.`,
        ].join('\n'),
      );
    }
  }

  return (
    <BrandingCssVarsProvider>
      <AppHeader />
      <Head
        title={`${finalTitle} - MUI`}
        description={description}
        largeCard
        disableAlternateLocale
        card={card}
        type="article"
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              publisher: {
                '@type': 'Organization',
                name: 'MUI blog',
                url: 'https://mui.com/blog/',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://mui.com/static/icons/512x512.png',
                },
              },
              headline: finalTitle,
              url: `https://mui.com${canonicalAsServer}`,
              image: {
                '@type': 'ImageObject',
                url: card,
                width: 1280,
                height: 640,
              },
              keywords: headers.tags.join(', '),
              description,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://mui.com/blog/',
              },
            }),
          }}
        />
      </Head>
      <Root className={className}>
        <AppContainer component="main" className={classes.container}>
          <Link
            href={ROUTES.customers}
            {...(ROUTES.customers.startsWith('http') && {
              rel: 'nofollow',
            })}
            variant="body2"
            className={classes.back}
            sx={{ color: 'primary' }}
          >
            <ChevronLeftRoundedIcon fontSize="small" sx={{ mr: 0.5 }} />
            {'Back'}
          </Link>
          {rendered.map((chunk, index) => {
            return (
              <RichMarkdownElement
                key={index}
                demos={demos}
                demoComponents={demoComponents}
                srcComponents={srcComponents}
                renderedMarkdown={chunk}
                disableAd
                localizedDoc={docs.en}
                renderedMarkdownOrDemo={chunk}
              />
            );
          })}
        </AppContainer>
        <Divider />
        <HeroEnd />
        <Divider />
        <AppFooter />
      </Root>
    </BrandingCssVarsProvider>
  );
}

TopLayoutCaseStudy.propTypes = {
  className: PropTypes.string,
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  docs: PropTypes.object.isRequired,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  TopLayoutCaseStudy.propTypes = exactProp(TopLayoutCaseStudy.propTypes);
}
