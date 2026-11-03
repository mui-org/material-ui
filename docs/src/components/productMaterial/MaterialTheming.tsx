import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Item, Group, Highlighter, Frame } from '@mui/internal-core-docs/AppLayout';
import { SvgMaterialDesignIcon } from '@mui/internal-core-docs/svgIcons';

import PlayerCard from 'docs/src/components/showcase/PlayerCard';

const defaultTheme = createTheme({ cssVariables: true });

const code = `
<Card
  variant="outlined"
  sx={{  p: 2,
    width: { xs: '100%', sm: 'auto' },
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'center',
    gap: 2,
  }}
>
  <CardMedia
    component="img"
    width="100"
    height="100"
    alt="Contemplative Reptile album cover"
    src="/images/contemplative-reptile.jpg"
    sx={{    width: { xs: '100%', sm: 100 },
    }}
  />
  <Stack direction="column" sx={{ alignItems: 'center' }} spacing={1} useFlexGap>
    <div>
      <Typography sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
        Contemplative Reptile
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 'medium', textAlign: 'center', width: '100%' }}
      >
        Sounds of Nature
      </Typography>
    </div>
    <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1} useFlexGap>
      <IconButton aria-label="Shuffle" disabled size="small">
        <ShuffleRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Fast rewind" disabled size="small">
        <FastRewindRounded fontSize="small" />
      </IconButton>
      <IconButton
        aria-label={paused ? 'Play music' : 'Pause music'}
        onClick={() => setPaused((val) => !val)}
        sx={{ mx: 1 }}
      >
        {paused ? <PlayArrowRounded /> : <PauseRounded />}
      </IconButton>
      <IconButton aria-label="Fast forward" disabled size="small">
        <FastForwardRounded fontSize="small" />
      </IconButton>
      <IconButton aria-label="Loop music" disabled size="small">
        <LoopRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  </Stack>
</Card>`;

export default function MaterialTheming() {
  const [customized, setCustomized] = React.useState(true);
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Theming"
            title={
              <Typography variant="h2">
                Build <GradientText>your design system</GradientText> just as you want it to be
              </Typography>
            }
            description="Start quickly with Material Design or use the advanced theming feature to easily tailor the components to your needs."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder selected={customized} onClick={() => setCustomized(true)}>
              <Item
                icon={<AutoAwesomeRounded color="warning" />}
                title="Custom Theme"
                description="Theming allows you to use your brand's design tokens, easily making the components reflect its look and feel."
              />
            </Highlighter>
            <Highlighter disableBorder selected={!customized} onClick={() => setCustomized(false)}>
              <Item
                icon={<SvgMaterialDesignIcon />}
                title="Material Design"
                description="Every component comes with Google's tried and tested design system ready for use."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                p: 2,
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 188,
              }}
            >
              {customized ? (
                <PlayerCard />
              ) : (
                <ThemeProvider theme={defaultTheme}>
                  <PlayerCard disableTheming />
                </ThemeProvider>
              )}
            </Frame.Demo>
            <Frame.Info sx={{ maxHeight: 300, overflow: 'auto' }}>
              <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
