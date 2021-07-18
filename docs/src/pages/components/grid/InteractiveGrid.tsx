import * as React from 'react';
import Grid, { GridDirection } from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

type GridItemsAlignment =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';

type GridJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export default function InteractiveGrid() {
  const [direction, setDirection] = React.useState<GridDirection>('row');
  const [justifyContent, setJustifyContent] =
    React.useState<GridJustification>('center');
  const [alignItems, setAlignItems] = React.useState<GridItemsAlignment>('center');

  const jsx = `
<Grid
  container
  direction="${direction}"
  justifyContent="${justifyContent}"
  alignItems="${alignItems}"
>
`;

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item xs={12}>
        <Grid
          sx={{ height: 240 }}
          container
          spacing={2}
          alignItems={alignItems}
          direction={direction}
          justifyContent={justifyContent}
        >
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  color: 'text.secondary',
                  pt: `${(value + 1) * 10}px`,
                  pb: `${(value + 1) * 10}px`,
                }}
              >
                {`Cell ${value + 1}`}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
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
                    setDirection(
                      (event.target as HTMLInputElement).value as GridDirection,
                    );
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
                <FormLabel component="legend">justifyContent</FormLabel>
                <RadioGroup
                  row
                  name="justifyContent"
                  aria-label="justifyContent"
                  value={justifyContent}
                  onChange={(event) => {
                    setJustifyContent(
                      (event.target as HTMLInputElement).value as GridJustification,
                    );
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
                <FormLabel component="legend">alignItems</FormLabel>
                <RadioGroup
                  row
                  name="alignItems"
                  aria-label="align items"
                  value={alignItems}
                  onChange={(event) => {
                    setAlignItems(
                      (event.target as HTMLInputElement).value as GridItemsAlignment,
                    );
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
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <HighlightedCode isCopyButtonEnabled code={jsx} language="jsx" />
      </Grid>
    </Grid>
  );
}
