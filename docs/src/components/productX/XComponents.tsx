import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import XComponentsSwitcher from 'docs/src/components/productX/XComponentsSwitcher';
import XGridFullDemo from 'docs/src/components/productX/XGridFullDemo';
import XDateRangeDemo from 'docs/src/components/productX/XDateRangeDemo';
import XTreeViewDemo from 'docs/src/components/productX/XTreeViewDemo';
import XChartsDemo from 'docs/src/components/productX/XChartsDemo';

export default function XComponents() {
  const [componentIndex, setComponentIndex] = React.useState(0);
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid size={{ md: 6 }}>
          <SectionHeadline
            overline="Advanced React component library"
            title={
              <Typography variant="h2">
                Powerful components for <GradientText>advanced use cases</GradientText>
              </Typography>
            }
            description="The MUI X packages can power complex and data-intensive applications across a wide spectrum of use cases."
          />
          <XComponentsSwitcher
            componentIndex={componentIndex}
            setComponentIndex={setComponentIndex}
          />
        </Grid>
        <Grid
          sx={componentIndex === 0 ? { minHeight: { xs: 'auto', sm: 757, md: 'unset' } } : {}}
          size={{ xs: 12, md: 6 }}
        >
          <React.Fragment>
            {componentIndex === 0 && <XGridFullDemo />}
            {componentIndex === 1 && <XDateRangeDemo />}
            {componentIndex === 2 && <XChartsDemo />}
            {componentIndex === 3 && <XTreeViewDemo />}
          </React.Fragment>
        </Grid>
      </Grid>
    </Section>
  );
}
