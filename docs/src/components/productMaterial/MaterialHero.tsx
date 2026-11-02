import * as React from 'react';
import { extendTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import CakeRounded from '@mui/icons-material/CakeRounded';
import CelebrationRounded from '@mui/icons-material/CelebrationRounded';
import AttractionsRounded from '@mui/icons-material/AttractionsRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DownloadIcon from '@mui/icons-material/Download';
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment';
import AcUnitRounded from '@mui/icons-material/AcUnitRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import ShareRounded from '@mui/icons-material/ShareRounded';
import RateReviewOutlined from '@mui/icons-material/RateReviewOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconImage from '@mui/internal-core-docs/IconImage';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import GradientText from 'docs/src/components/typography/GradientText';
import { getDesignTokens } from '@mui/internal-core-docs/branding';
import { Link } from '@mui/internal-core-docs/Link';
import { ROUTES } from '@mui/internal-core-docs/constants';

function Checkboxes() {
  const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };
  return (
    <React.Fragment>
      <Checkbox {...label} defaultChecked />
      <Checkbox {...label} />
    </React.Fragment>
  );
}

function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={(event, newAlignment) => {
          setAlignment(newAlignment);
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned" size="small">
          <FormatAlignLeftIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered" size="small">
          <FormatAlignCenterIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned" size="small" disabled>
          <FormatAlignRightIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}
function TabsDemo() {
  const [index, setIndex] = React.useState(0);
  return (
    <Paper>
      <Tabs
        value={index}
        onChange={(event, newIndex) => setIndex(newIndex)}
        variant="fullWidth"
        aria-label="icon label tabs example"
      >
        <Tab icon={<CakeRounded fontSize="small" />} label="Cakes" />
        <Tab icon={<CelebrationRounded fontSize="small" />} label="Party" />
        <Tab icon={<AttractionsRounded fontSize="small" />} label="Park" />
      </Tabs>
    </Paper>
  );
}
function BadgeVisibilityDemo() {
  const [count, setCount] = React.useState(1);
  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{
        width: '100%',
        color: 'action.active',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
      <div>
        <Badge color="primary" badgeContent={count}>
          <NotificationsIcon fontSize="small" />
        </Badge>
        <ButtonGroup>
          <Button
            size="small"
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </Paper>
  );
}
function SwitchToggleDemo() {
  const label = { slotProps: { input: { 'aria-label': 'Switch demo' } } };
  return (
    <Box
      sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Checkboxes />
      <ToggleButtons />
    </Box>
  );
}
function SlideDemo() {
  const [value, setValue] = React.useState([30, 60]);
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
      <AcUnitRounded
        fontSize="small"
        color="primary"
        sx={{ opacity: `max(0.4, ${(100 - value[0]) / 100})` }}
      />
      <Slider
        aria-labelledby="temperature-slider"
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
      />
      <LocalFireDepartment
        fontSize="small"
        color="error"
        sx={{ opacity: `max(0.4, ${value[1] / 100})` }}
      />
    </Stack>
  );
}
const { palette: lightPalette } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');
const customTheme = extendTheme({
  cssVarPrefix: 'hero',
  colorSchemeSelector: 'data-mui-color-scheme',
  colorSchemes: {
    light: {
      palette: {
        ...(lightPalette?.primary && { primary: lightPalette?.primary }),
        ...(lightPalette?.grey && { grey: lightPalette?.grey }),
        ...(lightPalette?.background && { background: lightPalette?.background }),
      },
    },
    dark: {
      palette: {
        ...(darkPalette?.primary && { primary: darkPalette?.primary }),
        ...(darkPalette?.grey && { grey: darkPalette?.grey }),
        ...(darkPalette?.background && { background: darkPalette?.background }),
      },
    },
  },
});
export default function MaterialHero() {
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
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-start' },
                ...theme.applyDarkStyles({
                  color: 'primary.300',
                }),
              }),
            ]}
          >
            <IconImage loading="eager" width={28} height={28} name="product-core" />{' '}
            <Link href={ROUTES.productCore}>MUI Core</Link>{' '}
            <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
              /
            </Typography>
            <Typography component="span" variant="inherit" sx={{ color: 'text.primary' }}>
              Material UI
            </Typography>
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Ready to use <br />
            <GradientText>Material Design</GradientText>
            <br />
            components
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3, maxWidth: 500 }}>
            Material UI is an open-source React component library that implements Google&apos;s
            Material Design. It&apos;s comprehensive and can be used in production out of the box.
          </Typography>
          <GetStartedButtons
            primaryUrl={ROUTES.materialDocs}
            secondaryLabel="View templates"
            secondaryUrl={ROUTES.freeTemplates}
            altInstallation="npm install @mui/material @emotion/react @emotion/styled"
          />
        </Box>
      }
      rightSx={{
        p: 3,
        minWidth: 2000,
        flexDirection: 'column',
        overflow: 'hidden', // the components on the Hero section are mostly illustrative, even though they're interactive. That's why scrolling is disabled.
      }}
      right={
        <ThemeProvider theme={customTheme}>
          <Paper sx={{ maxWidth: 772, p: 2, mb: 4 }}>
            <Stepper activeStep={1}>
              <Step>
                <StepLabel>Search for React UI libraries</StepLabel>
              </Step>
              <Step>
                <StepLabel>Spot Material UI</StepLabel>
              </Step>
              <Step>
                <StepLabel>Choose Material UI</StepLabel>
              </Step>
            </Stepper>
          </Paper>
          <Box
            sx={{
              '& > div': {
                width: 370,
                display: 'inline-flex',
                verticalAlign: 'top',
              },
            }}
          >
            <Stack spacing={4} useFlexGap>
              <div>
                <Accordion
                  elevation={0}
                  variant="outlined"
                  defaultExpanded
                  disableGutters
                  sx={{ borderBottom: 0 }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon fontSize="small" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="body2">Usage</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Material UI components work in isolation. They are self-contained, and will
                      only inject the styles they need to display.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion elevation={0} variant="outlined" disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon fontSize="small" />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="body2">Globals</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Material UI understands a handful of important globals that you&apos;ll need
                      to be aware of.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disabled elevation={0} disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon fontSize="small" />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography variant="body2">Secret Files</Typography>
                  </AccordionSummary>
                </Accordion>
              </div>
              <Alert variant="filled" color="info" icon={<CheckCircleRounded fontSize="small" />}>
                Check Material UI out now!
              </Alert>
              <SwitchToggleDemo />
              <TabsDemo />
              <Paper elevation={0} variant="outlined" sx={{ overflow: 'hidden' }}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline' }}
                          >
                            Michael Scott
                          </Typography>
                          {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Summer BBQ"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline' }}
                          >
                            to Jim, Pam and Ryan
                          </Typography>
                          {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Stack>
            <Stack
              spacing={4}
              useFlexGap
              sx={{ ml: 4, '& > .MuiPaper-root': { maxWidth: 'none' } }}
            >
              <Box sx={{ display: 'flex', gap: 2, '& button': { textWrap: 'nowrap' } }}>
                <Button variant="contained" startIcon={<DownloadIcon fontSize="small" />} fullWidth>
                  Install library
                </Button>
                <Button variant="outlined" startIcon={<DownloadIcon fontSize="small" />} fullWidth>
                  Install library
                </Button>
              </Box>
              <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
                <Typography
                  id="temperature-slider"
                  component="div"
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 400 }}
                >
                  Temperature range
                </Typography>
                <SlideDemo />
              </Paper>
              <TextField
                id="core-hero-input"
                defaultValue="Material UI"
                label="Component library"
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <BadgeVisibilityDemo />
                <Paper
                  variant="outlined"
                  elevation={0}
                  sx={{
                    width: '100%',
                    py: 2,
                    px: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                </Paper>
              </Box>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: 'primary.50', color: 'primary.600', fontWeight: 'bold' }}
                    >
                      YN
                    </Avatar>
                  }
                  title="Yosemite National Park"
                  subheader="California, United States"
                />
                <CardMedia
                  height={125}
                  alt=""
                  component="img"
                  image="/static/images/cards/yosemite.jpeg"
                />
                <CardContent sx={{ pb: 0 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Not just a great valley, but a shrine to human foresight, the strength of
                    granite, the power of glaciers, the persistence of life, and the tranquility of
                    the High Sierra.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderRounded fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareRounded fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="share" sx={{ ml: 'auto' }}>
                    <RateReviewOutlined fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Stack>
          </Box>
        </ThemeProvider>
      }
    />
  );
}
