import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'docs/src/modules/components/Link';
import Button from '@material-ui/core/Button';
import Head from 'docs/src/modules/components/Head';
import Box, { BoxProps } from '@material-ui/core/Box';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BrandingCard from 'docs/src/modules/branding/BrandingCard';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import FeedbackIcon from 'docs/src/modules/branding/icons/Feedback';
import ChangesIcon from 'docs/src/modules/branding/icons/Changes';
import FinanceIcon from 'docs/src/modules/branding/icons/Finance';
import HelpIcon from 'docs/src/modules/branding/icons/Help';
import OpenCollectiveIcon from 'docs/src/modules/branding/icons/OpenCollective';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';
import BrandingDiscoverMore from 'docs/src/modules/branding/BrandingDiscoverMore';
import BrandingPersona from 'docs/src/modules/branding/BrandingPersona';
import BrandingQuote from 'docs/src/modules/branding/BrandingQuote';
import BrandingBulletItem from 'docs/src/modules/branding/BrandingBulletItem';

interface ImageProps {
  src: string;
  ratio: number;
  sx?: BoxProps['sx'];
}

function Image(props: ImageProps) {
  const { src, ratio, ...other } = props;
  return (
    <Box
      {...other}
      sx={{
        position: 'relative',
        '& div': {
          paddingTop: `${Math.round(ratio * 100)}%`,
        },
        '& img': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        ...other.sx,
      }}
    >
      <div />
      <img alt="" src={src} loading="lazy" />
    </Box>
  );
}

function BrandingHero() {
  return (
    <Container>
      <Typography variant="h1" align="center" sx={{ mt: 9, mx: 'auto' }}>
        {"We're are making building "}
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }} />
        UIs more <UnderlinedText>accessible</UnderlinedText>
      </Typography>
      <Typography sx={{ mt: 4, maxWidth: '60ch', mx: 'auto', textAlign: 'center', mb: 15 }}>
        Material-UI started back in 2014 to unify <Link href="https://reactjs.org/">React</Link> and{' '}
        <Link href="https://material.io/design">Material Design</Link>.
        <br />
        <br />
        Today, Material-UI has grown to become one of the world&apos;s most popular React libraries
        – used by a vibrant community of more than <b>2M developers</b> in over <b>180 countries</b>
        .
      </Typography>
    </Container>
  );
}

function BrandingKPI() {
  return (
    <Grid container spacing={1} sx={{ mb: { md: 15 } }}>
      <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
        <Image
          src="/static/branding/about/top-left.jpg"
          ratio={1500 / 1500}
          sx={{ maxHeight: 750 }}
        />
        <Box
          component="img"
          src="/static/branding/block3.svg"
          loading="lazy"
          alt=""
          sx={{
            width: 120,
            height: 120,
            position: 'absolute',
            right: { xs: 30, md: -75 },
            bottom: -43,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Image
          src="/static/branding/about/top-right.png"
          ratio={680 / 1430}
          sx={{ maxHeight: 340, order: { xs: 2, md: 1 } }}
        />
        <Box
          sx={{
            maxWidth: 470,
            my: 8,
            mx: { xs: 2, sm: 'auto', md: 7, lg: 10 },
            order: { xs: 1, md: 2 },
          }}
        >
          <Grid container>
            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="h2" component="span">
                2019
              </Typography>
              <Typography>company founded</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="h2" component="span">
                2K
              </Typography>
              <Typography>contributors</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h2" component="span">
                2m
              </Typography>
              <Typography>users</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h2" component="span">
                60k+
              </Typography>
              <Typography>github stars</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

function BrandingMission() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ py: 10, px: 3 }}>
            <Box sx={{ maxWidth: 470, mx: 'auto' }}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Our mission
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Our company is focused on making React UI development faster, simpler, and
                accessible to more people. We build open source and commercial tools used by over
                two millions developers in production.
              </Typography>
              <Typography>
                We&apos;re proud not only of the products we make, but also the community and
                partnerships we&apos;ve cultivated with other developers and companies.
              </Typography>
              <Button
                href="/company/jobs/"
                component={Link}
                noLinkStyle
                color="secondary"
                sx={{ mt: 7 }}
                variant="contained"
                endIcon={<NavigateNextIcon />}
              >
                Join us
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ py: 10, px: 3, position: { xs: 'relative', md: 'static' } }}
          >
            <Box
              sx={{
                bgcolor: 'secondary.main',
                position: 'absolute',
                top: 0,
                left: { xs: -2 * 8, sm: -3 * 8, md: '50%' },
                right: { xs: -2 * 8, sm: -3 * 8, md: 0 },
                bottom: 0,
              }}
            />
            <Box
              sx={{
                maxWidth: 420,
                mx: 'auto',
                position: 'relative',
                mb: 10,
                color: 'secondary.contrastText',
              }}
            >
              <Box
                component="img"
                src="/static/branding/block1-blue.svg"
                loading="lazy"
                alt=""
                sx={{
                  width: 293,
                  height: 120,
                  position: 'absolute',
                  right: -30,
                  bottom: -200,
                }}
              />
              <Typography variant="h2" sx={{ mb: 3 }}>
                Our values
              </Typography>
              <Box component="ul" sx={{ margin: 0, padding: 0 }}>
                <BrandingBulletItem variant="dark">
                  Customer obsessed. We put our customers front & center.
                </BrandingBulletItem>
                <BrandingBulletItem variant="dark">
                  Transparency. Most of our work is public.
                </BrandingBulletItem>
                <BrandingBulletItem variant="dark">
                  Freedom. We work from anywhere in the world.
                </BrandingBulletItem>
                <BrandingBulletItem variant="dark">
                  Autonomy. We want to create a safe, high-trust team.
                </BrandingBulletItem>
                <BrandingBulletItem variant="dark">
                  {"Excellence. We're aiming high, and we know it."}
                </BrandingBulletItem>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function BrandingVision() {
  return (
    <Container sx={{ my: 15 }}>
      <Typography
        variant="h3"
        component="p"
        sx={{ textAlign: 'center', maxWidth: 770, mx: 'auto', mb: 11 }}
      >
        <UnderlinedText>Our vision is</UnderlinedText> to provide material to build rich user
        interfaces. Material-UI is an elegant React implementation of the Material Design guidelines
        that can be customized to fully match your brand.
      </Typography>
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={12} sm={6}>
          <Image
            src="/static/branding/about/vision.png"
            ratio={1140 / 940}
            sx={{ maxWidth: 470 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            {
              "The Material Design guidelines are an incredible starting point, but they don't provide guidance on all aspects or needs of an application."
            }
            In addition to the guideline-specific implementation,{' '}
            <b>we want Material-UI to be more generally useful for application development.</b>
          </Typography>
          <br />
          <Typography>
            Material-UI implements not only the Material Design guidelines, but is also a general
            use UI library of components, offering components that are simply not addressed in the
            design guidelines.
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ my: 15 }}>
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} sm={6} sx={{ order: [2, 1] }}>
            <Typography>
              <b>
                We focus on providing all the low-level tools needed to build a rich user-interface
                with React.
              </b>{' '}
              We implement the Material Design guidelines, which is a bar set quite high. You are
              able to take advantage of it for your own business with any style customization
              needed.
            </Typography>
            <br />
            <Typography>
              We want to see companies succeed using Material-UI in a way that matches their brand,
              close to the Material Design philosophy or not. We don&apos;t want them to feel that
              their UI simply looks like another Google product.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ order: [1, 2] }}>
            <Image
              src="/static/branding/about/focus.jpg"
              ratio={1140 / 940}
              sx={{ maxWidth: 470 }}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <BrandingQuote
            author={{
              avatar: '/static/branding/about/olivier.jpg',
              name: 'Olivier Tassinari',
              title: 'Co-founder',
            }}
            sx={{ width: '100%', maxWidth: { md: 470 } }}
          >
            React is set on a course to further dominate the way UIs are built on the web for a long
            time.
            <br />
            The next major iteration to improve the DX will be a paradigm shift.
            {" It's not coming with a new library but low-code."}
          </BrandingQuote>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="p">
            From a developer&apos;s point of view, we want Material-UI to:
          </Typography>
          <Box component="ul" sx={{ m: 0, p: 0, mt: 3 }}>
            <BrandingBulletItem>
              Deliver on fully encapsulated/composable React components,
            </BrandingBulletItem>
            <BrandingBulletItem>Be themeable/customizable,</BrandingBulletItem>
            <BrandingBulletItem>
              Be cross browser compatible and assistive technology accessible,
            </BrandingBulletItem>
            <BrandingBulletItem>
              Promote developer joy, a sense of community, and an environment where new and
              experienced developers can learn from each other.
            </BrandingBulletItem>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

function BrandingTeam() {
  return (
    <Box sx={{ bgcolor: 'greyF3', pt: 15, pb: 10 }}>
      <Container sx={{ position: 'relative' }}>
        <Box
          component="img"
          src="/static/branding/block4.svg"
          alt=""
          loading="lazy"
          sx={{
            width: 207,
            height: 171,
            position: 'absolute',
            right: { xs: 10, md: 0 },
            bottom: -176,
          }}
        />
        <Typography variant="h2">Team</Typography>
        <Typography sx={{ mt: 1.5, mb: 7, maxWidth: '60ch' }}>
          Material-UI is maintained by a group of invaluable core contributors, with the massive
          support and involvement of the community.
        </Typography>
      </Container>
    </Box>
  );
}

const company = [
  {
    name: 'Olivier Tassinari',
    src: '/static/branding/about/olivier.jpg',
    title: 'Co-founder',
    location: 'Paris, France',
    twitter: 'olivtassinari',
    github: 'oliviertassinari',
  },
  {
    name: 'Matt Brookes',
    src: '/static/branding/about/matt.jpg',
    title: 'Co-founder',
    location: 'London, UK',
    twitter: 'randomtechdude',
    github: 'mbrookes',
  },
  {
    name: 'Sebastian Silbermann',
    src: '/static/branding/about/sebastian.jpg',
    title: 'Core components team',
    location: 'Dresden, Germany',
    twitter: 'sebsilbermann',
    github: 'eps1lon',
  },
  {
    name: 'Damien Tassone',
    src: '/static/branding/about/damien.jpg',
    title: 'Advanced components team',
    location: 'Barcelona, Spain',
    twitter: 'madKakoO',
    github: 'dtassone',
  },
  {
    name: 'Marija Najdova',
    src: '/static/branding/about/marija.jpg',
    title: 'Core components team',
    location: 'Skopje, North Macedonia',
    twitter: 'marijanajdova',
    github: 'mnajdova',
  },
  {
    name: 'Danail Hadjiatanasov',
    src: '/static/branding/about/danail.jpg',
    title: 'Advanced components team',
    location: 'Amsterdam, Netherlands',
    twitter: 'danail_h',
    github: 'DanailH',
  },
  {
    name: 'Matheus Wichman',
    src: '/static/branding/about/matheus.jpg',
    title: 'Advanced components team',
    location: 'Esteio, Brazil',
    github: 'm4theushw',
  },
  {
    name: 'Michał Dudak',
    src: '/static/branding/about/michal.jpg',
    title: 'Core components team',
    location: 'Silesia, Poland',
    twitter: 'michaldudak',
    github: 'michaldudak',
  },
  {
    name: 'Siriwat Kunaporn',
    src: '/static/branding/about/siriwat.jpg',
    title: 'Core components team',
    location: 'Bangkok, Thailand',
    twitter: 'siriwatknp',
    github: 'siriwatknp',
  },
];

function BrandingCompany() {
  return (
    <Box sx={{ bgcolor: 'greyEA', pt: 12, pb: 11 }}>
      <Container sx={{ position: 'relative' }}>
        <Box
          component="img"
          src="/static/branding/block1-white.svg"
          loading="lazy"
          alt=""
          sx={{
            width: 293,
            height: 120,
            position: 'absolute',
            right: { xs: 20, md: 0 },
            bottom: -129,
          }}
        />
        <Typography variant="h3">
          <UnderlinedText>Company</UnderlinedText>
        </Typography>
        <Typography sx={{ mt: 1.5, mb: 7, maxWidth: '60ch' }}>
          The development of the project and its ecosystem is guided by an international team.
        </Typography>
        <Grid container spacing={4}>
          {company.map((member) => (
            <Grid item xs={12} md={6} lg={4} key={member.name}>
              <BrandingPersona {...member} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

const community = [
  {
    name: 'Danica Shen',
    github: 'DDDDDanica',
    title: '🇨🇳 Chinese docs',
    location: 'Ireland',
    src: 'https://avatars.githubusercontent.com/u/12678455',
  },
  {
    name: 'Yan Lee',
    github: 'AGDholo',
    title: '🇨🇳 Chinese docs',
    location: 'China',
    src: 'https://avatars.githubusercontent.com/u/13300332',
  },
  {
    name: 'Jairon Alves Lima',
    github: 'jaironalves',
    title: '🇧🇷 Brazilian docs',
    location: 'São Paulo, Brazil',
    src: 'https://avatars.githubusercontent.com/u/29267813',
  },
] as typeof emeriti;

function BrandingContributors() {
  return (
    <Box sx={{ bgcolor: 'greyF3', pt: 10, pb: 9 }}>
      <Container sx={{ position: 'relative' }}>
        <Box
          component="img"
          src="/static/branding/block2.svg"
          loading="lazy"
          alt=""
          sx={{
            width: 196,
            height: 139,
            position: 'absolute',
            right: { xs: 30, md: 0 },
            bottom: -131,
          }}
        />
        <Typography variant="h3">
          Community <UnderlinedText>Contributors</UnderlinedText>
        </Typography>
        <Typography sx={{ mt: 1.5, mb: 7, maxWidth: '60ch' }}>
          Some members of the community have so enriched it, that they deserve special mention.
        </Typography>
        <Grid container spacing={4}>
          {community.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.name}>
              <BrandingPersona
                {...member}
                src={`${member.src}?s=120`}
                srcSet={`${member.src}?s=240 2x`}
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

const emeriti = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    title: 'v0.x creator',
    location: 'Dallas, Texas, US',
    src: 'https://avatars.githubusercontent.com/u/2007468',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    title: 'v1.x co-creator',
    location: 'Toronto, ON',
    src: 'https://avatars.githubusercontent.com/u/4420103',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    title: 'Core focus, flow',
    location: 'Franklin, Tennessee, US',
    src: 'https://avatars.githubusercontent.com/u/136564',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    title: 'Core focus',
    location: 'Freiburg, Germany',
    src: 'https://avatars.githubusercontent.com/u/985701',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    title: 'Core focus',
    location: 'New Jersey, US',
    src: 'https://avatars.githubusercontent.com/u/3155127',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    title: 'Core focus',
    location: 'Los Angeles, California, US',
    src: 'https://avatars.githubusercontent.com/u/128019',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    title: 'Core focus',
    location: 'Hannover, Germany',
    src: 'https://avatars.githubusercontent.com/u/5544859',
  },
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    title: 'JSS',
    location: 'Berlin, Germany',
    src: 'https://avatars.githubusercontent.com/u/52824',
  },
  {
    name: 'Dmitriy Kovalenko',
    github: 'dmtrKovalenko',
    twitter: 'dmtrKovalenko',
    title: 'Date pickers',
    location: 'Kharkiv, Ukraine',
    src: 'https://avatars.githubusercontent.com/u/16926049',
  },
  {
    name: 'Josh Wooding',
    github: 'joshwooding',
    twitter: 'JoshWooding_',
    title: 'Core focus, J.P. Morgan',
    location: 'London, UK',
    src: 'https://avatars.githubusercontent.com/u/12938082',
  },
];

function BrandingEmeriti() {
  return (
    <Box sx={{ bgcolor: 'greyEA', pt: 10, pb: 9 }}>
      <Container>
        <Typography variant="h3">
          Community <UnderlinedText>Emeriti</UnderlinedText>
        </Typography>
        <Typography sx={{ mt: 1.5, mb: 7, maxWidth: '60ch' }}>
          We honor some no-longer-active core team members who have made valuable contributons in
          the past. They advise us from time-to-time.
        </Typography>
        <Grid container spacing={4}>
          {emeriti.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.name}>
              <BrandingPersona
                {...member}
                src={`${member.src}?s=120`}
                srcSet={`${member.src}?s=240 2x`}
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function BrandingJoinUs() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 17, sm: 19, md: 20 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src="/static/branding/block6.svg"
          loading="lazy"
          alt=""
          sx={{
            width: 570,
            height: 526,
            position: 'absolute',
            display: 'block',
            right: { xs: -360, sm: -350, lg: -570 },
            bottom: { xs: -300, sm: -200, lg: -80 },
          }}
        />
        <Typography variant="h2" align="center">
          Join our team of creators &amp; innovators
        </Typography>
        <Typography align="center" sx={{ mt: 3, mb: 5 }}>
          If you love the challenge of doing things differently, empowering creativity, and making
          real connections along the way–then this may be the place for you.
        </Typography>
        <Button
          href="/company/jobs/"
          component={Link}
          noLinkStyle
          size="large"
          variant="contained"
          endIcon={<NavigateNextIcon />}
        >
          See Open Positions
        </Button>
      </Container>
    </Box>
  );
}

function BrandingSupportUs() {
  return (
    <Container sx={{ mt: [10, 18], mb: [12, 20] }}>
      <Typography variant="h2">
        Material-UI is awesome.
        <br />
        How can <UnderlinedText>I support the project?</UnderlinedText>
      </Typography>
      <Typography sx={{ mt: 2, mb: 9 }}>There are many ways to support Material-UI:</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BrandingCard icon={<QuestionAnswerIcon fontSize="large" />} title="Spread the word">
            <Typography sx={{ mt: 2 }}>
              Evangelize Material-UI by linking to{' '}
              <Link href="https://material-ui.com">material-ui.com</Link> on your website, every
              backlink matters! Follow us on{' '}
              <Link href="https://twitter.com/MaterialUI">Twitter</Link>, retweet the important
              news. <Link href="https://github.com/mui-org/material-ui">Star us</Link> on GitHub
              ⭐️.{" Or share what you've built with Material-UI."}
            </Typography>
          </BrandingCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrandingCard
            color="vividBlue"
            icon={<FeedbackIcon fontSize="large" />}
            title="Give us feedback"
          >
            <Typography sx={{ mt: 2 }}>
              Tell us what we&apos;re doing well or where we can improve. Please upvote (
              <span role="img" aria-label="Thumbs up emoji">
                👍
              </span>
              ) the issues that you are the most interested in seeing solved.{' '}
              <Link href="https://github.com/mui-org/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc">
                Give us feedback
              </Link>
            </Typography>
          </BrandingCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrandingCard
            color="vividBlue"
            icon={<ChangesIcon fontSize="large" />}
            title="Make changes happen"
            sx={{
              ul: {
                position: 'relative',
                ml: 0,
                pl: '1.3em',
              },
              'ul li:before': {
                content: '"-"',
                position: 'absolute',
                left: 0,
              },
            }}
          >
            <ul>
              <li>
                Edit the documentation. Every page has an &quot;EDIT THIS PAGE&quot; link in the top
                right.
              </li>
              <li>
                Report bugs or missing features by{' '}
                <Link href="https://github.com/mui-org/material-ui/issues">creating an issue</Link>.
              </li>
              <li>
                Review and comment on existing{' '}
                <Link href="https://github.com/mui-org/material-ui/pulls">pull requests</Link> and{' '}
                <Link href="https://github.com/mui-org/material-ui/issues">issues</Link>.
              </li>
              <li>
                Help <Link href="https://translate.material-ui.com/">translate</Link> the
                documentation.
              </li>
              <li>
                <Link href="https://github.com/mui-org/material-ui/tree/HEAD/docs">
                  Improve our documentation
                </Link>
                , fix bugs, or add features by{' '}
                <Link href="https://github.com/mui-org/material-ui/blob/HEAD/CONTRIBUTING.md#your-first-pull-request">
                  submitting a pull request
                </Link>
                .
              </li>
            </ul>
          </BrandingCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrandingCard icon={<FinanceIcon fontSize="large" />} title="Support us financially">
            <Typography sx={{ mt: 2 }}>
              If you use Material-UI in a commercial project and would like to support its continued
              development by becoming a Sponsor, or in a side or hobby project and would like to
              become a Backer, you can do so through OpenCollective.
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              All funds donated are managed transparently, and Sponsors receive recognition in the
              README and on the Material-UI home page.
            </Typography>
            <Button
              color="inherit"
              href="https://opencollective.com/material-ui"
              endIcon={<OpenCollectiveIcon />}
              variant="contained"
            >
              Open Collective
            </Button>
          </BrandingCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrandingCard icon={<HelpIcon fontSize="large" />} title="Help new users">
            <Typography sx={{ mt: 2 }}>
              You can answer questions on{' '}
              <Link href="https://stackoverflow.com/questions/tagged/material-ui">
                StackOverflow
              </Link>
              .
            </Typography>
          </BrandingCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function Page() {
  return (
    <BrandingRoot>
      <Head
        title="About Us - Material-UI"
        description="Material-UI started back in 2014 to unify React and Material Design. Today, Material-UI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <BrandingHeader />
      <BrandingHero />
      <BrandingKPI />
      <BrandingMission />
      <BrandingVision />
      <BrandingTeam />
      <BrandingCompany />
      <BrandingContributors />
      <BrandingEmeriti />
      <BrandingJoinUs />
      <BrandingSupportUs />
      <BrandingDiscoverMore />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
