import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Grid from '@mui/system/Grid';
import Stack from '@mui/system/Stack';
import type { StackProps } from '@mui/system/Stack';
import { styled } from '@mui/system';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  ...theme.applyStyles('dark', {
    backgroundColor: '#262B32',
  }),
}));

export default function InteractiveStack() {
  // @focus-start @padding 1
  const [direction, setDirection] = React.useState<StackProps['direction']>('row');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');
  const [spacing, setSpacing] = React.useState(2);

  const jsx = `
<Stack
  direction="${direction}"
  spacing={${spacing}}
  sx={{
    justifyContent: "${justifyContent}",
    alignItems: "${alignItems}",
  }}
>
`;

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Stack
        direction={direction}
        spacing={spacing}
        sx={{ justifyContent, alignItems, height: 240 }}
      >
        {[0, 1, 2].map((value) => (
          <Item key={value} sx={{ p: 2, pt: value + 1, pb: value + 1 }}>
            {`Item ${value + 1}`}
          </Item>
        ))}
      </Stack>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">direction</FormLabel>
              <RadioGroup
                row
                name="direction"
                aria-label="direction"
                value={direction}
                onChange={(event) => {
                  setDirection(event.target.value as StackProps['direction']);
                }}
              >
                <FormControlLabel value="row" control={<Radio />} label="row" />
                <FormControlLabel
                  value="row-reverse"
                  control={<Radio />}
                  label="row-reverse"
                />
                <FormControlLabel
                  value="column"
                  control={<Radio />}
                  label="column"
                />
                <FormControlLabel
                  value="column-reverse"
                  control={<Radio />}
                  label="column-reverse"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">alignItems</FormLabel>
              <RadioGroup
                row
                name="alignItems"
                aria-label="align items"
                value={alignItems}
                onChange={(event) => {
                  setAlignItems(event.target.value);
                }}
              >
                <FormControlLabel
                  value="flex-start"
                  control={<Radio />}
                  label="flex-start"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio />}
                  label="center"
                />
                <FormControlLabel
                  value="flex-end"
                  control={<Radio />}
                  label="flex-end"
                />
                <FormControlLabel
                  value="stretch"
                  control={<Radio />}
                  label="stretch"
                />
                <FormControlLabel
                  value="baseline"
                  control={<Radio />}
                  label="baseline"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">justifyContent</FormLabel>
              <RadioGroup
                row
                name="justifyContent"
                aria-label="justifyContent"
                value={justifyContent}
                onChange={(event) => {
                  setJustifyContent(event.target.value);
                }}
              >
                <FormControlLabel
                  value="flex-start"
                  control={<Radio />}
                  label="flex-start"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio />}
                  label="center"
                />
                <FormControlLabel
                  value="flex-end"
                  control={<Radio />}
                  label="flex-end"
                />
                <FormControlLabel
                  value="space-between"
                  control={<Radio />}
                  label="space-between"
                />
                <FormControlLabel
                  value="space-around"
                  control={<Radio />}
                  label="space-around"
                />
                <FormControlLabel
                  value="space-evenly"
                  control={<Radio />}
                  label="space-evenly"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">spacing</FormLabel>
              <RadioGroup
                row
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSpacing(Number((event.target as HTMLInputElement).value));
                }}
              >
                {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <HighlightedCode code={jsx} language="jsx" />
    </Stack>
  );
  // @focus-end
}
