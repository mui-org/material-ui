import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/internal-core-docs/Link';
import OurValues from 'docs/src/components/about/OurValues';
import PerksBenefits from 'docs/src/components/careers/PerksBenefits';
import CareersFaq from 'docs/src/components/careers/CareersFaq';
import RoleEntry from 'docs/src/components/careers/RoleEntry';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';

import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

type Role = {
  title: string;
  description: string;
  url: string;
};

type RoleCategory = {
  title: string;
  roles: Role[];
};

const openRolesData: RoleCategory[] = [
  {
    title: 'Engineering',
    roles: [
      // {
      //   title: 'React Engineer — Material UI Maintainer',
      //   description:
      //     'You will provide guidance to the community and solve their struggle, working on one of the most popular React UI library.',
      //   url: '/careers/react-engineer-material-ui-maintainer/',
      // },
      // {
      //   title: 'Product Engineer — Store',
      //   description:
      //     'You will lead the technical, product, and operational development of the store.',
      //   url: '/careers/product-engineer-store/',
      // },
      // {
      //   title: 'React Engineer — xCharts',
      //   description:
      //     'You will help form the xCharts team, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
      //   url: '/careers/react-engineer-x-charts/',
      // },
      // {
      //   title: 'React Engineer — eXplore',
      //   description:
      //     'You will help eXplore, the team behind the Pickers and Tree View components, build the most comprehensive UI library the world has ever seen.',
      //   url: '/careers/react-engineer-explore/',
      // },
      // {
      //   title: 'React Engineer — X',
      //   description:
      //     'You will strengthen the MUI X product, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
      //   url: '/careers/react-engineer-x/',
      // },
    ],
  },
  {
    title: 'Sales',
    roles: [
      // {
      //   title: 'Account Executive',
      //   description:
      //     'You will be a key player in driving revenue growth and building strong customer relationships.',
      //   url: '/careers/account-executive/',
      // },
      // {
      //   title: 'Account Manager',
      //   description:
      //     'You will be working with our customers to ensure the successful renewal and retention of existing client contracts.',
      //   url: '/careers/account-manager/',
      // },
    ],
  },
  {
    title: 'People',
    roles: [
      // {
      //   title: 'Technical Recruiter',
      //   description: 'MUI is looking for an experienced Tech Recruiter to join our People team.',
      //   url: '/careers/technical-recruiter/',
      // },
    ],
  },
  {
    title: 'Marketing',
    roles: [
      // {
      //   title: 'Product Marketing Manager',
      //   description: 'Establish MUI product positioning and messaging.',
      //   url: '/careers/product-marketing-manager/',
      // },
    ],
  },
  {
    title: 'Design',
    roles: [],
  },
  {
    title: 'Developer Experience',
    roles: [],
  },
  {
    title: 'Product',
    roles: [
      {
        title: 'Product Manager',
        description:
          'We are looking for a product manager to guide our roadmap and build a great product.',
        url: '/careers/product-manager/',
      },
    ],
  },
  {
    title: 'Operations',
    roles: [
      {
        title: 'Director of Business Operations',
        description:
          'Bridge company strategy and operational execution, unlock the next phase of growth.',
        url: '/careers/business-operations/',
      },
      {
        title: 'Operations Engineer',
        description: 'Help up reach operational excellence using engineering skills.',
        url: '/careers/operations-engineer/',
      },
    ],
  },
];

const nextRolesData = [
  {
    title: 'Engineering',
    roles: [
      // {
      //   title: 'React Community Engineer — X',
      //   description:
      //     'You will provide guidance to the community and solve their struggle, working primarily in the advanced components team.',
      //   url: '/careers/react-community-engineer/',
      // },
    ],
  },
  {
    title: 'Sales',
    roles: [],
  },
  {
    title: 'People',
    roles: [],
  },
  {
    title: 'Marketing',
    roles: [],
  },
  {
    title: 'Operations',
    roles: [],
  },
] as typeof openRolesData;

const openRolesCount = openRolesData.reduce((acc, item) => acc + item.roles.length, 0);
const nextRolesCount = nextRolesData.reduce((acc, item) => acc + item.roles.length, 0);

export default function Careers() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Careers - MUI"
        description="Interested in joining MUI? Learn about the roles we're hiring for."
        card="/static/social-previews/careers-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <Section cozy bg="gradient">
          <SectionHeadline
            alwaysCenter
            overline="Join us"
            title={
              <Typography variant="h2" component="h1">
                Build <GradientText>the next generation</GradientText>
                <br /> of tools for UI development
              </Typography>
            }
            description="We give developers and designers the tools to bring stunning user interfaces to life with unrivaled speed and ease."
          />
        </Section>
        <Divider />
        <OurValues />
        <Divider />
        <PerksBenefits />
        <Divider />
        {/* Open roles */}
        <Section cozy>
          <SectionHeadline
            title={
              <Typography variant="h2" id="open-roles" gutterBottom>
                Open roles
                <Badge
                  badgeContent={openRolesCount}
                  color="success"
                  sx={{ ml: 3, '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                />
              </Typography>
            }
            description={
              openRolesCount > 0
                ? 'We are actively hiring for the following roles:'
                : `We don't have any open roles at the moment. Consider applying to the Next roles below.`
            }
          />
          {openRolesCount > 0 ? (
            <React.Fragment>
              <Divider sx={{ borderStyle: 'dashed', my: { xs: 2, sm: 6 } }} />
              <Stack spacing={2} divider={<Divider />}>
                {openRolesData
                  .filter((category) => category.roles.length > 0)
                  .map((category) => {
                    return (
                      <React.Fragment key={category.title}>
                        <Typography component="h3" variant="h5" sx={{ fontWeight: 'semiBold' }}>
                          {category.title}
                        </Typography>
                        {category.roles.map((role) => (
                          <RoleEntry
                            key={role.title}
                            title={role.title}
                            description={role.description}
                            url={role.url}
                          />
                        ))}
                      </React.Fragment>
                    );
                  })}
              </Stack>
            </React.Fragment>
          ) : null}
        </Section>
        <Divider />
        {/* Next roles */}
        <Box data-mui-color-scheme="dark" sx={{ bgcolor: 'common.black' }}>
          <Section bg="transparent" cozy>
            <SectionHeadline
              title={
                <Typography variant="h2" id="next-roles" gutterBottom>
                  Next roles
                </Typography>
              }
              description={
                nextRolesCount > 0 ? (
                  <React.Fragment>
                    We&apos;re not actively hiring for these roles yet, but you&apos;re welcome to
                    apply for future consideration. If none of these roles match your profile, you
                    can apply to{' '}
                    <Link href="https://jobs.ashbyhq.com/MUI/4715d81f-d00f-42d4-a0d0-221f40f73e19/application?utm_source=ZNRrPGBkqO">
                      the dream job
                    </Link>{' '}
                    and tell us more about what you bring to the table.
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    You&apos;re welcome to apply for future consideration. You can apply to{' '}
                    <Link href="https://jobs.ashbyhq.com/MUI/4715d81f-d00f-42d4-a0d0-221f40f73e19/application?utm_source=ZNRrPGBkqO">
                      the dream job
                    </Link>{' '}
                    and tell us more about what you bring to the table.
                  </React.Fragment>
                )
              }
            />
            {nextRolesCount > 0 ? (
              <React.Fragment>
                <Divider sx={{ borderStyle: 'dashed', my: { xs: 2, sm: 6 } }} />
                <Stack spacing={2} divider={<Divider />}>
                  {nextRolesData
                    .filter((category) => category.roles.length > 0)
                    .map((category) => {
                      return (
                        <React.Fragment key={category.title}>
                          <Typography component="h3" variant="h5" sx={{ fontWeight: 'extraBold' }}>
                            {category.title}
                          </Typography>
                          {category.roles.map((role) => (
                            <RoleEntry
                              key={role.title}
                              title={role.title}
                              description={role.description}
                              url={role.url}
                            />
                          ))}
                        </React.Fragment>
                      );
                    })}
                </Stack>
              </React.Fragment>
            ) : null}
          </Section>
        </Box>
        <Divider />
        <CareersFaq />
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
