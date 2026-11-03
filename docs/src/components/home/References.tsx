import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import {
  CORE_CUSTOMERS,
  ADVANCED_CUSTOMERS,
  DESIGNKITS_CUSTOMERS,
  TEMPLATES_CUSTOMERS,
} from 'docs/src/components/home/CompaniesGrid';

export { CORE_CUSTOMERS, ADVANCED_CUSTOMERS, DESIGNKITS_CUSTOMERS, TEMPLATES_CUSTOMERS };

const CompaniesGrid = dynamic(() => import('./CompaniesGrid'));

export default function References({
  companies,
}: {
  companies:
    | typeof CORE_CUSTOMERS
    | typeof ADVANCED_CUSTOMERS
    | typeof DESIGNKITS_CUSTOMERS
    | typeof TEMPLATES_CUSTOMERS;
}) {
  return (
    <Section cozy bg="transparent">
      <Box sx={{ minHeight: { xs: 236, sm: 144, md: 52 } }}>
        <CompaniesGrid data={companies} />
      </Box>
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          mt: 4,
          mx: 'auto',
          maxWidth: 400,

          // hard-coded to reduce CLS (layout shift)
          minHeight: 42,
        }}
      >
        The world&apos;s best product teams trust MUI to deliver an unrivaled experience for both
        developers and users.
      </Typography>
    </Section>
  );
}
