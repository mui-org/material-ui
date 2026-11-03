/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import Section from 'docs/src/layouts/Section';

const faqData = [
  {
    summary: 'How do I know if I need to buy a license?',
    detail: (
      <React.Fragment>
        If you are in doubt, check the license file of the npm package you're installing. For
        instance <Link href="https://unpkg.com/@mui/x-data-grid/LICENSE">@mui/x-data-grid</Link> is
        an MIT License (free) while{' '}
        <Link href="https://unpkg.com/@mui/x-data-grid-pro/LICENSE">@mui/x-data-grid-pro</Link> is a
        Commercial License.
      </React.Fragment>
    ),
  },
  {
    summary: 'How many developer licenses do I need?',
    detail: (
      <React.Fragment>
        The number of licenses purchased must correspond to the number of concurrent developers
        contributing changes to the front-end code of projects that use MUI X Pro or Premium.
        <br />
        <br />
        <b>Example 1.</b> Company 'A' is developing an application named 'AppA'. The app needs to
        render 10k rows of data in a table and allow users to group, filter, and sort. The dev team
        adds MUI X Pro to the project to satisfy this requirement. 5 front-end and 10 back-end
        developers are working on 'AppA'. Only 1 developer is tasked with configuring and modifying
        the data grid. Only the front-end developers are contributing code to the front-end so
        Company 'A' purchases 5 licenses.
        <br />
        <br />
        <b>Example 2.</b> A UI development team at Company 'B' creates its own UI library for
        internal development and includes MUI X Pro as a component. The team working on 'AppA' uses
        the new library and so does the team working on 'AppB'. 'AppA' has 5 front-end developers
        and 'AppB' has 3. There are 2 front-end developers on the UI development team. Company 'B'
        purchases 10 licenses.
        <br />
        <br />
        <Link
          target="_blank"
          href="https://mui.com/legal/mui-x-eula/#authorized-developer-count-rule"
        >
          The clause in the EULA.
        </Link>
      </React.Fragment>
    ),
  },
  {
    summary: 'Am I allowed to use the product after the update entitlement expires?',
    detail: (
      <React.Fragment>
        <strong>Yes.</strong> You can continue to use the product in production environments after
        the entitlement expires. But you will need to keep your subscription active to continue
        development, update for new features, or gain access to technical support.
        <br />
        <br />
        To renew your license, please <Link href="mailto:sales@mui.com">contact sales</Link>.
      </React.Fragment>
    ),
  },
  {
    summary: 'How to remove the "unlicensed" watermark?',
    detail: (
      <React.Fragment>
        After you purchase a license, you'll receive a license key by email. Once you have the
        license key, you need to follow the{' '}
        <Link href="/x/introduction/licensing/#license-key-installation">instructions</Link>{' '}
        necessary to set it up.
      </React.Fragment>
    ),
  },
  {
    summary: 'Do developers have to be named?',
    detail: (
      <React.Fragment>
        <strong>No.</strong> We trust that you will not go over the number of licensed developers.
        Developers moving on and off projects is expected occasionally, and the license can be
        transferred between developers at that time.
      </React.Fragment>
    ),
  },
  {
    summary: 'What is the policy on redistributing the software?',
    detail: (
      <React.Fragment>
        The commerial licenses are royalty-free. The licensed entity can use the components without
        a sublicense in:
        <ul>
          <li>Solutions for internal company use</li>
          <li>Hosted applications</li>
          <li>Commercial solutions deployed for end-users</li>
        </ul>
        Based on the{' '}
        <Link target="_blank" href="https://mui.com/legal/mui-x-eula/#sublicense-conditions">
          'Deployment' section of the EULA
        </Link>
        , you can sublicense the software if it's made part of a larger work. The new licenses must
        be in writing and substantially the same as these EULA.
        <br />
        <br />
        <b>Example 1.</b> Agency 'A' is building two applications for companies 'B' and 'C'. Agency
        'A' purchases four licenses for four developers. They build the applications and sublicense
        the software to companies 'B' and 'C' without any extra fee. Company 'B' can deploy the
        application built by the agency without modifying the sources. Company 'C' decides to
        continue working on the application. They purchase one license per developer working on the
        front end of the application.
        <br />
        <br />
        There are only two limitations that require additional discussion with our sales team:
        <ul>
          <li>
            A product that exposes the components in a form that allows for using them to build
            applications, for example, in a CMS or a design-builder.
          </li>
          <li>
            Modules/components that DO NOT add significant primary functionality. Example: a theme
            for a set of components that is sold as a separate product and includes the MUI X Data
            Grid Pro components. In such cases, we offer reseller arrangements so that everyone has
            an incentive to enter into a relationship.
          </li>
        </ul>
        If your desired use falls under any of the three categories listed above, please{' '}
        <Link href="mailto:sales@mui.com">contact sales</Link>. We will be happy to discuss your
        needs and see what we can do to accommodate your case.
      </React.Fragment>
    ),
  },
  {
    summary: 'Do you offer discounts to educational and non-profit organizations?',
    detail: (
      <React.Fragment>
        Yes, we offer a 50% discount on all products licensed to students, instructors, non-profit,
        and charity entities.
        <br />
        <br />
        To qualify for this discount you need to send us a document clearly indicating that you are
        a member of the respective institution. An email from your official account which bears your
        signature is sufficient in most cases.
        <br />
        <br />
        For more information on how to qualify for a discount, please contact sales.
      </React.Fragment>
    ),
  },
  {
    summary: 'Why must we license developers not using the software directly?',
    detail: (
      <React.Fragment>
        Our pricing model requires all developers working on a project using MUI X Pro or Premium to
        be licensed. This is intended to make it easier for you and your team to know if the right
        number of developers are licensed.
        <br />
        <br />
        Our licensing model also requires developers indirectly using MUI X Pro or Premium (e.g.
        through a wrapper library) to be licensed.
        <br />
        <br />
        The price point per developer is adjusted to be lower than if only direct use needed a
        license.{' '}
        <Link
          target="_blank"
          href="https://mui.com/legal/mui-x-eula/#authorized-developer-count-rule"
        >
          The relevant EULA clause.
        </Link>
      </React.Fragment>
    ),
  },
  {
    summary: 'What is the validity of the Priority Support add-on?',
    detail: (
      <React.Fragment>
        The Priority Support add-on is valid for 1 year from the date of purchase. It is same for
        perpetual or annual license model.{' '}
        <Link target="_blank" href="https://mui.com/legal/technical-support-sla/#support-plans">
          Support plans.
        </Link>
      </React.Fragment>
    ),
  },
];

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: theme.transitions.create('box-shadow'),
  '&&': {
    borderRadius: theme.shape.borderRadius,
  },
  '&:hover': {
    borderColor: theme.palette.primary[300],
    boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
  },
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2),
  },
  '&::before': {
    display: 'none',
  },
  '&::after': {
    display: 'none',
  },
  ...theme.applyDarkStyles({
    '&:hover': {
      borderColor: alpha(theme.palette.primary[600], 0.6),
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)',
    },
  }),
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(-2),
  minHeight: 'auto',
  '&.Mui-expanded': {
    minHeight: 'auto',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    paddingRight: theme.spacing(2),
    '&.Mui-expanded': {
      margin: 0,
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetail)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: 0,
}));

export default function PricingFAQ() {
  function renderItem(index: number) {
    const faq = faqData[index];
    return (
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 20, color: 'primary.main' }} />}
        >
          <Typography variant="body2" component="h3" sx={{ fontWeight: 'bold' }}>
            {faq.summary}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            component="div"
            variant="body2"
            sx={{ color: 'text.secondary', '& ul': { pl: 2 } }}
          >
            {faq.detail}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
  return (
    <Section cozy>
      <Typography id="faq" variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
        Frequently asked questions
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          {renderItem(0)}
          {renderItem(1)}
          {renderItem(2)}
          {renderItem(3)}
          {renderItem(4)}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {renderItem(5)}
          {renderItem(6)}
          {renderItem(7)}
          {renderItem(8)}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            variant="outlined"
            sx={(theme) => ({
              p: 2,
              textAlign: 'center',
              borderStyle: 'dashed',
              borderColor: 'grey.300',
              bgcolor: 'white',
              ...theme.applyDarkStyles({
                borderColor: 'divider',
                bgcolor: 'primaryDark.800',
              }),
            })}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant="body2"
                component="h3"
                sx={{ color: 'text.primary', fontWeight: 'bold' }}
              >
                Got any questions unanswered or need help?
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', my: 1, textAlign: 'left' }}>
              Email us at <Link href="mailto:sales@mui.com">sales@mui.com</Link> for sales-related
              questions.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', my: 1, textAlign: 'left' }}>
              For product-related problems, please open
              <Link href="https://github.com/mui/mui-x/issues/new/choose">a new GitHub issue</Link>.
              (If you need to share private information, you can{' '}
              <Link href="mailto:x@mui.com">email</Link> us.)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}
