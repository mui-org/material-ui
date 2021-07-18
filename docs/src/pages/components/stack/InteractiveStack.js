import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Stack from '@material-ui/core/Stack';

export default function InteractiveStack() {
  const [direction, setDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');
  const [spacing, setSpacing] = React.useState(2);

  const jsx = `
<Stack
  direction="${direction}"
  justifyContent="${justifyContent}"
  alignItems="${alignItems}"
  spacing={${spacing}}
>
`;

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Stack
        direction={direction}
        justifyContent={justifyContent}
        alignItems={alignItems}
        spacing={spacing}
        sx={{ height: 240 }}
      >
        {[0, 1, 2].map((value) => (
          <Paper
            key={value}
            sx={{
              p: 2,
              pt: value + 1,
              pb: value + 1,
              color: 'text.secondary',
              typography: 'body2',
            }}
          >
            {`Item ${value + 1}`}
          </Paper>
        ))}
      </Stack>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">direction</FormLabel>
              <RadioGroup
                row
                name="direction"
                aria-label="direction"
                value={direction}
                onChange={(event) => {
                  setDirection(event.target.value);
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">spacing</FormLabel>
              <RadioGroup
                row
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={(event) => {
                  setSpacing(Number(event.target.value));
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
      <HighlightedCode isCopyButtonEnabled code={jsx} language="jsx" />
    </Stack>
  );
}
