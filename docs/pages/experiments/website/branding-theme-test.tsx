import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import AppHeader from 'docs/src/layouts/AppHeader';
import Section from 'docs/src/layouts/Section';
import AppFooter from 'docs/src/layouts/AppFooter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/internal-core-docs/Link';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function BrandingThemeTest() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <BrandingCssVarsProvider>
      <Head title="MUI Branding Theme Test" description="" />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <Section>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mb: 4 }}>
            <Link href="/">Link with no role</Link>
            <Link href="/" role="menuitem">
              Link role menuitem
            </Link>
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content' }}>
            <Chip size="small" variant="outlined" color="primary" label="Hiring" />
            <Chip size="small" variant="outlined" color="info" label="Hiring" />
            <Chip size="small" variant="outlined" color="error" label="Hiring" />
            <Chip size="small" variant="outlined" color="warning" label="Hiring" />
            <Chip size="small" variant="outlined" color="success" label="Hiring" />
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Button variant="contained">This button</Button>
            <Button variant="outlined">This button</Button>
            <Button variant="text">This button</Button>
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Button variant="contained" size="small" color="primary">
              Contained primary
            </Button>
            <Button variant="contained" size="small" color="secondary">
              Contained secondary
            </Button>
            <Button variant="outlined" size="small" color="primary">
              Outlined primary
            </Button>
            <Button variant="outlined" size="small" color="secondary">
              Outlined secondary
            </Button>
            <Button variant="text" size="small">
              This button
            </Button>
            <IconButton color="primary">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton color="info">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Button variant="contained" size="small" color="primary" disabled>
              Contained primary
            </Button>
            <Button variant="contained" size="small" color="secondary" disabled>
              Contained secondary
            </Button>
            <Button variant="outlined" size="small" color="primary" disabled>
              Outlined primary
            </Button>
            <Button variant="outlined" size="small" color="secondary" disabled>
              Outlined secondary
            </Button>
            <Button variant="text" size="small" disabled>
              This button
            </Button>
            <IconButton color="primary">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton color="info">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Button variant="contained" size="large" color="primary">
              Large
            </Button>
            <Button variant="contained" size="medium" color="primary">
              Medium
            </Button>
            <Button variant="contained" size="small" color="primary">
              Small
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <FormControl sx={{ width: 120 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ width: 120 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Checkbox {...label} defaultChecked />
            <Checkbox {...label} />
            <Checkbox {...label} disabled />
            <Checkbox {...label} disabled checked />
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Lizard
                </Typography>
                <Typography variant="body2">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <Card variant="elevation" sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Lizard
                </Typography>
                <Typography variant="body2">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Lizard
                </Typography>
                <Typography variant="body2">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Stack>
        </Section>
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
