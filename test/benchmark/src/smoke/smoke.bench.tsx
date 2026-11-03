import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// One small benchmark per component, all in one file: the runner loads the file's page once per
// round and samples each of them there, which keeps the page loads few and each mount small.

// The smoke benchmarks are there to catch big regressions. A round of the whole file is long, so
// they get few rounds: they alarm past 10%, which those rounds can settle, rather than the default
// 5%, which they mostly can't.
const SMOKE_OPTIONS = { sampleSize: 30, alarm: { error: 0.1 } };

// The real cursor persists across samples and can come to rest over a tooltip trigger, opening a
// tooltip mid-sample, which only some samples would then pay for. Blocked on the container, so
// React writes no inline style onto every trigger inside the path being timed.
const INERT_TO_POINTER: React.CSSProperties = { pointerEvents: 'none' };

const OPTIONS = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
const STEPS = ['Account', 'Details', 'Review'];

/**
 * A smoke benchmark mounting `count` instances of a component, each as `renderInstance` renders it,
 * inside a container styled with `containerStyle`. The indexes are created here, once per page
 * load, so a sample only renders them.
 */
function smokeBenchmark(
  name: string,
  count: number,
  renderInstance: (index: number) => React.ReactNode,
  containerStyle?: React.CSSProperties,
) {
  const indexes = Array.from({ length: count }, (_, index) => index);
  reactBenchmark(
    `Smoke · ${name}`,
    () => <div style={containerStyle}>{indexes.map(renderInstance)}</div>,
    SMOKE_OPTIONS,
  );
}

smokeBenchmark('Accordion', 40, (index) => (
  <Accordion key={index}>
    <AccordionSummary>Section {index}</AccordionSummary>
    <AccordionDetails>Details {index}</AccordionDetails>
  </Accordion>
));

smokeBenchmark('Alert', 100, (index) => (
  <Alert key={index} severity={index % 2 === 0 ? 'info' : 'warning'}>
    Message {index}
  </Alert>
));

smokeBenchmark('Autocomplete', 20, (index) => (
  <Autocomplete
    key={index}
    options={OPTIONS}
    renderInput={(params) => <TextField {...params} label={`Choice ${index}`} />}
  />
));

smokeBenchmark('Avatar', 500, (index) => (
  <Avatar key={index}>{String.fromCharCode(65 + (index % 26))}</Avatar>
));

smokeBenchmark('Badge', 200, (index) => (
  <Badge key={index} badgeContent={index} color="primary">
    <span>Inbox</span>
  </Badge>
));

smokeBenchmark('Breadcrumbs', 100, (index) => (
  <Breadcrumbs key={index}>
    <Link href="#home">Home</Link>
    <Link href="#section">Section</Link>
    <Typography>Page {index}</Typography>
  </Breadcrumbs>
));

smokeBenchmark('Button', 200, (index) => (
  <Button key={index} variant={index % 2 === 0 ? 'contained' : 'outlined'}>
    Button {index}
  </Button>
));

smokeBenchmark('ButtonGroup', 60, (index) => (
  <ButtonGroup key={index}>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
));

smokeBenchmark('Card', 100, (index) => (
  <Card key={index}>
    <CardContent>
      <Typography variant="h6">Card {index}</Typography>
      <Typography variant="body2">Some content</Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Open</Button>
    </CardActions>
  </Card>
));

smokeBenchmark('Checkbox', 60, (index) => (
  <FormControlLabel key={index} control={<Checkbox />} label={`Option ${index}`} />
));

smokeBenchmark('Chip', 250, (index) => <Chip key={index} label={`Chip ${index}`} />);

smokeBenchmark('CircularProgress', 200, (index) => <CircularProgress key={index} />);

smokeBenchmark('Divider', 800, (index) => <Divider key={index} />);

smokeBenchmark('Fab', 200, (index) => (
  <Fab key={index} aria-label={`Add ${index}`} size="small">
    +
  </Fab>
));

smokeBenchmark('IconButton', 250, (index) => (
  <IconButton key={index} aria-label={`Action ${index}`}>
    {index % 10}
  </IconButton>
));

smokeBenchmark('LinearProgress', 300, (index) => (
  <LinearProgress key={index} variant="determinate" value={index % 100} />
));

smokeBenchmark('Link', 400, (index) => (
  <Link key={index} href={`#link-${index}`}>
    Link {index}
  </Link>
));

smokeBenchmark('List', 20, (index) => (
  <List key={index}>
    {OPTIONS.map((option) => (
      <ListItem key={option} disablePadding>
        <ListItemButton>
          <ListItemText primary={option} secondary={`Item ${index}`} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
));

smokeBenchmark('MenuList', 20, (index) => (
  <MenuList key={index}>
    {OPTIONS.map((option) => (
      <MenuItem key={option}>{option}</MenuItem>
    ))}
  </MenuList>
));

smokeBenchmark('Pagination', 20, (index) => <Pagination key={index} count={10} />);

smokeBenchmark('Paper', 500, (index) => (
  <Paper key={index} elevation={index % 4}>
    Paper {index}
  </Paper>
));

smokeBenchmark('Radio', 20, (index) => (
  <RadioGroup key={index} defaultValue={OPTIONS[0]} row>
    {OPTIONS.slice(0, 3).map((option) => (
      <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
    ))}
  </RadioGroup>
));

smokeBenchmark('Rating', 40, (index) => <Rating key={index} defaultValue={index % 6} />);

smokeBenchmark('Select', 20, (index) => (
  <Select key={index} defaultValue={OPTIONS[0]}>
    {OPTIONS.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
));

smokeBenchmark('Slider', 80, (index) => <Slider key={index} defaultValue={index % 100} />);

smokeBenchmark('Stepper', 40, (index) => (
  <Stepper key={index} activeStep={index % STEPS.length}>
    {STEPS.map((step) => (
      <Step key={step}>
        <StepLabel>{step}</StepLabel>
      </Step>
    ))}
  </Stepper>
));

smokeBenchmark('Switch', 100, (index) => <Switch key={index} defaultChecked={index % 2 === 0} />);

smokeBenchmark('Tabs', 30, (index) => (
  <Tabs key={index} value={index % 3}>
    <Tab label="Overview" />
    <Tab label="Details" />
    <Tab label="Activity" />
  </Tabs>
));

smokeBenchmark('TextField', 60, (index) => <TextField key={index} label={`Field ${index}`} />);

smokeBenchmark('ToggleButtonGroup', 40, (index) => (
  <ToggleButtonGroup key={index} value={OPTIONS[index % 3]} exclusive>
    {OPTIONS.slice(0, 3).map((option) => (
      <ToggleButton key={option} value={option}>
        {option}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
));

smokeBenchmark(
  'Tooltip',
  70,
  (index) => (
    <Tooltip key={index} title={`Action ${index}`}>
      <IconButton aria-label={`Action ${index}`}>{index % 10}</IconButton>
    </Tooltip>
  ),
  INERT_TO_POINTER,
);

smokeBenchmark('Typography', 800, (index) => (
  <Typography key={index} variant={index % 2 === 0 ? 'body1' : 'h6'}>
    Text {index}
  </Typography>
));
