import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PricingTable from 'docs/src/components/pricing/PricingTable';
import {
  PlanPrice,
  PlanNameDisplay,
  FeatureItem,
  getPlanFeatures,
} from 'docs/src/components/pricing/PricingCards';
import LicenseModelSwitch from 'docs/src/components/pricing/LicenseModelSwitch';
import MultiAppSwitch from 'docs/src/components/pricing/MultiAppSwitch';
import { useMultiApp } from 'docs/src/components/pricing/MultiAppContext';

const Plan = React.forwardRef<
  HTMLDivElement,
  {
    plan: 'community' | 'pro' | 'premium' | 'enterprise';

    unavailable?: boolean;
  } & PaperProps
>(function Plan({ plan, unavailable, sx, ...props }, ref) {
  const { multiApp } = useMultiApp();
  const features = getPlanFeatures(plan, multiApp);

  return (
    <Paper
      ref={ref}
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        ...(unavailable && { '& .MuiTypography-root': { opacity: 0.5 } }),
        ...sx,
      }}
      {...props}
    >
      <PlanNameDisplay plan={plan} disableDescription={false} />
      {(plan === 'pro' || plan === 'premium') && (
        <Box sx={{ alignSelf: 'flex-start' }}>
          <LicenseModelSwitch />
        </Box>
      )}
      <PlanPrice plan={plan} multiApp={multiApp} />
      {plan !== 'community' && plan !== 'enterprise' && <MultiAppSwitch />}
      <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {features.map((feature, index) => (
          <FeatureItem feature={feature} idPrefix={plan} key={index} />
        ))}
      </Box>
    </Paper>
  );
});

export default function PricingList() {
  const [planIndex, setPlanIndex] = React.useState(0);
  return (
    <React.Fragment>
      <Tabs
        value={planIndex}
        variant="fullWidth"
        onChange={(event, value) => setPlanIndex(value)}
        sx={[
          {
            mb: 2,
            position: 'sticky',
            top: 55,
            bgcolor: 'background.paper',
            zIndex: 1,
            mx: { xs: -2, sm: -3 },
            borderTop: '1px solid',
            borderColor: 'divider',
            '& .MuiTab-root': {
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&.Mui-selected': {
                bgcolor: 'grey.50',
              },
            },
          },
          (theme) =>
            theme.applyDarkStyles({
              '& .MuiTab-root': {
                '&.Mui-selected': {
                  bgcolor: 'primaryDark.800',
                },
              },
            }),
        ]}
      >
        <Tab label="Community" />
        <Tab
          label="Pro"
          sx={{ borderWidth: '0 1px 0 1px', borderStyle: 'solid', borderColor: 'divider' }}
        />
        <Tab
          label="Premium"
          sx={{ borderWidth: '0 1px 0 1px', borderStyle: 'solid', borderColor: 'divider' }}
        />
        <Tab label="Enterprise" />
      </Tabs>
      {planIndex === 0 && (
        <Fade in>
          <div>
            <Plan plan="community" />
            <PricingTable columnHeaderHidden plans={['community']} />
          </div>
        </Fade>
      )}
      {planIndex === 1 && (
        <Fade in>
          <div>
            <Plan plan="pro" />
            <PricingTable columnHeaderHidden plans={['pro']} />
          </div>
        </Fade>
      )}
      {planIndex === 2 && (
        <Fade in>
          <div>
            <Plan plan="premium" />
            <PricingTable columnHeaderHidden plans={['premium']} />
          </div>
        </Fade>
      )}
      {planIndex === 3 && (
        <Fade in>
          <div>
            <Plan plan="enterprise" />
            <PricingTable columnHeaderHidden plans={['enterprise']} />
          </div>
        </Fade>
      )}
    </React.Fragment>
  );
}
