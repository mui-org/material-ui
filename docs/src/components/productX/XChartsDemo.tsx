import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import { blueberryTwilightPaletteLight } from '@mui/x-charts';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Frame } from '@mui/internal-core-docs/AppLayout';

const code = `
<BarChart
  series={[
    { data: [35, 44, 24, 34] },
    { data: [51, 6, 49, 30] },
    { data: [15, 25, 30, 50] },
    { data: [60, 50, 15, 25] },
  ]}
  height={290}
  xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  colors={blueberryTwilightPaletteLight}
/>`;

export default function XChartsDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ p: 2 }}>
        <Paper
          variant="outlined"
          sx={(theme) => ({
            p: 2,
            display: 'flex',
            alignItems: 'center',
            maxWidth: '100%',
            mx: 'auto',
            bgcolor: '#FFF',
            borderRadius: '8px',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.900',
            }),
          })}
        >
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 0, left: 0, right: 10 }}
            colors={blueberryTwilightPaletteLight}
          />
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
