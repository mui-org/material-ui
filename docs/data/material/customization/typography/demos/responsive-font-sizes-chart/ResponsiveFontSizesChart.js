// import of a small, pure module in a private demo
// bundle size and module duplication is negligible

// eslint-disable-next-line no-restricted-imports
import { convertLength } from '@mui/material/styles/cssUtils';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const colors = [
  '#443dc2',
  '#2060df',
  '#277e91',
  '#378153',
  '#4d811d',
  '#63780d',
  '#996600',
];
const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1'];

export default function ResponsiveFontSizesChart() {
  const convert = convertLength(theme.typography.htmlFontSize);
  const toPx = (rem) => parseFloat(convert(rem, 'px'));

  let dataset = theme.breakpoints.keys.map((key) => {
    const viewport = theme.breakpoints.values[key];
    const value = theme.breakpoints.up(key);

    const rep = { viewport };
    variants.forEach((variantName) => {
      const variant = theme.typography[variantName];
      if (variant[value]) {
        const fontSize = toPx(variant[value].fontSize);
        rep[variantName] = fontSize;
      } else if (viewport === 0) {
        const fontSize = toPx(variant.fontSize);
        rep[variantName] = fontSize;
      }
    });
    return rep;
  });

  dataset = [
    ...dataset.slice(0, dataset.length - 1),
    {
      ...dataset[dataset.length - 2],
      viewport: dataset[dataset.length - 1].viewport,

      subtitle1: dataset[0].subtitle1,
    },
  ];

  return (
    <Box sx={{ height: 380, width: '100%', color: 'black' }}>
      <LineChart
        dataset={dataset}
        series={variants.map((variantName) => ({
          curve: 'stepAfter',
          dataKey: variantName,
          label: variantName,
          connectNulls: true,
        }))}
        xAxis={[
          {
            scaleType: 'linear',
            dataKey: 'viewport',
            valueFormatter: (value) => value.toString(),
            tickNumber: 10,
            max: 1600,
            tickLabelStyle: { fontSize: 15 },
            label: 'viewport (px)',
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => value.toString(),
            tickNumber: 5,
            min: 0,
            max: 100,
            tickLabelStyle: { fontSize: 15 },
            labelStyle: {
              fontSize: 15,
            },
            label: 'font-size (px)',
          },
        ]}
        colors={colors}
        margin={{ left: 70 }}
        sx={{
          [`.MuiChartsAxis-left .MuiChartsAxis-label`]: {
            transform: 'translateX(-5px)',
          },
          [`.MuiChartsAxis-bottom .MuiChartsAxis-label`]: {
            transform: 'translateY(5px)',
          },
          [`.MuiChartsAxis-root text`]: {
            fill: '#808080',
          },
          [`.MuiChartsAxis-root line`]: {
            stroke: '#808080',
          },
        }}
      />
    </Box>
  );
}
