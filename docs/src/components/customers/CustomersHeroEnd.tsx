import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Section from 'docs/src/layouts/Section';

function Placeholder() {
  return (
    <Box
      sx={{
        height: {
          xs: 202,
          sm: 180,
          md: 193,
        },
      }}
    />
  );
}
const CustomersCTA = dynamic(() => import('./CustomersCTA'), { loading: Placeholder });

export default function CustomersHeroEnd() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        background: `linear-gradient(180deg, #FFF 50%, ${(theme.vars || theme).palette.primary[50]} 100%)`,
        ...theme.applyDarkStyles({
          background: `linear-gradient(180deg, ${
            (theme.vars || theme).palette.primaryDark[900]
          } 50%, ${alpha(theme.palette.primary[900], 0.2)} 100%)`,
        }),
      })}
    >
      <Section bg="transparent" cozy>
        {inView ? <CustomersCTA /> : <Placeholder />}
      </Section>
    </Box>
  );
}
