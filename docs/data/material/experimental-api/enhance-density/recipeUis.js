import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import Avatar from '@mui/material/Avatar';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import LanguageIcon from '@mui/icons-material/Language';
import ScienceIcon from '@mui/icons-material/Science';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';

const CONTROL_MIN_WIDTH = 140;

function PricingUi() {
  return (
    <Stack spacing="large" sx={{ alignItems: 'center', maxWidth: 420, mx: 'auto' }}>
      <Stack spacing="xxSmall" sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="h2">
          Pricing
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Start free. Move up a plan when you need more room.
        </Typography>
      </Stack>
      <Card variant="outlined" sx={{ width: '100%', borderColor: 'primary.main' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 'small' }}>
          <Stack
            data-measure
            direction="row"
            spacing="xSmall"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Stack direction="row" spacing="xSmall" sx={{ alignItems: 'center' }}>
              <Typography variant="subtitle2" component="h3">
                Team
              </Typography>
              <Chip
                label="Recommended"
                size="small"
                color="primary"
                variant="outlined"
              />
            </Stack>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Annual"
              labelPlacement="start"
              slotProps={{ typography: { variant: 'caption' } }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            For growing product teams
          </Typography>
          <Divider />
          <Stack
            data-measure
            direction="row"
            spacing="xxSmall"
            sx={{ alignItems: 'baseline' }}
          >
            <Typography variant="h6" component="p">
              $18
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              per editor, billed yearly
            </Typography>
          </Stack>
          <Divider />
          <Typography variant="body2">Includes:</Typography>
          <List disablePadding>
            <ListItem data-measure disableGutters>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText
                primary="Version history and restore"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem data-measure disableGutters>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Shared workspaces"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem data-measure disableGutters>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText
                primary="Unlimited project archive"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem data-measure disableGutters>
              <ListItemIcon>
                <CallMadeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Scheduled exports"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem data-measure disableGutters>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    Extra regions{' '}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      (add-on)
                    </Typography>
                  </React.Fragment>
                }
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button data-measure variant="contained" fullWidth>
            Choose Team
          </Button>
        </CardActions>
      </Card>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="subtitle2" component="h3">
            Organization
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Volume pricing, audit logs, and onboarding support.
          </Typography>
        </CardContent>
        <CardActions>
          <Button data-measure variant="outlined">
            Contact sales
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}

function ProductUi() {
  const id = React.useId();
  const [plan, setPlan] = React.useState('subscribe');

  return (
    <Stack spacing="medium" sx={{ maxWidth: 520, mx: 'auto' }}>
      <Stack direction="row" spacing="medium">
        <Box
          role="img"
          aria-label="Product photography placeholder"
          sx={(theme) => ({
            flexShrink: 0,
            width: `calc(${theme.spacing('xxLarge')} * 3)`,
            height: `calc(${theme.spacing('xxLarge')} * 3)`,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'action.selected',
            display: 'grid',
            placeItems: 'center',
            color: 'text.disabled',
          })}
        >
          <ScienceIcon sx={(theme) => ({ fontSize: theme.spacing('xLarge') })} />
        </Box>
        <Stack spacing="xSmall" sx={{ flexGrow: 1 }}>
          <Stack
            data-measure
            direction="row"
            spacing="xSmall"
            sx={{ alignItems: 'center' }}
          >
            <Chip label="TR-12" size="small" variant="outlined" />
            <Typography variant="h6" component="h3">
              Everyday Mineral Blend
            </Typography>
          </Stack>
          <Stack
            data-measure
            direction="row"
            spacing="xSmall"
            sx={{ alignItems: 'center' }}
          >
            <Rating value={4.5} precision={0.5} size="small" readOnly />
            <Link component="button" type="button" variant="body2">
              412 reviews
            </Link>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            A once-daily capsule that tops up the minerals a mixed diet usually
            misses, in forms the body absorbs easily.
          </Typography>
          <Stack direction="row" spacing="xSmall" sx={{ alignItems: 'center' }}>
            <Typography
              variant="h6"
              component="p"
              color="error"
              sx={{ fontWeight: 'bold' }}
            >
              $28.00
            </Typography>
          </Stack>
          <Typography variant="body2">
            In stock — <strong>60 capsules</strong>, shipped every two months.
          </Typography>
        </Stack>
      </Stack>
      <Stack data-measure direction="row" spacing="small" sx={{ flexWrap: 'wrap' }}>
        <ToggleButtonGroup
          exclusive
          value={plan}
          onChange={(event, next) => {
            if (next) {
              setPlan(next);
            }
          }}
          aria-label="purchase plan"
          sx={{ flexGrow: 1 }}
        >
          <ToggleButton value="once" sx={{ flexGrow: 1 }}>
            One-time
          </ToggleButton>
          <ToggleButton value="subscribe" sx={{ flexGrow: 1 }}>
            Repeat order, save 10%
          </ToggleButton>
        </ToggleButtonGroup>
        <FormControl sx={{ minWidth: 96 }}>
          <InputLabel id={`${id}-quantity-label`}>Quantity</InputLabel>
          <Select
            labelId={`${id}-quantity-label`}
            id={`${id}-quantity`}
            label="Quantity"
            defaultValue={1}
          >
            <MenuItem value={1}>1 pack</MenuItem>
            <MenuItem value={2}>2 packs</MenuItem>
            <MenuItem value={3}>3 packs</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack spacing="small">
        <Button data-measure variant="contained" fullWidth>
          Add to cart
        </Button>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          Returns accepted within 60 days. Shipping included.
        </Typography>
      </Stack>
      <Stack>
        <Accordion
          defaultExpanded
          disableGutters
          variant="outlined"
          sx={{ '&:not(:last-of-type)': { borderBottom: 0 } }}
        >
          <AccordionSummary
            data-measure
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${id}-benefits-content`}
            id={`${id}-benefits-header`}
          >
            <Typography variant="subtitle2" component="span">
              Benefits
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding sx={{ listStyleType: 'disc', pl: 'medium' }}>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="Covers the daily reference intake for nine minerals"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="Measured doses, so nothing needs weighing"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="Chelated forms chosen for absorption"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="No fillers, colourings, or added sugar"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters variant="outlined">
          <AccordionSummary
            data-measure
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${id}-ingredients-content`}
            id={`${id}-ingredients-header`}
          >
            <Typography variant="subtitle2" component="span">
              Ingredients
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sourcing notes and per-capsule amounts for every ingredient.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2">Pair and save 20%</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add the evening magnesium blend and save on the first order.
          </Typography>
        </CardContent>
        <CardActions>
          <Button data-measure variant="outlined">
            Add to order
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}

function SettingsUi() {
  const id = React.useId();

  return (
    <Stack spacing="small" sx={{ maxWidth: 520, mx: 'auto' }}>
      <Typography variant="h5" component="h2">
        Preferences
      </Typography>
      <TextField
        data-measure
        fullWidth
        placeholder="Search settings"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack component="section" aria-labelledby={`${id}-general`} spacing="xSmall">
        <Typography
          variant="overline"
          component="h4"
          id={`${id}-general`}
          sx={{ color: 'text.secondary' }}
        >
          General
        </Typography>
        <Paper variant="outlined" sx={{ bgcolor: 'transparent' }}>
          <List disablePadding>
            <ListItem data-measure="left">
              <ListItemText
                primary="Profile picture"
                slotProps={{ primary: { variant: 'body2' } }}
              />
              <Avatar data-measure sx={{ bgcolor: pink[300] }}>
                JU
              </Avatar>
            </ListItem>
            <Divider component="li" />
            <ListItem data-measure="left">
              <ListItemText
                primary="Start-up screen"
                secondary="Choose what opens when the app launches"
                slotProps={{
                  primary: { id: `${id}-startup`, variant: 'body2' },
                  secondary: { id: `${id}-startup-desc`, variant: 'caption' },
                }}
              />
              <Select
                data-measure
                labelId={`${id}-startup`}
                aria-describedby={`${id}-startup-desc`}
                defaultValue="Overview"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="Overview">Overview</MenuItem>
                <MenuItem value="Assigned">Assigned to me</MenuItem>
                <MenuItem value="Recent">Recent files</MenuItem>
              </Select>
            </ListItem>
            <Divider component="li" />
            <ListItem data-measure="left">
              <ListItemText
                primary="Replace shortcuts with symbols"
                secondary="Typing (c) becomes © as you write"
                slotProps={{
                  primary: { id: `${id}-shortcuts`, variant: 'body2' },
                  secondary: { id: `${id}-shortcuts-desc`, variant: 'caption' },
                }}
              />
              <Switch
                data-measure
                edge="end"
                defaultChecked
                slotProps={{
                  input: {
                    'aria-labelledby': `${id}-shortcuts`,
                    'aria-describedby': `${id}-shortcuts-desc`,
                  },
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </Stack>
      <Stack
        component="section"
        aria-labelledby={`${id}-interface`}
        spacing="xSmall"
      >
        <Typography
          variant="overline"
          component="h4"
          id={`${id}-interface`}
          sx={{ color: 'text.secondary' }}
        >
          Interface and theme
        </Typography>
        <Paper variant="outlined" sx={{ bgcolor: 'transparent' }}>
          <List disablePadding>
            <ListItem data-measure="left">
              <ListItemText
                primary="Side panel"
                secondary="Which sections appear, and in what order"
                slotProps={{
                  primary: { id: `${id}-side-panel`, variant: 'body2' },
                  secondary: { id: `${id}-side-panel-desc`, variant: 'caption' },
                }}
              />
              <Button
                data-measure
                variant="text"
                aria-describedby={`${id}-side-panel-desc`}
              >
                Edit
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem data-measure="left">
              <ListItemText
                primary="Theme"
                secondary="Match the system or pick one"
                slotProps={{
                  primary: { id: `${id}-theme`, variant: 'body2' },
                  secondary: { id: `${id}-theme-desc`, variant: 'caption' },
                }}
              />
              <Select
                data-measure
                labelId={`${id}-theme`}
                aria-describedby={`${id}-theme-desc`}
                defaultValue="System"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="System">System</MenuItem>
                <MenuItem value="Light">Light</MenuItem>
                <MenuItem value="Dark">Dark</MenuItem>
              </Select>
            </ListItem>
            <Divider component="li" />
            <ListItem data-measure="left">
              <ListItemText
                primary="Text size"
                secondary="Scale text across every screen"
                slotProps={{
                  primary: { id: `${id}-text-size`, variant: 'body2' },
                  secondary: { id: `${id}-text-size-desc`, variant: 'caption' },
                }}
              />
              <Select
                data-measure
                labelId={`${id}-text-size`}
                aria-describedby={`${id}-text-size-desc`}
                defaultValue="Default"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
              </Select>
            </ListItem>
            <Divider component="li" />
            <ListItem data-measure="left">
              <ListItemText
                primary="Pointer on hover"
                secondary="Show a hand cursor over clickable items"
                slotProps={{
                  primary: { id: `${id}-hover-cursor`, variant: 'body2' },
                  secondary: { id: `${id}-hover-cursor-desc`, variant: 'caption' },
                }}
              />
              <Switch
                data-measure
                edge="end"
                slotProps={{
                  input: {
                    'aria-labelledby': `${id}-hover-cursor`,
                    'aria-describedby': `${id}-hover-cursor-desc`,
                  },
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Stack>
  );
}

const recipeUis = [
  { id: 'pricing', label: 'Pricing', Component: PricingUi },
  { id: 'product', label: 'Product', Component: ProductUi },
  { id: 'settings', label: 'Settings', Component: SettingsUi },
];

export default recipeUis;
