import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import FormatShapesRoundedIcon from '@mui/icons-material/FormatShapesRounded';
import { StorybookIcon } from '@mui/internal-core-docs/svgIcons';
import ImagesearchRollerRoundedIcon from '@mui/icons-material/ImagesearchRollerRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Item, Group, Highlighter, Frame } from '@mui/internal-core-docs/AppLayout';
import { Link } from '@mui/internal-core-docs/Link';

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

export default function ConnectFeatures() {
  const [index, setIndex] = React.useState(0);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Available in Beta"
            title={
              <Typography variant="h2">
                The way developers and designers <GradientText>ship faster</GradientText>
              </Typography>
            }
            description="The Sync plugin is perfect for designing and developing using the Material UI React library and Design Kit."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<ImagesearchRollerRoundedIcon color="primary" />}
                title="Theme customization"
                description="Generate theme code with custom colors, typography styles, shadows, spacing values, and border-radius."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<FormatShapesRoundedIcon color="primary" />}
                title="Component customization"
                description="Fully customize a component's design across multiple states and then generate the corresponding theme code."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<StorybookIcon />}
                title="Preview your changes on Storybook"
                description="Quickly visualize all the changes you run through Sync on a built-in Storybook preview instance."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{ overflow: 'clip', height: { xs: 240, sm: 420 }, perspective: '1000px' }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  '& img': {
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                  },
                }}
              >
                {index === 0 && (
                  <Fade in={index === 0} timeout={500}>
                    <Box
                      sx={(theme) => ({
                        width: '100%',
                        height: '100%',
                        '& img': {
                          position: 'absolute',
                          '&:nth-of-type(1)': {
                            visibility: { xs: 'hidden', sm: 'visible' },
                            width: { xs: 240, sm: 600 },
                            top: 100,
                            left: '50%',
                            transform: 'translate(-40%)',
                          },
                          '&:nth-of-type(2)': {
                            width: { xs: 240, sm: 560 },
                            top: { xs: 100, sm: 40 },
                            left: { xs: '60%', sm: '40%' },
                            transform: {
                              xs: 'scale(1.8) translate(-20%)',
                              sm: 'scale(1) translate(0%)',
                            },
                          },
                        },
                        '&:hover': {
                          '& img': {
                            '&:nth-of-type(2)': {
                              top: { xs: 100, sm: 60 },
                              transform: {
                                xs: 'scale(1.8) translate(-20%)',
                                sm: 'scale(1.1) translate(-15%)',
                              },
                              filter: {
                                xs: 'auto',
                                sm: `drop-shadow(-16px 12px 20px ${alpha(
                                  theme.palette.grey[600],
                                  0.5,
                                )})`,
                              },
                            },
                          },
                        },
                        ...theme.applyDarkStyles({
                          '&:hover': {
                            '& img': {
                              '&:nth-of-type(2)': {
                                filter: {
                                  xs: 'auto',
                                  sm: `drop-shadow(-16px 12px 20px ${alpha(
                                    theme.palette.common.black,
                                    0.8,
                                  )})`,
                                },
                              },
                              filter: `drop-shadow(-16px 12px 20px ${alpha(
                                theme.palette.common.black,
                                0.2,
                              )})`,
                            },
                          },
                        }),
                      })}
                    >
                      <Image
                        src="/static/branding/design-kits/sync-base1-light.png"
                        alt="The Material UI Design Kit for Figma."
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/sync-base1-dark.png)`,
                          })
                        }
                      />
                      <Image
                        src="/static/branding/design-kits/sync-shot1-light.png"
                        alt="The Material UI Sync plugin displaying theme code."
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/sync-shot1-dark.png)`,
                          })
                        }
                      />
                    </Box>
                  </Fade>
                )}
                {index === 1 && (
                  <Fade in={index === 1} timeout={500}>
                    <Box
                      sx={(theme) => ({
                        width: '100%',
                        height: '100%',
                        '& img': {
                          position: 'absolute',
                          '&:nth-of-type(1)': {
                            visibility: { xs: 'hidden', sm: 'visible' },
                            width: { xs: 240, sm: 600 },
                            top: 100,
                            left: '50%',
                            transform: 'translate(-40%)',
                          },
                          '&:nth-of-type(2)': {
                            width: { xs: 240, sm: 560 },
                            top: { xs: 100, sm: 40 },
                            left: { xs: '60%', sm: '50%' },
                            transform: {
                              xs: 'scale(1.8) translate(-20%)',
                              sm: 'none',
                            },
                          },
                        },
                        '&:hover': {
                          '& img': {
                            '&:nth-of-type(2)': {
                              top: { xs: 100, sm: 60 },
                              transform: {
                                xs: 'scale(1.8) translate(-20%)',
                                sm: 'scale(1.1) translate(-30%)',
                              },
                              filter: {
                                xs: 'auto',
                                sm: `drop-shadow(-16px 12px 20px ${alpha(
                                  theme.palette.grey[600],
                                  0.5,
                                )})`,
                              },
                            },
                          },
                        },
                        ...theme.applyDarkStyles({
                          '&:hover': {
                            '& img': {
                              '&:nth-of-type(2)': {
                                filter: {
                                  xs: 'auto',
                                  sm: `drop-shadow(-16px 12px 20px ${alpha(
                                    theme.palette.common.black,
                                    0.8,
                                  )})`,
                                },
                              },
                              filter: `drop-shadow(-16px 12px 20px ${alpha(
                                theme.palette.common.black,
                                0.2,
                              )})`,
                            },
                          },
                        }),
                      })}
                    >
                      <Image
                        src="/static/branding/design-kits/sync-base2-light.png"
                        alt="The Material UI Design Kit for Figma."
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/sync-base2-dark.png)`,
                          })
                        }
                      />
                      <Image
                        src="/static/branding/design-kits/material-sync-light.png"
                        alt="The Material UI Sync plugin displaying theme code."
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/material-sync-dark.png)`,
                          })
                        }
                      />
                    </Box>
                  </Fade>
                )}
                {index === 2 && (
                  <Fade in={index === 2} timeout={500}>
                    <Box
                      sx={(theme) => ({
                        width: '100%',
                        height: '100%',
                        '& img': {
                          position: 'absolute',
                          '&:nth-of-type(1)': {
                            visibility: { xs: 'hidden', sm: 'visible' },
                            width: { xs: 240, sm: 600 },
                            top: 100,
                            left: '50%',
                            transform: 'translate(-40%)',
                          },
                          '&:nth-of-type(2)': {
                            width: { xs: 240, sm: 560 },
                            top: { xs: 100, sm: 40 },
                            left: { xs: '60%', sm: '40%' },
                            transform: {
                              xs: 'scale(1.8) translate(-20%)',
                              sm: 'none',
                            },
                          },
                        },
                        '&:hover': {
                          '& img': {
                            '&:nth-of-type(2)': {
                              top: { xs: 100, sm: 60 },
                              transform: {
                                xs: 'scale(1.8) translate(-20%)',
                                sm: 'scale(1.1) translate(-25%)',
                              },
                              filter: {
                                xs: 'auto',
                                sm: `drop-shadow(-16px 12px 20px ${alpha(
                                  theme.palette.grey[600],
                                  0.5,
                                )})`,
                              },
                            },
                          },
                        },
                        ...theme.applyDarkStyles({
                          '&:hover': {
                            '& img': {
                              '&:nth-of-type(2)': {
                                filter: {
                                  xs: 'auto',
                                  sm: `drop-shadow(-16px 12px 20px ${alpha(
                                    theme.palette.common.black,
                                    0.8,
                                  )})`,
                                },
                              },
                              filter: `drop-shadow(-16px 12px 20px ${alpha(
                                theme.palette.common.black,
                                0.2,
                              )})`,
                            },
                          },
                        }),
                      })}
                    >
                      <Image
                        src="/static/branding/design-kits/sync-base2-light.png"
                        alt="The Material UI Design Kit for Figma."
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/sync-base2-dark.png)`,
                          })
                        }
                      />
                      <Image
                        src="/static/branding/design-kits/sync-shot3-light.png"
                        alt="The Material UI Sync plugin displaying theme code."
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/sync-shot3-dark.png)`,
                          })
                        }
                      />
                    </Box>
                  </Fade>
                )}
              </Box>
            </Frame.Demo>
            <Frame.Info data-mui-color-scheme="dark">
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Get the beta version of Material UI Sync now!
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                There&apos;s still a lot to do, and we&apos;re looking forward to hearing from all
                of you.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
                <Button
                  component={Link}
                  variant="contained"
                  size="small"
                  noLinkStyle
                  href="https://www.figma.com/community/plugin/1336346114713490235/material-ui-sync"
                >
                  Use Sync now
                </Button>
                <Button
                  component={Link}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  href="/material-ui/design-resources/material-ui-sync/"
                >
                  View documentation
                </Button>
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
