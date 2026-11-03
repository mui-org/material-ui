import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';
import SwitchAccessShortcutRoundedIcon from '@mui/icons-material/SwitchAccessShortcutRounded';
import DragHandleRounded from '@mui/icons-material/DragHandleRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Item, Group, Highlighter, Frame } from '@mui/internal-core-docs/AppLayout';
import RealEstateCard from 'docs/src/components/showcase/RealEstateCard';
import FlashCode from 'docs/src/components/animation/FlashCode';
import useResizeHandle from 'docs/src/modules/utils/useResizeHandle';

const code = `
<Card
  variant="outlined"
  sx={{ p: 2, display: 'flex', flexWrap: 'wrap', zIndex: 1 }}
>
  <CardMedia
    component="img"
    width="100"
    height="100"
    alt="123 Main St, Phoenix, AZ cover"
    src="/images/real-estate.png"
    sx={{
      borderRadius: '6px',
      width: { xs: '100%', sm: 100 },
    }}
  />
  <Box sx={{ alignSelf: 'center', ml: 2 }}>
    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'regular' }}>
      123 Main St, Phoenix, AZ, USA
    </Typography>
    <Typography sx={{ fontWeight: 'bold' }} noWrap gutterBottom>
      $280k - $310k
    </Typography>
    <Chip
      size="small"
      variant="outlined"
      icon={<InfoRounded />}
      label="Confidence score: 85%"
      sx={(theme) => ({
        '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'success.500' },
        bgcolor: 'success.50',
        borderColor: 'success.100',
        color: 'success.900',
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.700',
          color: 'success.200',
          borderColor: 'success.900',
        }),
      })}
    />
  </Box>
</Card>`;

const startLine = [27, 15, 12];
const endLine = [37, 20, 12];
const scrollTo = [27, 10, 4];

export default function MaterialStyling() {
  const [index, setIndex] = React.useState(0);
  const objectRef = React.useRef<HTMLDivElement>(null);
  const { dragging, getDragHandlers } = useResizeHandle(objectRef, { minWidth: '253px' });
  const infoRef = React.useRef<HTMLDivElement>(null);

  const getSelectedProps = (i: number) => ({
    selected: index === i,
    sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
  });

  React.useEffect(() => {
    // 18px line-height
    // 16px margin-top
    // 1px border-width
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    infoRef.current!.scroll({
      top: scrollTo[index] * 18 + 16 - 1,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });

    objectRef.current!.style.setProperty('width', '100%');
  }, [index]);

  return (
    <Section>
      <Grid container spacing={2}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Styling"
            title={
              <Typography variant="h2">
                Rapidly add and tweak any styles using <GradientText>CSS utilities</GradientText>
              </Typography>
            }
            description="CSS utilities allow you to move faster and make for a smooth developer experience when styling any component."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<StyleRoundedIcon color="primary" />}
                title="Leverage the tokens from your theme"
                description="Easily use the design tokens defined in your theme for any CSS property out there."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<SwitchAccessShortcutRoundedIcon color="primary" />}
                title="No context switching"
                description="The styling and component usage are both in the same place, right where you need them."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<DevicesOtherRoundedIcon color="primary" />}
                title="Responsive styles right inside system prop"
                description="An elegant API for writing CSS media queries that match your theme breakpoints."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo sx={{ overflow: 'auto' }}>
              <Box
                ref={objectRef}
                style={{ touchAction: dragging ? 'none' : 'auto' }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  p: { xs: 2, sm: 5 },
                  pr: { xs: 2, sm: 3 },
                  minHeight: index === 2 ? 280 : 'initial',
                  backgroundColor: 'transparent',
                }}
              >
                {index === 2 && (
                  <React.Fragment>
                    <Box
                      sx={[
                        {
                          cursor: 'col-resize',
                          display: 'flex',
                          alignItems: 'center',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          height: '100%',
                          color: 'grey.500',
                          '&:hover': {
                            color: 'grey.700',
                          },
                        },
                        (theme) =>
                          theme.applyDarkStyles({
                            color: 'grey.500',
                            '&:hover': {
                              color: 'grey.300',
                            },
                          }),
                      ]}
                      {...getDragHandlers()}
                    >
                      <DragHandleRounded sx={{ transform: 'rotate(90deg)' }} />
                    </Box>
                    <Box
                      sx={(theme) => ({
                        pointerEvents: 'none',
                        width: '1px',
                        bgcolor: 'grey.200',
                        position: 'absolute',
                        left: { xs: 335, sm: 375 },
                        height: '100%',
                        ...theme.applyDarkStyles({
                          bgcolor: 'divider',
                        }),
                      })}
                    >
                      <Box
                        sx={(theme) => ({
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          fontFamily: 'code',
                          left: -30,
                          color: 'text.secondary',
                          borderRadius: '4px',
                          bgcolor: 'grey.50',
                          border: '1px solid',
                          borderColor: 'grey.200',
                          px: 0.5,
                          ...theme.applyDarkStyles({
                            bgcolor: 'primaryDark.700',
                            borderColor: 'primaryDark.600',
                          }),
                        })}
                      >
                        xs
                      </Box>
                      <Box
                        sx={(theme) => ({
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          fontFamily: 'code',
                          left: 7,
                          color: 'text.secondary',
                          borderRadius: '4px',
                          bgcolor: 'grey.50',
                          border: '1px solid',
                          borderColor: 'grey.200',
                          px: 0.5,
                          ...theme.applyDarkStyles({
                            bgcolor: 'primaryDark.700',
                            borderColor: 'primaryDark.600',
                          }),
                        })}
                      >
                        sm
                      </Box>
                    </Box>
                  </React.Fragment>
                )}
                <RealEstateCard sx={{ width: '100%', maxWidth: 343 }} />
              </Box>
            </Frame.Demo>
            <Frame.Info
              ref={infoRef}
              sx={{
                maxHeight: index === 2 ? 282 : 400,
                overflow: 'auto',
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-block', minWidth: '100%' }}>
                <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
                <FlashCode startLine={startLine[index]} endLine={endLine[index]} />
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
