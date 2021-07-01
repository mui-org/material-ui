import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InLabIcon from 'docs/src/modules/branding/icons/InLab';
import WorkInProgressIcon from 'docs/src/modules/branding/icons/WorkInProgress';
import PlanningBuildIcon from 'docs/src/modules/branding/icons/PlanningBuild';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';
import BrandingDiscoverMore from 'docs/src/modules/branding/BrandingDiscoverMore';
import MaterialUixCard from 'docs/src/modules/branding/MaterialUixCard';
import CommunitySayCard from 'docs/src/modules/branding/CommunitySayCard';
import Link from 'docs/src/modules/components/Link';
import RoadMapDetailCard from 'docs/src/modules/branding/RoadMapDetailCard';
import ExclusiveFeaturesCard from 'docs/src/modules/branding/ExclusiveFeaturesCard';
import MaterialUixImage from 'docs/src/modules/branding/MaterialUixImage';
import BrandingCustomerIcons from 'docs/src/modules/branding/BrandingCustomerIcons';
import Head from 'docs/src/modules/components/Head';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';

function AdvancedReactComponent() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
      }}
    >
      <Container>
        <MaterialUixImage
          src="/static/branding/mui-x/mui-x-logo.svg"
          width={153}
          height={26}
          sx={{ display: { xs: 'none', lg: 'block' }, pt: 12, mb: 4, textAlign: 'center' }}
        />
        <Typography variant="h1" align="center" sx={{ pt: 6 }}>
          <UnderlinedText mode="dark">Advanced</UnderlinedText> React <br />
          components
        </Typography>
        <Typography
          sx={{
            mt: { xs: 4, sm: 4, lg: 3.5 },
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            fontWeight: 'normal',
          }}
        >
          Material-UI X is the last React UI library you&apos;ll ever need.{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          It contains the best React Data Grid on the market and a{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> growing list of
          advanced components.
        </Typography>
        <Box sx={{ textAlign: 'center', mt: { xs: 4, lg: 7 }, pb: { md: 6, lg: 0 } }}>
          <Button
            component={Link}
            noLinkStyle
            href="/branding/pricing/"
            size="large"
            variant="contained"
            endIcon={<NavigateNextIcon />}
          >
            See pricing
          </Button>
          <Button
            sx={{
              textDecoration: 'underline',
              color: 'white',
              ml: { xs: 1.5, sm: 4.5, lg: 5.5 },
              mt: { xs: 2, sm: 0 },
              p: 0,
              background: 'transparent',
              fontStyle: 'normal',
              fontWeight: 'normal',
              '&:hover': {
                background: 'none',
                textDecoration: 'underline',
              },
            }}
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
            endIcon={<NavigateNextIcon />}
          >
            Explore library
          </Button>
          <Grid
            container
            sx={{
              mt: 6,
              justifyContent: 'center',
              display: { md: 'none', lg: 'flex' },
            }}
          >
            <Grid item xs={9}>
              <MaterialUixImage
                src="/static/branding/mui-x/main-data-grid.svg"
                width={695}
                height={425}
                sx={{
                  '& img': {
                    verticalAlign: 'bottom',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <MaterialUixImage
                src="/static/branding/mui-x/advanced-calendar.svg"
                width={264}
                height={272}
                sx={{
                  '& img': {
                    verticalAlign: 'bottom',
                  },
                }}
              />
              <MaterialUixImage
                src="/static/branding/mui-x/files.svg"
                width={261}
                height={136}
                sx={{
                  mt: 2.5,
                  '& img': {
                    verticalAlign: 'bottom',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

// Started WhyMaterialUix secion
const CustomGrid = styled(Grid)(({ theme }) => ({
  '&:nth-child(even)': {
    position: 'relative',
    top: theme.spacing(7.5),
    [theme.breakpoints.down('lg')]: {
      top: 0,
    },
  },
}));
const materialUixData = [
  {
    src: '/static/branding/mui-x/react.svg',
    title: 'Built exclusively for React',
    description: (
      <React.Fragment>
        The team behind Material-UI has been developing for React, and only React, since 2014. We
        went all-in on React before most developers.
        <br />
        <br />
        As a result the components benefit from the expertise we have built, and leverage the power
        of React without compromises.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/mui-x/typescript.svg',
    title: 'TypeScript support',
    description: (
      <React.Fragment>
        Material-UI X components are written in TypeScript, this helps keep the type definitions
        always up to date.
        <br />
        <br />
        Over half of all React web applications are built with TypeScript. If yours is, Material-UI
        X is ready for you. (And if it isn&apos;t – we&apos;ve still got you covered! 👍)
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/mui-x/library.svg',
    title: 'The most popular library',
    description: (
      <React.Fragment>
        The team behind Material-UI X also developed the most popular UI library for React:
        Material-UI. With Material-UI X you will benefit from the same expertise gained over many
        years.
        <br />
        <br /> The components are built to the same quality standards: end-to-end tests, polished
        API, type safe, accessible, fast, small. 👌
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/mui-x/completeness.svg',
    title: 'The only suite you need',
    description: (
      <React.Fragment>
        Because of the sustainability challenge of developing open source components, no open source
        UI library can provide enough high quality components. Sometimes for advanced components
        such as a data grid, there isn&apos;t even an open source alternative to turn to.
        <br />
        <br />
        Material-UI X will support all the most needed UI components, without sacrificing quality.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/mui-x/documentation.svg',
    title: 'Outstanding documentation',
    description: `The documentation is built on the experience we have gained developing open source
      components, and acting on the feedback for improving the documentation from our growing
      community of 2 million developers.`,
  },
  {
    src: '/static/branding/mui-x/customizability.svg',
    title: 'Simple customizability',
    description: (
      <React.Fragment>
        You want your components to be powerful, but without sacrificing how they look! After all,
        what good is that nice design system if you can&apos;t use it?
        <br />
        <br />
        Material-UI X is simple to customize by design, which means that you are in complete and
        full control of how your components render down to the very last component, class or style.
      </React.Fragment>
    ),
  },
];

function WhyMaterialUix() {
  return (
    <Container
      sx={{
        pb: 7.2,
        mt: { xs: 12, sm: 15, lg: 20 },
        mb: { xs: 12, sm: 15 },
        px: { sm: 7.5, lg: 3 },
      }}
    >
      <Typography variant="h2" align="center">
        Why <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
        <UnderlinedText>Material UI X?</UnderlinedText>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 2.5,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',
          p: { xs: '0 15px', sm: 0 },
          mb: { xs: 7, sm: 10.5, lg: 10 },
        }}
      >
        Looking to get ahead? We have timely resources. Switch to{' '}
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> Material-UI X to get
        more components.
      </Typography>
      <Grid container spacing={3}>
        {materialUixData.map((material) => (
          <CustomGrid item xs={12} md={6} key={material.title}>
            <MaterialUixCard image={material.src} title={material.title}>
              <Box sx={{ mt: 2 }}>{material.description}</Box>
            </MaterialUixCard>
          </CustomGrid>
        ))}
      </Grid>
    </Container>
  );
}
// End WhyMaterialUix secion

// Start React Data Grid Market
const ExclusiveFeaturesGrid = styled(Grid)(({ theme }) => ({
  '&:nth-child(odd)': {
    position: 'relative',
    top: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      top: 0,
    },
  },
}));
const exclusiveFeaturesData = [
  [
    { src: '/static/branding/mui-x/resizing.svg', label: 'Column Resizing' },
    { src: '/static/branding/mui-x/pagination.svg', label: 'Pagination' },
  ],
  [
    {
      src: '/static/branding/mui-x/rows-reorder.svg',
      label: 'Reorder Rows',
      topImagesrc: '/static/branding/mui-x/wip.svg',
    },
    {
      src: '/static/branding/mui-x/clipboard.svg',
      label: 'Clipboard',
      topImagesrc: '/static/branding/mui-x/wip.svg',
    },
  ],
  [
    { src: '/static/branding/mui-x/multi-row.svg', label: 'Multi Row Selection' },
    {
      src: '/static/branding/mui-x/row-virtualization.svg',
      label: 'Row virtualization',
    },
  ],
  [
    {
      src: '/static/branding/mui-x/excel-export.svg',
      label: 'Excel Export',
      topImagesrc: '/static/branding/mui-x/wip.svg',
    },
    {
      src: '/static/branding/mui-x/tree-data.svg',
      label: 'Tree Data',
      topImagesrc: '/static/branding/mui-x/wip.svg',
    },
  ],
];
function ReactDataGridMarket() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
        pt: { xs: 15, sm: 12.5, lg: 15 },
        pb: { xs: 8, sm: 23, lg: 15 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block9.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          left: { xs: 16, sm: 60, lg: 83 },
          top: -122,
        }}
      />
      <Container>
        <Typography variant="h2" align="center" sx={{ mb: 2.5 }}>
          The best <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          <UnderlinedText mode="dark">React Data Grid</UnderlinedText>{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          on <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          the market
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', mb: { xs: 8, sm: 10 } }}>
          The performance, feature set and quality has not been seen before in a{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          dedicated React Data Grid.
        </Typography>
        <Box
          component="img"
          src="/static/branding/mui-x/react-data-grid.svg"
          loading="lazy"
          alt=""
          sx={{ width: '100%' }}
        />
        <Typography
          variant="h3"
          align="center"
          sx={{ mt: 12, mb: 2.5, fontSize: { xs: 22, sm: 32, lg: 36 } }}
        >
          Packed with exclusive features
        </Typography>
        <Typography align="center" sx={{ mb: { xs: 8, sm: 10 }, fontSize: { xs: 16 } }}>
          The Material-UI X React Data Grid is packed with exclusive features that will
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          enrich the experience of your data tables.
        </Typography>
        <Grid container spacing={3} sx={{ px: { xs: 0, sm: 3.5, lg: 0 } }}>
          {exclusiveFeaturesData.map((exclusiveFeatures, i) => (
            <ExclusiveFeaturesGrid item lg={3} sm={6} xs={12} key={i}>
              {exclusiveFeatures.map((featuresData: any, index: number) => (
                <ExclusiveFeaturesCard
                  key={index}
                  index={index}
                  src={featuresData.src}
                  label={featuresData.label}
                  topImagesrc={featuresData.topImagesrc}
                />
              ))}
            </ExclusiveFeaturesGrid>
          ))}
        </Grid>
        <Button
          href="/getting-started/usage/"
          component={Link}
          size="large"
          noLinkStyle
          variant="contained"
          sx={{
            mt: 18,
            ml: 'auto',
            width: 234,
            mr: 'auto',
            display: { xs: 'none', lg: 'flex' },
          }}
          endIcon={<NavigateNextIcon />}
        >
          And more features
        </Button>
      </Container>
    </Box>
  );
}
// End React Data Grid Market

// Start WhatCommunitySay section
const communityData = [
  [
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/mui-x/avatar-spikebrehm.jpg',
      url: 'https://twitter.com/gruvdev/status/1255170173226680320',
      description: `Sometimes a library is so incredibly awesome. You don't want to use anything else. I
        absolutely love that I can have the Material look or completely customize @MaterialUI to
        any look I desire.`,
    },
    {
      name: 'Jim Hall',
      id: '@jimboolean',
      avatar: '/static/branding/mui-x/avatar-jimboolean.jpg',
      url: 'https://twitter.com/jimboolean/status/1276549134128943106',
      description: (
        <React.Fragment>
          Working with Material-UI is like working with an entire UI development team, minus the
          overhead.
          <br />
          <br />
          The theming tooling is simple and well-done. The components are common, customizable, and
          practical. Trophy
        </React.Fragment>
      ),
    },
  ],
  [
    {
      name: 'Andréa',
      id: '@azza_314',
      avatar: '/static/branding/mui-x/avatar-azza_314.jpg',
      url: 'https://twitter.com/azza_314/status/1250595347543371776',
      description: `Becoming more obsessed with @MaterialUI for #React. Along with #TypeScript support, they
        have phenomenal documentation, and an impressive design section with customizable themes
        and case studies. This is the best front-end library I've ever worked with!`,
    },
    {
      name: 'Sam Sycamore',
      id: '@tanoaksam',
      avatar: '/static/branding/mui-x/avatar-tanoaksam.jpg',
      url: 'https://twitter.com/tanoaksam/status/1362187897043001344',
      description: `Working with @MaterialUI feels like cheat codes! It's not supposed to be *this* easy
        to build stuff!`,
    },
  ],
  [
    {
      name: 'Matthias Margot',
      id: '@matthiasmargot',
      avatar: '/static/branding/mui-x/avatar-matthiasmargot.jpg',
      url: 'https://twitter.com/matthiasmargot/status/1215482285681795072',
      description: `The DX on Material-UI is absolutely insane and that package has shaped my approach to
        Component API Design / Composition Design & Style System Design. I think those guys got it
        idiomatically right, wonderful product.`,
    },
    {
      name: 'Martha Sharpe',
      id: '@SharpeMartha',
      avatar: '/static/branding/mui-x/avatar-SharpeMartha.jpg',
      url: 'https://twitter.com/SharpeMartha/status/1277983914355818496',
      description: `Spent the morning going through the docs for Material-UI. Such an amazing framework with
        amazing documentation! I tried using it several months ago, but struggled to grasp how a
        lot of it worked. Apparently, my understanding of React has been upgraded since then.
        Smiling face with smiling eyes.`,
    },
  ],
];

const Slider = styled('div')(({ theme }) => ({
  scrollSnapType: 'x mandatory',
  display: 'flex',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  overflowX: 'scroll',
  margin: '0 -15px',
  '& > div': {
    minWidth: '50%',
    scrollSnapAlign: 'start',
    position: 'relative',
    padding: '0 15px',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
}));

function WhatCommunitySay() {
  return (
    <Container sx={{ px: { xs: 2, sm: 7.5, lg: 3 }, pt: { lg: 15 }, pb: { lg: 20 } }}>
      <Typography
        variant="h2"
        align="center"
        sx={{ mt: { xs: 12, sm: 15, lg: 0 }, mb: { xs: 4, sm: 10, lg: 8 } }}
      >
        What our community
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> has to say
      </Typography>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Grid container spacing={3}>
          {communityData.map((community, i) => (
            <Grid item lg={4} key={i}>
              {community.map((data, j) => (
                <CommunitySayCard
                  key={j}
                  uniqueKey={j}
                  name={data.name}
                  id={data.id}
                  description={data.description}
                  avatar={data.avatar}
                  url={data.url}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <Slider>
          {communityData.flat().map((data, j) => (
            <div key={j}>
              <CommunitySayCard
                uniqueKey={j}
                name={data.name}
                id={data.id}
                description={data.description}
                avatar={data.avatar}
                url={data.url}
              />
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
}
// End WhatCommunitySay section

// Start RoadMap section
const roadMapData = [
  {
    image: '/static/branding/mui-x/in-lab.svg',
    color: 'primary.main',
    label: 'In the lab',
    description: 'In the lab, in progress to move into the core',
  },
  {
    image: '/static/branding/mui-x/wip.svg',
    color: 'vividBlue',
    label: 'Work in progress',
    description: 'Work in progress, will likely land in the lab.',
  },
  {
    image: '/static/branding/mui-x/planning-build.svg',
    color: 'grey87',
    label: 'Planning to build',
    description: 'Building the feature is planned but did not started yet.',
  },
];

function RoadMap() {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: 'greyF3',
        position: 'relative',
        pt: 12.5,
        pb: { xs: 20, sm: 20, lg: 16 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block7.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: -33,
          left: { xs: 16, sm: 60, lg: 135 },
          zIndex: 1,
        }}
      />
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          right: { xs: 16, sm: 60, lg: 135 },
          top: -78,
          display: { xs: 'none', lg: 'block' },
        }}
      />
      <Container>
        <Typography variant="h2" align="center">
          Roadmap
        </Typography>
        <Typography
          sx={{
            mt: 2.5,
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            p: { xs: '0 15px', md: 0 },
            mb: { xs: 5, sm: 6, lg: 7.5 },
            fontSize: { xs: 16, sm: 18 },
          }}
        >
          We are commited to developing the most requested components{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> and features. You
          can find our{' '}
          <Link href="https://github.com/mui-org/material-ui-x/projects/1">
            quartly roadmap in GitHub.
          </Link>
        </Typography>
        <Grid container spacing={2} sx={{ maxWidth: { sm: 622, lg: 570 }, margin: '0 auto' }}>
          {roadMapData.map((roadMap) => (
            <Grid item container direction="column" xs={6} sm={4} lg={4} key={roadMap.image}>
              <Avatar
                sx={{
                  mb: 2.5,
                  bgcolor: roadMap.color,
                  width: 40,
                  height: 40,
                  marginLeft: 0,
                  mr: 'auto',
                }}
              >
                <img loading="lazy" src={roadMap.image} width="19" height="19" alt="" />
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  borderBottom: { xs: '1px solid rgb(0,30,60)', lg: 'none' },
                  width: 'max-content',
                  mb: 0.5,
                }}
              >
                {roadMap.label}
              </Typography>
              <Typography
                variant="body3"
                sx={{
                  textAlign: 'left',
                  fontSize: 14,
                  width: '100%',
                  color: 'grey87',
                  mb: { xs: 6, sm: 0.5, lg: 0 },
                }}
              >
                {roadMap.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
// End RoadMap section
// Start RoadMapDetail section
const roadMapDetailData = [
  {
    title: 'In the lab',
    description: 'In progress to move into the core.',
    cardData: [
      {
        label: 'Data Grid',
        buttonLabel: 'In the lab',
        src: '/static/branding/mui-x/data-grid.svg',
        imageWidth: 20,
        imageHeight: 21,
        startIcon: <InLabIcon />,
      },
      {
        label: 'Date Picker',
        buttonLabel: 'In the lab',
        src: '/static/branding/mui-x/calendar.svg',
        imageWidth: 18,
        imageHeight: 21,
        startIcon: <InLabIcon />,
      },
      {
        label: 'Tree View',
        buttonLabel: 'In the lab',
        src: '/static/branding/mui-x/tree-view.svg',
        imageWidth: 20,
        imageHeight: 17,
        startIcon: <InLabIcon />,
      },
    ],
  },
  {
    title: 'Work in progress',
    description: 'Components we are actively working on.',
    cardData: [
      {
        label: 'Advanced Data Grid',
        buttonLabel: 'Work in Progress',
        src: '/static/branding/mui-x/data-grid.svg',
        imageWidth: 20,
        imageHeight: 21,
        startIcon: <WorkInProgressIcon />,
        buttonColor: 'ternary',
      },
      {
        label: 'Date Picker',
        buttonLabel: 'Work in Progress',
        src: '/static/branding/mui-x/calendar.svg',
        imageWidth: 18,
        imageHeight: 21,
        startIcon: <WorkInProgressIcon />,
        buttonColor: 'ternary',
      },
    ],
  },
  {
    title: 'Planning to build',
    description: 'Building the feature is planned but did not started yet.',
    cardData: [
      {
        label: 'Avanced Tree View',
        buttonLabel: 'Planning to build',
        src: '/static/branding/mui-x/checked.svg',
        imageWidth: 21,
        imageHeight: 21,
        startIcon: <PlanningBuildIcon />,
        buttonColor: 'neutral',
      },
      {
        label: 'Scheduler',
        buttonLabel: 'Planning to build',
        src: '/static/branding/mui-x/calendar.svg',
        imageWidth: 18,
        imageHeight: 21,
        startIcon: <PlanningBuildIcon />,
        buttonColor: 'neutral',
      },
      {
        label: 'Charts',
        buttonLabel: 'Planning to build',
        src: '/static/branding/mui-x/chart.svg',
        imageWidth: 18,
        imageHeight: 19,
        startIcon: <PlanningBuildIcon />,
        buttonColor: 'neutral',
      },
      {
        label: 'Sparkline',
        buttonLabel: 'Planning to build',
        src: '/static/branding/mui-x/sparkline.svg',
        imageWidth: 20,
        imageHeight: 15,
        startIcon: <PlanningBuildIcon />,
        buttonColor: 'neutral',
      },
      {
        label: 'Gauge',
        buttonLabel: 'Planning to build',
        src: '/static/branding/mui-x/gauge.svg',
        imageWidth: 24,
        imageHeight: 25,
        startIcon: <PlanningBuildIcon />,
        buttonColor: 'neutral',
      },
      {
        label: 'Upload',
        buttonLabel: 'Planning to build',
        src: '/static/branding/mui-x/upload.svg',
        imageWidth: 20,
        imageHeight: 21,
        startIcon: <PlanningBuildIcon />,
        buttonColor: 'neutral',
      },
    ],
  },
];
function RoadMapDetail() {
  return (
    <Box
      sx={{
        bgcolor: 'greyEA',
        mt: 0,
        pb: { xs: 13, sm: 15, lg: 17.5 },
        pt: { xs: 2.5, sm: 6.5 },
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="/static/branding/block8.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: -28,
          right: { xs: 17, sm: 60, lg: 135 },
        }}
      />
      <Container maxWidth="md" sx={{ px: { sm: 7.5, lg: 3 } }}>
        {roadMapDetailData.map((roadMapDetail, i) => (
          <React.Fragment key={i}>
            <Typography
              variant="h3"
              component="div"
              sx={{ textAlign: 'left', mt: { xs: 7.5, sm: 10, lg: 9 }, mb: 1.5 }}
            >
              {roadMapDetail.title}
            </Typography>
            <Typography sx={{ textAlign: 'left', mb: { xs: 4, sm: 5 } }}>
              {roadMapDetail.description}
            </Typography>
            {roadMapDetail.cardData.map((roadMap: any) => (
              <RoadMapDetailCard
                key={roadMap.label}
                label={roadMap.label}
                buttonLabel={roadMap.buttonLabel}
                src={roadMap.src}
                imageWidth={roadMap.imageWidth}
                imageHeight={roadMap.imageHeight}
                startIcon={roadMap.startIcon}
                buttonColor={roadMap.buttonColor}
              />
            ))}
          </React.Fragment>
        ))}
      </Container>
    </Box>
  );
}
// End RoadMapDetail section

export default function Page() {
  return (
    <BrandingRoot>
      <Head
        title="Material-UI X"
        description="Material-UI X is the last React UI library you'll ever need.
It contains the best React Data Grid on the market and a
growing list of advanced components."
        card="https://next.material-ui.com/static/branding/mui-x/card.png"
      />
      <BrandingHeader mode="dark" />
      <AdvancedReactComponent />
      <BrandingCustomerIcons />
      <WhyMaterialUix />
      <ReactDataGridMarket />
      <WhatCommunitySay />
      <RoadMap />
      <RoadMapDetail />
      <BrandingDiscoverMore />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
