import * as React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Chip from '@mui/material/Chip';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import { authors as AUTHORS } from 'docs/src/modules/components/TopLayoutBlog';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import { Link } from '@mui/internal-core-docs/Link';
import generateRssFeed from 'docs/scripts/generateRSSFeed';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import type { BlogPost } from 'docs/lib/sourcing';
import { getAllBlogPosts } from 'docs/lib/sourcing';

export const getStaticProps = () => {
  const data = getAllBlogPosts();
  generateRssFeed(data.allBlogPosts);
  return {
    props: data,
  };
};

const blogDateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC',
});

function formatBlogDate(dateString: string) {
  // Frontmatter dates can be plain YYYY-MM-DD; pin to UTC to avoid timezone drift.
  const normalizedDate = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ? `${dateString}T00:00:00.000Z`
    : dateString;

  return blogDateFormatter.format(new Date(normalizedDate));
}

function PostPreview(props: BlogPost) {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
        {props.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            variant="outlined"
            color="primary"
            sx={(theme) => ({
              height: 22,
              fontWeight: 'medium',
              fontSize: theme.typography.pxToRem(13),
              '& .MuiChip-label': {
                px: '6px',
              },
              ...theme.applyDarkStyles({
                color: (theme.vars || theme).palette.grey[200],
              }),
            })}
          />
        ))}
      </Box>
      <Typography component="h2" variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
        <Link
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}/`}
          sx={{
            color: 'text.primary',

            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {props.title}
        </Link>
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 'auto' }}>{props.description}</Typography>
      {props.authors && (
        <AvatarGroup
          sx={(theme) => ({
            mt: 2,
            mb: 1,
            alignSelf: 'flex-start',
            '& .MuiAvatar-circular': {
              width: 28,
              height: 28,
              fontSize: theme.typography.pxToRem(13),
              fontWeight: theme.typography.fontWeightSemiBold,
              color: (theme.vars || theme).palette.text.primary,
              border: `1px solid ${(theme.vars || theme).palette.divider}`,
              outline: '3px solid',
              outlineColor: '#FFF',
              backgroundColor: (theme.vars || theme).palette.grey[100],
            },
            ...theme.applyDarkStyles({
              '& .MuiAvatar-circular': {
                outlineColor: (theme.vars || theme).palette.primaryDark[900],
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
              },
            }),
          })}
        >
          {(props.authors as Array<keyof typeof AUTHORS>).map((author) => (
            <Avatar
              key={author}
              alt=""
              src={`${AUTHORS[author].avatar}?s=${28}`}
              srcSet={`${AUTHORS[author].avatar}?s=${28 * 2} 2x, ${AUTHORS[author].avatar}?s=${
                28 * 3
              } 3x`}
            />
          ))}
        </AvatarGroup>
      )}
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {props.authors && (
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {props.authors
                .slice(0, 3)
                .map((userId) => {
                  const name = AUTHORS[userId as keyof typeof AUTHORS]?.name;
                  if (name) {
                    if (props.authors && props.authors.length > 1) {
                      // display only firstName
                      return name.split(' ')[0];
                    }
                    return name;
                  }
                  return userId;
                })
                .join(', ')}
              {props.authors.length > 2 && ', and more.'}
            </Typography>
          )}
          {props.date && (
            <Typography variant="caption" sx={{ fontWeight: 'regular', color: 'text.tertiary' }}>
              {formatBlogDate(props.date)}
            </Typography>
          )}
        </Box>
        <Button
          component={Link}
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          id={`describe-${props.slug}`}
          endIcon={<KeyboardArrowRightRoundedIcon />}
          size="small"
          sx={{ mt: { xs: 0.5, md: 0 }, p: { xs: 0, sm: '6px 8px' } }}
        >
          Read more
        </Button>
      </Box>
    </React.Fragment>
  );
}

const PAGE_SIZE = 7;

export default function Blog(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const postListRef = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState(0);
  const [selectedTags, setSelectedTags] = React.useState<Record<string, boolean>>({});
  const { allBlogPosts } = props;

  // On the `/blog` index we:
  // - show the v9 aggregator card (see FEATURED_BLOG_SLUG)
  // - optionally show one additional recent card
  // All posts remain fully discoverable by direct URL and RSS.
  const FEATURED_BLOG_SLUG = 'introducing-mui-v9';
  const featuredPosts = allBlogPosts.filter((post) => post.slug === FEATURED_BLOG_SLUG);

  const visibleNonFeaturedPosts = allBlogPosts.filter((post) => {
    if (post.slug === FEATURED_BLOG_SLUG) {
      return false;
    }
    if (post.hideFromHomeList === 'true') {
      return false;
    }
    return true;
  });

  const topPosts = [...featuredPosts, ...visibleNonFeaturedPosts.slice(0, 1)];
  const otherPosts = visibleNonFeaturedPosts.slice(1);
  const tagInfo: Record<string, number> = {};
  otherPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagInfo[tag] = (tagInfo[tag] || 0) + 1;
    });
  });
  const filteredPosts = otherPosts.filter((post) => {
    if (Object.keys(selectedTags).length === 0) {
      return true;
    }

    return post.tags.some((tag) => {
      return Object.keys(selectedTags).includes(tag);
    });
  });
  const pageStart = page * PAGE_SIZE;
  const totalPage = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const displayedPosts = filteredPosts.slice(pageStart, pageStart + PAGE_SIZE);
  const getTags = React.useCallback(() => {
    const { tags = '' } = router.query;
    return (typeof tags === 'string' ? tags.split(',') : tags || [])
      .map((str) => str.trim())
      .filter((tag) => !!tag);
  }, [router.query]);

  React.useEffect(() => {
    const arrayTags = getTags();
    const finalTags: Record<string, boolean> = {};
    arrayTags.forEach((tag) => {
      finalTags[tag] = true;
    });
    setSelectedTags(finalTags);
    setPage(0);
  }, [getTags]);

  const removeTag = (tag: string) => {
    router.push(
      {
        query: {
          ...router.query,
          tags: getTags().filter((value) => value !== tag),
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <BrandingCssVarsProvider>
      <Head
        title="Blog - MUI"
        description="Follow the MUI blog to learn about new product features, latest advancements in UI development, and business initiatives."
        card="/static/social-previews/blog-preview.jpg"
        disableAlternateLocale
      />
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <Section cozy bg="gradient">
          <SectionHeadline
            alwaysCenter
            overline="Blog"
            title={
              <Typography variant="h2" component="h1">
                Stay <GradientText>in the loop</GradientText> with
                <br /> the latest about MUI&apos;s products
              </Typography>
            }
          />
        </Section>
        <Divider />
        <Container sx={{ mt: { xs: 2, sm: -6 } }}>
          <Box
            component="ul"
            sx={{
              display: 'grid',
              m: 0,
              p: 0,
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {topPosts.map((post) => (
              <Paper
                key={post.slug}
                component="li"
                variant="outlined"
                sx={(theme) => ({
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundImage: (theme.vars || theme).palette.gradients.radioSubtle,
                  boxShadow: '0 4px 12px rgba(170, 180, 190, 0.2)',
                  ...theme.applyDarkStyles({
                    background: (theme.vars || theme).palette.primaryDark[900],
                    backgroundImage: (theme.vars || theme).palette.gradients.radioSubtle,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                  }),
                })}
              >
                {post.image && (
                  <Box
                    component="img"
                    src={post.image}
                    sx={{
                      aspectRatio: '16 / 9',
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                )}
                <PostPreview {...post} />
              </Paper>
            ))}
          </Box>
        </Container>
        {otherPosts.length > 0 && (
          <Container
            ref={postListRef}
            sx={{
              py: { xs: 4, sm: 6, md: 8 },
              mt: -6,
              display: 'grid',
              gridTemplateColumns: { md: '1fr 380px' },
              columnGap: 8,
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              sx={{ fontWeight: 'semiBold', mb: { xs: 1, sm: 2 }, mt: 8 }}
            >
              Posts{' '}
              {Object.keys(selectedTags).length ? (
                <span>
                  tagged as{' '}
                  <Typography component="span" variant="inherit" color="primary" noWrap>
                    &quot;{Object.keys(selectedTags)[0]}&quot;
                  </Typography>
                </span>
              ) : (
                ''
              )}
            </Typography>
            <Box sx={{ gridRow: 'span 2' }}>
              <Box
                sx={{
                  position: 'sticky',
                  top: 90,
                  mt: { xs: 0, md: 9 },
                  mb: { xs: 2, md: 0 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  '& .MuiPaper-root': {
                    p: 2,
                    bgcolor: 'transparent',
                    borderColor: 'divider',
                  },
                }}
              >
                <Paper variant="outlined">
                  <Typography
                    component="h3"
                    variant="subtitle2"
                    sx={{ color: 'text.primary', fontWeight: 'semiBold', mb: 2 }}
                  >
                    Filter posts by tag
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {Object.keys(tagInfo).map((tag) => {
                      const selected = !!selectedTags[tag];
                      return (
                        <Chip
                          key={tag}
                          variant={selected ? 'filled' : 'outlined'}
                          color={selected ? 'primary' : undefined}
                          {...(selected
                            ? {
                                label: tag,
                                onDelete: () => {
                                  postListRef.current?.scrollIntoView();
                                  removeTag(tag);
                                },
                              }
                            : {
                                label: tag,
                                onClick: () => {
                                  postListRef.current?.scrollIntoView();
                                  router.push(
                                    {
                                      query: {
                                        ...router.query,
                                        tags: tag,
                                      },
                                    },
                                    undefined,
                                    { shallow: true },
                                  );
                                },
                              })}
                          size="small"
                        />
                      );
                    })}
                  </Box>
                </Paper>
                <Paper variant="outlined">
                  <Typography
                    component="h3"
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: 'text.primary', fontWeight: 'semiBold' }}
                  >
                    Want to hear more from us?
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Get up to date with everything MUI-related through our social media:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, '* > svg': { mr: 1 } }}>
                    <Link href="https://github.com/mui" target="_blank" sx={{ fontSize: 14 }}>
                      <GitHubIcon fontSize="small" />
                      GitHub
                    </Link>
                    <Link href="https://x.com/MUI_hq" target="_blank" sx={{ fontSize: 14 }}>
                      <XIcon fontSize="small" />X
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/mui/"
                      target="_blank"
                      sx={{ fontSize: 14 }}
                    >
                      <LinkedInIcon fontSize="small" />
                      LinkedIn
                    </Link>
                    <Link
                      href="https://www.youtube.com/@MUI_hq"
                      target="_blank"
                      sx={{ fontSize: 14 }}
                    >
                      <YouTubeIcon fontSize="small" />
                      Youtube
                    </Link>
                  </Box>
                </Paper>
              </Box>
            </Box>
            <div>
              <Box component="ul" sx={{ p: 0, m: 0 }}>
                {displayedPosts.map((post) => (
                  <Box
                    component="li"
                    key={post.slug}
                    sx={{
                      py: 2.5,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      '&:not(:last-of-type)': {
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      },
                    }}
                  >
                    <PostPreview {...post} />
                  </Box>
                ))}
              </Box>
              {totalPage > 0 && (
                <Pagination
                  page={page + 1}
                  count={totalPage}
                  variant="outlined"
                  shape="rounded"
                  onChange={(_, value) => {
                    setPage(value - 1);
                    postListRef.current?.scrollIntoView();
                  }}
                  sx={{ mt: 1, mb: 4 }}
                />
              )}
            </div>
          </Container>
        )}
      </main>
      <Divider />
      <HeroEnd />
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
