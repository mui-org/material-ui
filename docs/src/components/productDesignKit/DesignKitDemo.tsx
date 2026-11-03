import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TextFieldsRounded from '@mui/icons-material/TextFieldsRounded';
import WidgetsRounded from '@mui/icons-material/WidgetsRounded';
import ToggleOnRounded from '@mui/icons-material/ToggleOnRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Item, Group, Highlighter, More, Frame } from '@mui/internal-core-docs/AppLayout';
import { Link } from '@mui/internal-core-docs/Link';

const DEMOS = ['Components', 'Branding', 'Iconography'];

const Image = styled('img')(({ theme }) => ({
  transition: '0.4s',
  display: 'block',
  height: 'auto',
  borderRadius: 6,
  border: '1px solid',
  borderColor: theme.palette.divider,
  filter: `drop-shadow(-2px 4px 6px ${alpha(theme.palette.grey[500], 0.5)})`,
  ...theme.applyDarkStyles({
    filter: `drop-shadow(-2px 4px 6px ${alpha(theme.palette.common.black, 0.2)})`,
    borderColor: theme.palette.primaryDark[600],
  }),
}));

interface MaterialFigmaComponentsProps {
  fadeIn?: boolean;
}

export function MaterialFigmaComponents({ fadeIn }: MaterialFigmaComponentsProps) {
  return (
    <Fade in={fadeIn} timeout={500}>
      <Box
        sx={[
          {
            width: '100%',
            height: '100%',
            '& img': {
              position: 'absolute',
              left: '50%',
              width: { xs: 220, sm: 300 },
              '&:nth-of-type(1)': {
                top: 120,
                transform: 'translate(-70%)',
              },
              '&:nth-of-type(2)': {
                top: 80,
                transform: 'translate(-50%)',
              },
              '&:nth-of-type(3)': {
                top: 40,
                transform: 'translate(-30%)',
              },
            },
            '&:hover': {
              '& img': {
                filter: 'drop-shadow(-16px 12px 20px rgba(61, 71, 82, 0.2))',
                '&:nth-of-type(1)': {
                  top: 0,
                  transform: 'scale(0.8) translate(-110%) rotateY(30deg)',
                },
                '&:nth-of-type(2)': {
                  top: 40,
                  transform: 'scale(0.8) translate(-60%) rotateY(30deg)',
                },
                '&:nth-of-type(3)': {
                  top: 40,
                  transform: 'scale(0.8) translate(-10%) rotateY(30deg)',
                },
              },
            },
          },
          (theme) =>
            theme.applyDarkStyles({
              '&:hover': {
                '& img': {
                  filter: 'drop-shadow(-16px 12px 20px rgba(0, 0, 0, 0.4))',
                },
              },
            }),
        ]}
      >
        <Image
          src="/static/branding/design-kits/Button-light.jpeg"
          alt="Material UI Button component variations in the Figma Design Kit."
          loading="lazy"
          sx={(theme) =>
            theme.applyDarkStyles({
              content: `url(/static/branding/design-kits/Button-dark.jpeg)`,
            })
          }
        />
        <Image
          src="/static/branding/design-kits/Alert-light.jpeg"
          alt="Material UI Alert component variations in the Figma Design Kit."
          loading="lazy"
          sx={(theme) =>
            theme.applyDarkStyles({
              content: `url(/static/branding/design-kits/Alert-dark.jpeg)`,
            })
          }
        />
        <Image
          src="/static/branding/design-kits/Slider-light.jpeg"
          alt="Material UI Slider component variations in the Figma Design Kit."
          loading="lazy"
          sx={(theme) =>
            theme.applyDarkStyles({
              content: `url(/static/branding/design-kits/Slider-dark.jpeg)`,
            })
          }
        />
      </Box>
    </Fade>
  );
}

export function MaterialDesignKitInfo() {
  return (
    <Frame.Info data-mui-color-scheme="dark">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 'semiBold' }}>
          Available in:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, '& >img': { width: 20, height: 20 } }}>
          <img src="/static/branding/design-kits/figma-logo.svg" alt="Figma logo." loading="lazy" />
          <img
            src="/static/branding/design-kits/sketch-logo.svg"
            alt="Sketch logo."
            loading="lazy"
          />
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        We frequently update them to stay up-to-date with the latest release.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
        <Button
          component={Link}
          variant="contained"
          size="small"
          noLinkStyle
          href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=design-cta2#design"
          endIcon={<ChevronRightRoundedIcon />}
        >
          Buy it now
        </Button>
        <Button
          component={Link}
          variant="outlined"
          size="small"
          color="secondary"
          href="https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x"
          startIcon={
            <img
              src="/static/branding/design-kits/figma-logo.svg"
              alt=""
              loading="lazy"
              style={{ width: 16, height: 16 }}
            />
          }
        >
          Figma Preview
        </Button>
      </Box>
    </Frame.Info>
  );
}

export default function DesignKitsDemo() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <ToggleOnRounded fontSize="small" />,
    [DEMOS[1]]: <TextFieldsRounded fontSize="small" />,
    [DEMOS[2]]: <WidgetsRounded fontSize="small" />,
  };
  return (
    <Section bg="gradient" cozy>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Design Kits"
            title={
              <Typography variant="h2">
                Enhance your <GradientText>design workflow</GradientText>
              </Typography>
            }
            description="The Design Kits contain many of the Material UI components with states, variations, colors, typography, and icons."
          />
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item
                  icon={React.cloneElement(icons[name], name === demo ? { color: 'primary' } : {})}
                  title={name}
                />
              </Highlighter>
            ))}
            <More
              component={Link}
              href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=design-cta3#design"
              noLinkStyle
            />
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Frame>
            <Frame.Demo sx={{ overflow: 'clip', height: { xs: 240, sm: 390 } }}>
              <MaterialFigmaComponents fadeIn={demo === 'Components'} />
              <Fade in={demo === 'Branding'} timeout={500}>
                <Image
                  src="/static/branding/design-kits/Colors-light.jpeg"
                  alt="Available colors on the Material UI Kit."
                  loading="lazy"
                  width="300"
                  sx={(theme) => ({
                    width: { sm: 400 },
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    ...theme.applyDarkStyles({
                      content: `url(/static/branding/design-kits/Colors-dark.jpeg)`,
                    }),
                  })}
                />
              </Fade>
              <Fade in={demo === 'Iconography'} timeout={500}>
                <Image
                  src="/static/branding/design-kits/Icons-light.jpeg"
                  alt="A bunch of icons available with the Material UI Design Kits."
                  loading="lazy"
                  width="300"
                  sx={(theme) => ({
                    width: { sm: 500 },
                    position: 'absolute',
                    left: '50%',
                    top: 60,
                    transform: 'translate(-40%)',
                    ...theme.applyDarkStyles({
                      content: `url(/static/branding/design-kits/Icons-dark.jpeg)`,
                    }),
                  })}
                />
              </Fade>
            </Frame.Demo>
            <MaterialDesignKitInfo />
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
