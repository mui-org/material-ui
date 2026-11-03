import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InputRounded from '@mui/icons-material/InputRounded';
import SmartButtonRounded from '@mui/icons-material/SmartButtonRounded';
import TableViewRounded from '@mui/icons-material/TableViewRounded';
import WarningRounded from '@mui/icons-material/WarningRounded';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import InfoRounded from '@mui/icons-material/InfoRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import {
  Item,
  Group,
  Highlighter,
  More,
  Frame,
  MaterialVsCustomToggle,
} from '@mui/internal-core-docs/AppLayout';
import { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import { customTheme, defaultTheme } from 'docs/src/components/home/MaterialDesignComponents';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { ROUTES } from '@mui/internal-core-docs/constants';

const DEMOS = ['Button', 'Text Field', 'Table', 'Alert', 'Tooltip'] as const;

const CODES = {
  Button: `
  <Button variant="text" startIcon={<ShoppingCartRounded />}>
  Add item
</Button>
<Button variant="contained" startIcon={<ShoppingCartRounded />}>
  Add item
</Button>
<Button variant="outlined" startIcon={<ShoppingCartRounded />}>
  Add item
</Button>
`,
  'Text Field': `
  <TextField variant="standard" label="Username" />
<TextField variant="outlined" label="Email" type="email" />
<TextField variant="filled" label="Password" type="password" />
`,
  Table: `
<TableContainer
  component={Paper}
  variant="outlined"
>
  <Table aria-label="demo table">
    <TableHead>
      <TableRow>
        <TableCell>Dessert</TableCell>
        <TableCell>Calories</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Frozen yoghurt</TableCell>
        <TableCell>109</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cupcake</TableCell>
        <TableCell>305</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
`,
  Alert: `
  <Alert variant="standard" color="info">
  This is an alert!
</Alert>
<Alert variant="outlined" color="info">
  This is an alert!
</Alert>
<Alert variant="filled" color="info">
  This is an alert!
</Alert>
`,
  Tooltip: `
  <Tooltip title="This is a tooltip" arrow placement="top">
  <Typography>Top</Typography>
</Tooltip>
<Tooltip title="This is a tooltip" arrow placement="right">
  <Typography>Right</Typography>
</Tooltip>
<Tooltip title="This is a tooltip" arrow placement="left">
  <Typography>Left</Typography>
</Tooltip>
<Tooltip title="This is a tooltip" arrow placement="bottom">
  <Typography>Bottom</Typography>
</Tooltip>
`,
};

export default function MaterialComponents() {
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  const [customized, setCustomized] = React.useState(false);
  const icons = {
    [DEMOS[0]]: <SmartButtonRounded fontSize="small" />,
    [DEMOS[1]]: <InputRounded fontSize="small" />,
    [DEMOS[2]]: <TableViewRounded fontSize="small" />,
    [DEMOS[3]]: <WarningRounded fontSize="small" />,
    [DEMOS[4]]: <InfoRounded fontSize="small" />,
  };
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Component library"
            title={
              <Typography variant="h2">
                <GradientText>40+</GradientText> building block components
              </Typography>
            }
            description="A meticulous implementation of Material Design; every Material UI component meets the highest standards of form and function."
          />
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More href={ROUTES.components} />
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo className="mui-default-theme" sx={{ flexGrow: 1 }}>
              <ThemeProvider theme={customized ? customTheme : defaultTheme}>
                {demo === 'Button' && (
                  <Box
                    sx={{
                      height: '100%',
                      py: 5,
                      gap: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button variant="text" startIcon={<ShoppingCartRounded />}>
                      Add item
                    </Button>
                    <Button variant="contained" startIcon={<ShoppingCartRounded />}>
                      Add item
                    </Button>
                    <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
                      Add item
                    </Button>
                  </Box>
                )}
                {demo === 'Text Field' && (
                  <Stack
                    spacing={2}
                    sx={{ justifyContent: 'center', p: 2, width: '50%', margin: 'auto' }}
                  >
                    <TextField variant="standard" label="Username" />
                    <TextField variant="outlined" label="Email" type="email" />
                    <TextField
                      variant="filled"
                      label="Password"
                      type="password"
                      autoComplete="new-password" // prevent chrome auto-fill
                    />
                  </Stack>
                )}
                {demo === 'Table' && (
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                      mx: 'auto',
                      my: 4,
                      maxWidth: '90%',
                      '& .MuiTableBody-root > .MuiTableRow-root:last-of-type > .MuiTableCell-root':
                        {
                          borderBottomWidth: 0,
                        },
                    }}
                  >
                    <Table aria-label="demo table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Dessert</TableCell>
                          <TableCell>Calories</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Frozen yoghurt</TableCell>
                          <TableCell>109</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cupcake</TableCell>
                          <TableCell>305</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {demo === 'Alert' && (
                  <Box
                    sx={{
                      height: '100%',
                      py: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    <Alert variant="standard" color="info">
                      This is an alert!
                    </Alert>
                    <Alert variant="outlined" color="info">
                      This is an alert!
                    </Alert>
                    <Alert variant="filled" color="info">
                      This is an alert!
                    </Alert>
                  </Box>
                )}
                {demo === 'Tooltip' && (
                  <Stack
                    spacing={1}
                    sx={{ alignItems: 'center', justifyContent: 'center', minHeight: 100, py: 2 }}
                  >
                    <Tooltip
                      title="Appears on hover"
                      arrow
                      placement="top"
                      slotProps={{ popper: { disablePortal: true } }}
                    >
                      <Typography sx={{ color: 'text.secondary' }}>Top</Typography>
                    </Tooltip>
                    <Box sx={{ '& > *': { display: 'inline-block' } }}>
                      <Tooltip
                        title="Always display"
                        arrow
                        placement="left"
                        open
                        slotProps={{ popper: { disablePortal: true } }}
                      >
                        <Typography sx={{ color: 'text.secondary' }}>Left</Typography>
                      </Tooltip>
                      <Box sx={{ display: 'inline-block', width: 80 }} />
                      <Tooltip
                        title="Appears on hover"
                        arrow
                        placement="right"
                        slotProps={{ popper: { disablePortal: true } }}
                      >
                        <Typography sx={{ color: 'text.secondary' }}>Right</Typography>
                      </Tooltip>
                    </Box>
                    <Tooltip
                      title="Appears on hover"
                      arrow
                      placement="bottom"
                      slotProps={{ popper: { disablePortal: true } }}
                    >
                      <Typography sx={{ color: 'text.secondary' }}>Bottom</Typography>
                    </Tooltip>
                  </Stack>
                )}
              </ThemeProvider>
            </Frame.Demo>
            <Frame.Info data-mui-color-scheme="dark" sx={{ p: 0 }}>
              <MaterialVsCustomToggle customized={customized} setCustomized={setCustomized} />
              <ShowcaseCodeWrapper maxHeight={demo === 'Table' ? 220 : 350} hasDesignToggle>
                <HighlightedCode copyButtonHidden plainStyle code={CODES[demo]} language="jsx" />
              </ShowcaseCodeWrapper>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
