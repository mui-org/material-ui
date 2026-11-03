import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { exactProp } from '@mui/utils';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import AppHeader from 'docs/src/layouts/AppHeader';
import { AppContainer, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import AppFooter from 'docs/src/layouts/AppFooter';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import { MarkdownElement, RichMarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
import { pathnameToLanguage } from '@mui/internal-core-docs/helpers';
import { ROUTES } from '@mui/internal-core-docs/constants';
import { Link } from '@mui/internal-core-docs/Link';

export const authors = {
  oliviertassinari: {
    name: 'Olivier Tassinari',
    avatar: 'https://avatars.githubusercontent.com/u/3165635',
    github: 'oliviertassinari',
  },
  mbrookes: {
    name: 'Matt Brookes',
    avatar: 'https://avatars.githubusercontent.com/u/357702',
    github: 'mbrookes',
  },
  eps1lon: {
    name: 'Sebastian Silbermann',
    avatar: 'https://avatars.githubusercontent.com/u/12292047',
    github: 'eps1lon',
  },
  mnajdova: {
    name: 'Marija Najdova',
    avatar: 'https://avatars.githubusercontent.com/u/4512430',
    github: 'mnajdova',
  },
  michaldudak: {
    name: 'Michał Dudak',
    avatar: 'https://avatars.githubusercontent.com/u/4696105',
    github: 'michaldudak',
  },
  siriwatknp: {
    name: 'Siriwat Kunaporn',
    avatar: 'https://avatars.githubusercontent.com/u/18292247',
    github: 'siriwatknp',
  },
  'danilo-leal': {
    name: 'Danilo Leal',
    avatar: 'https://avatars.githubusercontent.com/u/67129314',
    github: 'danilo-leal',
  },
  m4theushw: {
    name: 'Matheus Wichman',
    avatar: 'https://avatars.githubusercontent.com/u/42154031',
    github: 'm4theushw',
  },
  flaviendelangle: {
    name: 'Flavien Delangle',
    avatar: 'https://avatars.githubusercontent.com/u/3309670',
    github: 'flaviendelangle',
  },
  DanailH: {
    name: 'Danail Hadjiatanasov',
    avatar: 'https://avatars.githubusercontent.com/u/5858539',
    github: 'DanailH',
  },
  alexfauquette: {
    name: 'Alexandre Fauquette',
    avatar: 'https://avatars.githubusercontent.com/u/45398769',
    github: 'alexfauquette',
  },
  samuelsycamore: {
    name: 'Sam Sycamore',
    avatar: 'https://avatars.githubusercontent.com/u/71297412',
    github: 'samuelsycamore',
  },
  josefreitas: {
    name: 'José Freitas',
    avatar: 'https://avatars.githubusercontent.com/u/550141',
    github: 'joserodolfofreitas',
  },
  cherniavskii: {
    name: 'Andrew Cherniavskyi',
    avatar: 'https://avatars.githubusercontent.com/u/13808724',
    github: 'cherniavskii',
  },
  mikailaread: {
    name: 'Mikaila Read',
    avatar: 'https://avatars.githubusercontent.com/u/76401606',
    github: 'mikailaread',
  },
  prakhargupta: {
    name: 'Prakhar Gupta',
    avatar: 'https://avatars.githubusercontent.com/u/92228082',
    github: 'prakhargupta1',
  },
  richbustos: {
    name: 'Rich Bustos',
    avatar: 'https://avatars.githubusercontent.com/u/92274722',
    github: 'richbustos',
  },
  colmtuite: {
    name: 'Colm Tuite',
    avatar: 'https://avatars.githubusercontent.com/u/805073',
    github: 'colmtuite',
  },
  diegoandai: {
    name: 'Diego Andai',
    avatar: 'https://avatars.githubusercontent.com/u/16889233',
    github: 'DiegoAndai',
  },
  alelthomas: {
    name: 'Ale Thomas',
    avatar: 'https://avatars.githubusercontent.com/u/93217218',
    github: 'alelthomas',
  },
  DavidCnoops: {
    name: 'David Cnoops',
    avatar: 'https://avatars.githubusercontent.com/u/28001064',
    github: 'DavidCnoops',
  },
  brijeshb42: {
    name: 'Brijesh Bittu',
    avatar: 'https://avatars.githubusercontent.com/u/717550?',
    github: 'brijeshb42',
  },
  aarongarciah: {
    name: 'Aarón García',
    avatar: 'https://avatars.githubusercontent.com/u/7225802?',
    github: 'aarongarciah',
  },
  zanivan: {
    name: 'Victor Zanivan Monteiro',
    avatar: 'https://avatars.githubusercontent.com/u/37222944?',
    github: 'zanivan',
  },
  romgrk: {
    name: 'Romain Gregoire',
    avatar: 'https://avatars.githubusercontent.com/u/1423607',
    github: 'romgrk',
  },
  arminmeh: {
    name: 'Armin Mehinović',
    avatar: 'https://avatars.githubusercontent.com/u/4390250',
    github: 'arminmeh',
  },
  janpot: {
    name: 'Jan Potoms',
    avatar: 'https://avatars.githubusercontent.com/u/2109932',
    github: 'Janpot',
  },
  nadjakovacev: {
    name: 'Nadja Kovacev',
    avatar: 'https://avatars.githubusercontent.com/u/159806370',
    github: 'nadjakovacev',
  },
  raffaellaluzi: {
    name: 'Raffaella Luzi',
    avatar: 'https://avatars.githubusercontent.com/u/136349774',
    github: 'rluzists1',
  },
  bernardobelchior: {
    name: 'Bernardo Belchior',
    avatar: 'https://avatars.githubusercontent.com/u/12778398',
    github: 'bernardobelchior',
  },
};

const classes = {
  back: 'TopLayoutBlog-back',
  time: 'TopLayoutBlog-time',
  container: 'TopLayoutBlog-container',
};

// Replicate the value used by https://medium.com/, a trusted reference.
const BLOG_MAX_WIDTH = 692;

const AuthorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(2),
  '& .author': {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3),
    '& .MuiAvatar-root': {
      marginRight: theme.spacing(1),
    },
  },
}));

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
        objectFit: 'cover',
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

export default function TopLayoutBlog(props) {
  const { className, docs, demos, demoComponents, srcComponents } = props;
  const { description, rendered, title, headers } = docs.en;
  const finalTitle = title || headers.title;
  const router = useRouter();
  const slug = router.pathname.replace(/(.*)\/(.*)/, '$2');
  const { canonicalAsServer } = pathnameToLanguage(router.asPath);
  const card =
    headers.manualCard === 'true'
      ? `/static/blog/${slug}/card.png`
      : `/edge-functions/og-image/?title=${headers.cardTitle || finalTitle}&authors=${headers.authors
          .map((author) => {
            const { github, name } = authors[author];
            return `${name} @${github}`;
          })
          .join(',')}&product=Blog`;

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
        <meta name="author" content={headers.authors.map((key) => authors[key].name).join(', ')} />
        <meta property="article:published_time" content={headers.date} />
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
              author: {
                '@type': 'Person',
                name: authors[headers.authors[0]].name,
                image: {
                  '@type': 'ImageObject',
                  url: `${authors[headers.authors[0]].avatar}?s=${250}`,
                  width: 250,
                  height: 250,
                },
                sameAs: [`https://github.com/${authors[headers.authors[0]].github}`],
              },
              headline: finalTitle,
              url: `https://mui.com${canonicalAsServer}`,
              datePublished: headers.date,
              dateModified: headers.date,
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
            href={ROUTES.blog}
            {...(ROUTES.blog.startsWith('http') && {
              rel: 'nofollow',
            })}
            variant="body2"
            className={classes.back}
            sx={{ color: 'primary' }}
          >
            <ChevronLeftRoundedIcon fontSize="small" sx={{ mr: 0.5 }} />
            {'Back to blog'}
          </Link>
          {headers.title ? (
            <React.Fragment>
              {/*
                Depending on the timezone, the display date can change from one day to another.
                e.g. Sunday vs. Monday
                TODO: Move the date formatting to the server.
              */}
              <time dateTime={headers.date} className={classes.time}>
                {new Intl.DateTimeFormat('en', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).format(new Date(headers.date))}
              </time>
              <MarkdownElement>
                <h1>{headers.title}</h1>
              </MarkdownElement>
              <AuthorsContainer>
                {headers.authors.map((author) => (
                  <div key={author} className="author">
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      alt=""
                      src={`${authors[author].avatar}?s=${36}`}
                      srcSet={`${authors[author].avatar}?s=${36 * 2} 2x, ${
                        authors[author].avatar
                      }?s=${36 * 3} 3x`}
                    />
                    <div>
                      <Typography variant="body2" sx={{ fontWeight: '500' }}>
                        {authors[author].name}
                      </Typography>
                      <Link
                        href={`https://github.com/${authors[author].github}`}
                        target="_blank"
                        variant="body2"
                        sx={{ color: 'primary', fontWeight: 500 }}
                      >
                        @{authors[author].github}
                      </Link>
                    </div>
                  </div>
                ))}
              </AuthorsContainer>
            </React.Fragment>
          ) : null}
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

TopLayoutBlog.propTypes = {
  className: PropTypes.string,
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  docs: PropTypes.object.isRequired,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  TopLayoutBlog.propTypes = exactProp(TopLayoutBlog.propTypes);
}
