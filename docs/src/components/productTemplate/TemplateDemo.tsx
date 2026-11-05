import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Item, Group, Highlighter, Frame, More } from '@mui/internal-core-docs/AppLayout';
import { Link } from '@mui/internal-core-docs/Link';

import { DEMOS, icons, TEMPLATES } from 'docs/src/components/productMaterial/MaterialTemplates';

function ActionArea(props: ButtonBaseProps) {
  return (
    <ButtonBase
      {...props}
      sx={[
        (theme) => ({
          width: 100,
          height: 100,
          borderRadius: '50%',
          transition: '0.2s',
          '&.Mui-disabled': {
            opacity: 0,
          },
          '& > svg': { transition: '0.2s' },
          backdropFilter: 'blur(4px)',
          bgcolor: alpha(theme.palette.primaryDark[500], 0.5),
          '&:hover, &:focus': {
            '& > svg': { fontSize: 28 },
          },
          position: 'absolute',
          top: 'calc(50% - 50px)',
          color: '#fff',
          p: 1.5,
          ...theme.applyDarkStyles({
            bgcolor: alpha(theme.palette.primary[500], 0.5),
          }),
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

export default function TemplateDemo() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const [templateIndex, setTemplateIndex] = React.useState(0);
  const templates = TEMPLATES[demo];

  return (
    <Section bg="gradient">
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Templates"
            title={
              <Typography variant="h2">
                The right template for your <GradientText>specific use case</GradientText>
              </Typography>
            }
            description="The Material UI collection of templates offers an expanding list of use cases designed to support projects of various types."
          />
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter
                key={name}
                selected={name === demo}
                onClick={() => {
                  setDemo(name);
                  setTemplateIndex(0);
                }}
              >
                <Item
                  icon={React.cloneElement(icons[name], name === demo ? { color: 'primary' } : {})}
                  title={name}
                />
              </Highlighter>
            ))}
            <More
              component={Link}
              href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=templates-cta2#populars"
              noLinkStyle
            />
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Frame>
            <Frame.Demo sx={{ minHeight: { xs: 240, sm: 320 } }}>
              <Box
                sx={{
                  overflow: 'hidden',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '50%',
                  py: 2,
                  transform: 'translate(0px, -50%)',
                  '& > div': { px: '12%', overflow: 'unset !important' },
                  '& .react-swipeable-view-container > div': {
                    overflow: 'unset !important',
                  },
                }}
              >
                <SwipeableViews
                  springConfig={{
                    duration: '0.6s',
                    delay: '0s',
                    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
                  }}
                  index={templateIndex}
                  resistance
                  enableMouseEvents
                  onChangeIndex={(index) => setTemplateIndex(index)}
                >
                  {templates.map((item, index) => (
                    <Box
                      key={item.name}
                      sx={(theme) => ({
                        borderRadius: 1,
                        height: { xs: 200, sm: 240 },
                        backgroundImage: `url(${item.src.light})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        bgcolor: 'background.paper',
                        boxShadow: '0px 4px 10px rgba(61, 71, 82, 0.25)',
                        transition: '0.6s cubic-bezier(0.15, 0.3, 0.25, 1)',
                        transform: templateIndex !== index ? 'scale(0.92)' : 'scale(1)',
                        ...theme.applyDarkStyles({
                          backgroundImage: `url(${item.src.dark})`,
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        }),
                      })}
                    >
                      <Link
                        href={`${item.href}?utm_source=marketing&utm_medium=referral&utm_campaign=templates-cta2`}
                        noLinkStyle
                        target="_blank"
                        tabIndex={templateIndex === index ? 0 : -1}
                        sx={{
                          transition: '0.3s',
                          borderRadius: 1,
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          top: 0,
                          left: 0,
                          bgcolor: (theme) => alpha(theme.palette.primaryDark[900], 0.4),
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover, &:focus': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Typography sx={{ fontWeight: 'bold' }}>Go to store</Typography>
                        <LaunchRounded fontSize="small" sx={{ ml: 1 }} />
                      </Link>
                    </Box>
                  ))}
                </SwipeableViews>
                {templates.length > 1 && (
                  <React.Fragment>
                    <ActionArea
                      aria-label="Previous template"
                      disabled={templateIndex === 0}
                      onClick={() => setTemplateIndex((current) => Math.max(0, current - 1))}
                      sx={{ left: 0, transform: 'translate(-50%)', justifyContent: 'flex-end' }}
                    >
                      <KeyboardArrowLeftRounded />
                    </ActionArea>
                    <ActionArea
                      aria-label="Next template"
                      disabled={templateIndex === templates.length - 1}
                      onClick={() =>
                        setTemplateIndex((current) => Math.min(templates.length - 1, current + 1))
                      }
                      sx={{ right: 0, transform: 'translate(50%)', justifyContent: 'flex-start' }}
                    >
                      <KeyboardArrowRightRounded />
                    </ActionArea>
                  </React.Fragment>
                )}
              </Box>
            </Frame.Demo>
            <Frame.Info
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                '& .MuiIconButton-root': { display: { xs: 'none', md: 'inline-flex' } },
              }}
            >
              <div>
                <Typography variant="body2" noWrap sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  {templates[templateIndex].name}
                </Typography>
                <Typography variant="body2" noWrap sx={{ color: 'grey.500', fontSize: '0.75rem' }}>
                  Developed by {templates[templateIndex].author}
                </Typography>
              </div>
              <Typography variant="caption" sx={{ color: 'grey.500' }}>
                {templateIndex + 1} / {templates.length}
              </Typography>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
