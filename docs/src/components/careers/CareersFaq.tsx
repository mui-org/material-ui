import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
import { MarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
import { createRender } from '@mui/internal-markdown';
import { Link } from '@mui/internal-core-docs/Link';
import Section from 'docs/src/layouts/Section';

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: theme.transitions.create('box-shadow'),
  borderRadius: theme.shape.borderRadius,
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

// Data from https://www.notion.so/mui-org/Hiring-FAQ-64763b756ae44c37b47b081f98915501
const faqData = [
  {
    summary: 'Are there application deadlines?',
    detail: 'No. If a job is visible on our careers page, then you can still apply.',
  },
  {
    summary: 'Does MUI do whiteboarding during interviews?',
    detail:
      'No. We ask applicants to complete challenges that resemble the kinds of contributions we would expect from the role.',
  },
  {
    summary: 'Would I be hired as an employee or contractor?',
    detail: `
  New team members can choose whether to join as an employee or a contractor. The legal requirements may vary significantly between countries, but we've designed our compensation packages to minimize the differences between each type of contract. You can also switch between the two statuses if and when your circumstances change.

  For those who choose to join as employees:

  - people in France are hired as full-time employees under the French [legal entity](https://www.infogreffe.fr/entreprise-societe/852357748-material-ui-750119B189960000).
  - people outside of France are hired through an Employer of Record (EOR) such as [Deel](https://www.deel.com/).
`,
  },
  {
    summary: 'Which countries does MUI hire from?',
    detail: `
  As a general rule, we can hire from any country where we can legally compensate you. This includes countries where:

  - [we can send money via Wise](https://wise.com/help/articles/2571942/what-countries-can-i-send-to)
  - [we can use Deel as an EOR](https://help.letsdeel.com/hc/en-gb/articles/4407737728273-Where-Is-Deel-Available)

  Beyond that, we do have some limitations:

  - We favor candidates working normal hours in the UTC-6 to UTC+5 timezone range. This isn't a hard requirement, but it greatly simplifies communication and collaboration.
  - We can't hire fiscal residents of Russia due to legal and ethical constraints.
`,
  },
  {
    summary: 'Does MUI offer visa sponsorship?',
    detail: `At present, MUI does not provide visa sponsorship for individuals applying for new roles within the company. Candidates must already possess legal authorization to work in the country for which they're applying to be considered for employment.`,
  },
  {
    summary: 'How would you describe the company culture?',
    detail: `
  We aim to build a team of people who:

  - **seek accuracy over complacency.** People who enjoy discovering the truth more than being right. People who appreciate debate, embrace confusion, and reason carefully.
  - **aim for clarity of thought.** People who take the time to understand the problem before solving it. People who can explain complex ideas in simple terms, and know how to tailor their communication to their audience.
  - **possess self-determination.** People who are motivated to set their own goals and work towards them. People who can manage their own time and priorities, and don't wait to be told what to do.
  - **view challenges as opportunities.** People who don't stop when things get tough—on the contrary, that's when the work starts to get really interesting.

  See [company culture](https://www.notion.so/Company-culture-8c295a7b95564f2da03aca6759413391?pvs=21) in our handbook to learn more.
`,
  },
  {
    summary: 'Can I use AI during the hiring process?',
    detail: `
  When testing candidates, we aim to simulate the actual conditions they would work in. You may use generative AI tools during the hiring process in the same way you might use them in your day-to-day work—for example, to speed up the process of writing boilerplate code. 
    
  However, we ask that you don't use AI to generate complete solutions to technical challenges, nor to replace your own decision-making. We need to see your thought process and problem-solving skills—not the output of a machine learning model.
`,
  },
];

const render = createRender({
  options: {
    env: {
      SOURCE_CODE_REPO: '',
    },
  },
});

function renderFAQItem(faq: (typeof faqData)[0]) {
  return (
    <Accordion variant="outlined">
      <AccordionSummary
        expandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 20, color: 'primary.main' }} />}
      >
        <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
          {faq.summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ '& p:last-of-type': { mb: 0 } }}>
        <MarkdownElement renderedMarkdown={render(faq.detail)} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function CareersFaq() {
  return (
    <Section bg="transparent" cozy>
      <Typography id="faq" variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
        Frequently asked questions
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          {faqData.map((faq, index) => {
            if (index % 2 !== 0) {
              return null;
            }
            return renderFAQItem(faq);
          })}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {faqData.map((faq, index) => {
            if (index % 2 !== 1) {
              return null;
            }
            return renderFAQItem(faq);
          })}
          <Paper
            variant="outlined"
            sx={(theme) => ({
              p: 2,
              borderStyle: 'dashed',
              borderColor: 'divider',
              bgcolor: 'white',
              ...theme.applyDarkStyles({
                bgcolor: 'primaryDark.800',
              }),
            })}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                Still have questions?
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', my: 1, textAlign: 'left' }}>
              Feel free to reach out with any other questions you might have about our hiring
              process.
            </Typography>
            <Link href="mailto:job@mui.com" variant="body2">
              Email us <KeyboardArrowRightRounded fontSize="small" />
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Section>
  );
}
