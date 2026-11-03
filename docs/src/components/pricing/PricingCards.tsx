import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconImage from '@mui/internal-core-docs/IconImage';
import LicenseModelSwitch from 'docs/src/components/pricing/LicenseModelSwitch';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from '@mui/internal-core-docs/Link';
import {
  ProSupportIcon,
  PremiumSupportIcon,
  PrioritySupportIcon,
} from 'docs/src/components/pricing/SupportIcons';
import MultiAppSwitch from 'docs/src/components/pricing/MultiAppSwitch';
import { MultiAppProvider, useMultiApp } from 'docs/src/components/pricing/MultiAppContext';

export interface Feature {
  primaryLabel?: React.ReactNode;
  secondaryLabel?: string;
  icon?: 'support' | 'check';
  supportType?: 'community' | 'pro' | 'premium' | 'priority';
}

function highlightText(text: string): React.ReactNode {
  return (
    <Typography
      component="span"
      variant="body2"
      sx={{ color: 'primary.main', fontWeight: 500, px: 0.5 }}
    >
      {text}
    </Typography>
  );
}

export type PlanName = 'community' | 'pro' | 'premium' | 'enterprise';

export const planInfo: Record<
  PlanName,
  {
    iconName: string;
    title: string;
    description: string;
    features: Feature[];
  }
> = {
  community: {
    iconName: 'pricing/x-plan-community',
    title: 'Community',
    description: 'Get started with the industry-standard React UI library, MIT-licensed.',
    features: [
      {
        icon: 'check',
        supportType: 'community',
        primaryLabel: 'Community support',
      },
      { primaryLabel: '40+ free components', icon: 'check' },
    ],
  },
  pro: {
    iconName: 'pricing/x-plan-pro',
    title: 'Pro',
    description: 'Best for professional developers or startups building data-rich applications.',
    features: [
      {
        primaryLabel: <React.Fragment>{highlightText('Pro')} support</React.Fragment>,
        icon: 'support',
        supportType: 'pro',
      },
      {
        primaryLabel: <React.Fragment>MUI X {highlightText('Pro')} access</React.Fragment>,
        icon: 'check',
      },
      {
        primaryLabel: <React.Fragment>10+ {highlightText('Pro')} features</React.Fragment>,
        icon: 'check',
      },
    ],
  },
  premium: {
    iconName: 'pricing/x-plan-premium',
    title: 'Premium',
    description:
      'The most advanced features for data-rich applications along with standard support.',
    features: [
      {
        primaryLabel: <React.Fragment>{highlightText('Premium')} support</React.Fragment>,
        icon: 'support',
        supportType: 'premium',
      },
      { primaryLabel: 'Access new features first', icon: 'check' },
      {
        primaryLabel: <React.Fragment>MUI X {highlightText('Premium')} access</React.Fragment>,
        icon: 'check',
      },
      {
        primaryLabel: <React.Fragment>5+ {highlightText('Premium')} features</React.Fragment>,
        icon: 'check',
      },
    ],
  },
  enterprise: {
    iconName: 'pricing/x-plan-enterprise',
    title: 'Enterprise',
    description:
      'All features of Premium coupled with enterprise-grade support and customer success.',
    features: [
      {
        primaryLabel: <React.Fragment>{highlightText('Priority')} support</React.Fragment>,
        icon: 'support',
        supportType: 'priority',
      },
      { primaryLabel: 'Multi-app license included', icon: 'check' },
      { primaryLabel: 'Technical support for all libraries', icon: 'check' },
      { primaryLabel: 'Guaranteed response time', icon: 'check' },
      { primaryLabel: 'Pre-screening', icon: 'check' },
      { primaryLabel: 'Issue escalation', icon: 'check' },
      { primaryLabel: 'Customer Success Manager', icon: 'check' },
      { primaryLabel: 'Available from 15 seats', icon: 'check' },
    ],
  },
};

export const multiAppPlanInfo: Partial<Record<PlanName, Feature[]>> = {
  pro: [
    {
      primaryLabel: <React.Fragment>{highlightText('Pro')} support</React.Fragment>,
      icon: 'support',
      supportType: 'pro',
    },
    { primaryLabel: 'Multi-app license included', icon: 'check' },
    {
      primaryLabel: <React.Fragment>MUI X {highlightText('Pro')} access</React.Fragment>,
      icon: 'check',
    },
    {
      primaryLabel: <React.Fragment>10+ {highlightText('Pro')} features</React.Fragment>,
      icon: 'check',
    },
  ],
  premium: [
    {
      primaryLabel: <React.Fragment>{highlightText('Premium')} support</React.Fragment>,
      icon: 'support',
      supportType: 'premium',
    },
    { primaryLabel: 'Multi-app license included', icon: 'check' },
    { primaryLabel: 'Access new features first', icon: 'check' },
    {
      primaryLabel: <React.Fragment>MUI X {highlightText('Premium')} access</React.Fragment>,
      icon: 'check',
    },
    {
      primaryLabel: <React.Fragment>5+ {highlightText('Premium')} features</React.Fragment>,
      icon: 'check',
    },
  ],
};

export function getPlanFeatures(plan: PlanName, multiApp: boolean): Feature[] {
  if (multiApp && (plan === 'pro' || plan === 'premium') && multiAppPlanInfo[plan]) {
    return multiAppPlanInfo[plan]!;
  }
  return planInfo[plan].features;
}

const previousPlanNames: Record<PlanName, string> = {
  community: '',
  pro: 'Community',
  premium: 'Pro',
  enterprise: 'Premium',
};

function getPreviousPlanName(plan: PlanName): string {
  return previousPlanNames[plan];
}

const formatter = new Intl.NumberFormat('en-US');

function formatCurrency(value: number) {
  return `$${formatter.format(value)}`;
}

function PlanPriceDisplay({
  price,
  priceUnit,
  priceExplanation,
  priceColor = 'primary.main',
  href,
  buttonText = 'Buy now',
  buttonVariant = 'contained',
}: {
  price: number | string;
  priceUnit?: string;
  priceExplanation: React.ReactNode;
  priceColor?: string;
  href: string;
  buttonText?: string;
  buttonVariant?: 'contained' | 'outlined';
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {/* Main price */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75 }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'semiBold', color: priceColor }}>
          {typeof price === 'number' ? formatCurrency(price) : price}
        </Typography>
        {priceUnit && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: '3px' }}>
            {priceUnit}
          </Typography>
        )}
      </Box>
      {/* Monthly price breakdown */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          fontSize: '0.8125rem',
        }}
      >
        {priceExplanation}
      </Typography>
      <Button
        component={Link}
        noLinkStyle
        href={href}
        variant={buttonVariant}
        fullWidth
        endIcon={<KeyboardArrowRightRounded />}
        sx={{ py: 1, mt: 2, mb: 2 }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

interface PlanPriceProps {
  plan: 'community' | 'pro' | 'premium' | 'enterprise';
  multiApp?: boolean;
}

export function PlanPrice(props: PlanPriceProps) {
  const { plan, multiApp = false } = props;

  const { licenseModel } = useLicenseModel();
  const annual = licenseModel === 'annual';

  if (plan === 'community') {
    return (
      <PlanPriceDisplay
        price="Free"
        priceExplanation="Free forever!"
        priceColor="success.600"
        href="/material-ui/getting-started/usage/"
        buttonText="Get started"
        buttonVariant="outlined"
      />
    );
  }

  const priceUnit = annual ? '/ year / dev' : '/ dev';
  const getPriceExplanation = (displayedValue: number) => {
    if (annual) {
      return (
        <React.Fragment>
          Equivalent to <strong>${displayedValue.toFixed(2)}</strong> / month / dev
        </React.Fragment>
      );
    }
    return '';
  };

  const getProStoreUrl = (license: string, isMultiApp: boolean) => {
    if (isMultiApp) {
      return license === 'annual'
        ? 'https://mui.com/store/items/mui-x-pro/?addons=mui-x-multi-app-license'
        : 'https://mui.com/store/items/mui-x-pro-perpetual/?addons=mui-x-multi-app-license';
    }
    return license === 'annual'
      ? 'https://mui.com/store/items/mui-x-pro/'
      : 'https://mui.com/store/items/mui-x-pro-perpetual/';
  };

  if (plan === 'pro') {
    const annualValue = 299;
    const perpetualValue = 657;
    const monthlyValueForAnnual = annualValue / 12;

    const proAnnualValueWithMultiApp = 499;
    const proPerpetualValueWithMultiApp = 1097;
    const proMonthlyValueForAnnualWithMultiApp =
      Math.round((proAnnualValueWithMultiApp / 12) * 100) / 100;

    let priceForExplanation: number;
    if (multiApp) {
      priceForExplanation = proMonthlyValueForAnnualWithMultiApp;
    } else if (annual) {
      priceForExplanation = monthlyValueForAnnual;
    } else {
      priceForExplanation = perpetualValue;
    }

    let mainDisplayValue: number = annual ? annualValue : perpetualValue;
    if (annual && multiApp) {
      mainDisplayValue = proAnnualValueWithMultiApp;
    } else if (!annual && multiApp) {
      mainDisplayValue = proPerpetualValueWithMultiApp;
    } else if (annual && !multiApp) {
      mainDisplayValue = annualValue;
    } else if (!annual && !multiApp) {
      mainDisplayValue = perpetualValue;
    }

    return (
      <PlanPriceDisplay
        price={mainDisplayValue}
        priceUnit={priceUnit}
        priceExplanation={getPriceExplanation(priceForExplanation)}
        href={getProStoreUrl(licenseModel, multiApp)}
        buttonVariant="outlined"
      />
    );
  }

  if (plan === 'premium') {
    const premiumAnnualValue = 599;
    const premiumPerpetualValue = 1318;
    const premiumMonthlyValueForAnnual = premiumAnnualValue / 12;

    const premiumAnnualValueWithPrioritySupport = 999;
    const premiumPerpetualValueWithPrioritySupport = 2198;
    const premiumMonthlyValueForAnnualWithPrioritySupport =
      Math.round((premiumAnnualValueWithPrioritySupport / 12) * 100) / 100;

    let premiumDisplayedValue: number = premiumAnnualValue;
    if (annual && multiApp) {
      premiumDisplayedValue = premiumAnnualValueWithPrioritySupport;
    } else if (!annual && multiApp) {
      premiumDisplayedValue = premiumPerpetualValueWithPrioritySupport;
    } else if (annual && !multiApp) {
      premiumDisplayedValue = premiumAnnualValue;
    } else if (!annual && !multiApp) {
      premiumDisplayedValue = premiumPerpetualValue;
    }

    return (
      <PlanPriceDisplay
        price={premiumDisplayedValue}
        priceUnit={priceUnit}
        priceExplanation={getPriceExplanation(
          multiApp ? premiumMonthlyValueForAnnualWithPrioritySupport : premiumMonthlyValueForAnnual,
        )}
        href={getHref(annual, multiApp)}
      />
    );
  }

  if (plan === 'enterprise') {
    const enterpriseAnnualValue = 1399;
    const enterprisePerpetualValue = 2798;
    const enterpriseMonthlyValueForAnnual = enterpriseAnnualValue / 12;

    return (
      <PlanPriceDisplay
        price={annual ? enterpriseAnnualValue : enterprisePerpetualValue}
        priceUnit={priceUnit}
        priceExplanation={getPriceExplanation(enterpriseMonthlyValueForAnnual)}
        href="mailto:sales@mui.com"
        buttonText="Contact Sales"
        buttonVariant="outlined"
      />
    );
  }

  return null;
}

function getHref(annual: boolean, prioritySupport: boolean): string {
  if (annual && prioritySupport) {
    return 'https://mui.com/store/items/mui-x-premium/?addons=mui-x-priority-support';
  }
  if (!annual && prioritySupport) {
    return 'https://mui.com/store/items/mui-x-premium-perpetual/?addons=mui-x-priority-support';
  }
  if (annual && !prioritySupport) {
    return 'https://mui.com/store/items/mui-x-premium/';
  }
  return 'https://mui.com/store/items/mui-x-premium-perpetual/';
}

export function FeatureItem({ feature, idPrefix }: { feature: Feature; idPrefix?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        pl: feature.icon === 'check' ? 0.4 : null,
      }}
    >
      {feature.icon === 'check' && (
        <IconImage name="pricing/yes" sx={{ fontSize: 20, color: 'primary.main', mt: '2px' }} />
      )}
      {feature.icon === 'support' && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
          }}
        >
          {(() => {
            if (feature.supportType === 'pro') {
              return <ProSupportIcon idPrefix={idPrefix} />;
            }
            if (feature.supportType === 'premium') {
              return <PremiumSupportIcon idPrefix={idPrefix} />;
            }
            if (feature.supportType === 'priority') {
              return <PrioritySupportIcon idPrefix={idPrefix} />;
            }
            return null;
          })()}
        </Box>
      )}
      <div>
        <Typography
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {feature.primaryLabel}
        </Typography>
        {feature.secondaryLabel && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
            {feature.secondaryLabel}
          </Typography>
        )}
      </div>
    </Box>
  );
}

export function PlanNameDisplay({
  plan,
  disableDescription = true,
}: {
  plan: keyof typeof planInfo;
  disableDescription?: boolean;
}) {
  const { title, iconName, description } = planInfo[plan];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'center',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconImage name={iconName} mode="" loading="eager" />
        <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
          {title}
        </Typography>
      </Box>

      {!disableDescription && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            textAlign: 'start',
            justifyContent: 'center',
            alignItems: 'baseline',
            mt: 1,
            minHeight: { xs: 0, md: 96 },
            lineHeight: '24px',
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

interface PricingCardWrapperProps {
  plan: PlanName;
  highlighted?: boolean;
}

function PricingCardWrapper({ plan, highlighted = false }: PricingCardWrapperProps) {
  const { multiApp } = useMultiApp();

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        border: '1px solid',
        borderColor: highlighted ? 'primary.200' : 'divider',
        borderRadius: 1,
        flexDirection: 'column',
        gap: 2,
        py: 3,
        px: 2,
        flex: '1 1 0px',
        ...(highlighted && {
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          boxShadow: '0px 2px 12px 0px rgba(234, 237, 241, 0.3) inset',
          ...theme.applyDarkStyles({
            borderColor: `${alpha(theme.palette.primary[700], 0.4)}`,
            boxShadow: '0px 2px 12px 0px rgba(0, 0, 0, 0.25) inset',
          }),
        }),
      })}
    >
      <Box
        sx={{
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <PlanNameDisplay plan={plan} disableDescription={false} />
        <PlanPrice plan={plan} multiApp={multiApp} />
      </Box>
      {plan !== 'community' && plan !== 'enterprise' && <MultiAppSwitch />}
      <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {plan !== 'community' && (
          <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            Everything in {getPreviousPlanName(plan)} plan and...
          </Typography>
        )}

        {getPlanFeatures(plan, multiApp).map((feature, index) => (
          <FeatureItem feature={feature} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default function PricingCards() {
  return (
    <React.Fragment>
      <LicenseModelSwitch />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          mt: 3,
          mb: 8,
          gap: 2,
          mx: 'auto',
          maxWidth: '100%',
        }}
      >
        <PricingCardWrapper plan="community" />
        <MultiAppProvider>
          <PricingCardWrapper plan="pro" />
        </MultiAppProvider>
        <MultiAppProvider>
          <PricingCardWrapper plan="premium" highlighted />
        </MultiAppProvider>
        <PricingCardWrapper plan="enterprise" />
      </Box>
    </React.Fragment>
  );
}
