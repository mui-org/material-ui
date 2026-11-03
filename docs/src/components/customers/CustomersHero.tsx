import Section from 'docs/src/layouts/Section';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from '../typography/GradientText';

export default function CustomersHero() {
  return (
    <Section cozy noPaddingBottom>
      <SectionHeadline
        alwaysCenter
        overline="Customers"
        title={
          <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
            Meet the <GradientText color="primary">teams</GradientText>
            <br />
            powered by <GradientText color="primary">MUI</GradientText>
          </Typography>
        }
        description="See how MUI's comprehensive suite of UI tools helps them ship better and faster."
      />
    </Section>
  );
}
