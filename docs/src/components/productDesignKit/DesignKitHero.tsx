import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from '@mui/internal-core-docs/IconImage';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import {
  DesignKitImagesSet1,
  DesignKitImagesSet2,
  DesignKitTools,
} from 'docs/src/components/home/DesignKits';

export default function TemplateHero() {
  return (
    <HeroContainer
      linearGradient
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="body2"
            sx={[
              {
                fontWeight: 'bold',
              },
              (theme) => ({
                color: 'primary.600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'start' },
                '& > *': { mr: 1 },
                ...theme.applyDarkStyles({
                  color: 'primary.400',
                }),
              }),
            ]}
          >
            <IconImage width={28} height={28} loading="eager" name="product-designkits" /> Design
            Kits
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Material UI
            <br /> in your favorite
            <br /> <GradientText>design tool</GradientText>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3, maxWidth: 450 }}>
            Pick your favorite design tool to enjoy and use Material UI components. Boost
            consistency and facilitate communication when working with developers.
          </Typography>
          <GetStartedButtons
            primaryLabel="Buy now"
            primaryUrl="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=design-cta#design"
            secondaryLabel="Figma preview"
            secondaryUrl="https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x"
          />
        </Box>
      }
      right={
        <Box sx={{ position: 'relative', height: '100%', perspective: '1000px' }}>
          <DesignKitTools />
          <Box
            sx={(theme) => ({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              background: `linear-gradient(90deg, ${alpha(
                theme.palette.primaryDark[900],
                0.8,
              )} 1%, ${alpha(theme.palette.primaryDark[900], 0.1)})`,
              opacity: 0,
              ...theme.applyDarkStyles({
                opacity: 1,
              }),
            })}
          />
          <Box
            sx={{
              left: '40%',
              position: 'absolute',
              display: 'flex',
              transform: 'translateX(-40%) rotateZ(30deg) rotateX(8deg) rotateY(-8deg)',
              transformOrigin: 'center center',
            }}
          >
            <DesignKitImagesSet1
              keyframes={{
                '0%': {
                  transform: 'translateY(-200px)',
                },
                '100%': {
                  transform: 'translateY(0px)',
                },
              }}
            />
            <DesignKitImagesSet2
              keyframes={{
                '0%': {
                  transform: 'translateY(150px)',
                },
                '100%': {
                  transform: 'translateY(-80px)',
                },
              }}
              sx={{ ml: { xs: 2, sm: 4, md: 8 } }}
            />
          </Box>
        </Box>
      }
    />
  );
}
