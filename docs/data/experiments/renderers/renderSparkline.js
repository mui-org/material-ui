import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

export function renderSparkline(params) {
  if (params.value == null) {
    return '';
  }

  return (
    <SparkLineChart
      data={params.value}
      width={params.colDef.computedWidth}
      plotType="bar"
    />
  );
}

export default renderSparkline;
