// Track fraction of actual events to prevent exceeding event quota.
// Filter sessions instead of individual events so that we can track multiple metrics per device.
// See https://github.com/GoogleChromeLabs/web-vitals-report to use this data
const disableWebVitalsReporting = Math.random() > 0.0001;

export function reportWebVitals({
  id,
  name,
  label,
  delta,
  value,
}: {
  id: string;
  name: string;
  label: string;
  delta: number;
  value: number;
}): void {
  if (disableWebVitalsReporting) {
    return;
  }

  window.gtag('event', name, {
    value: delta,
    metric_label: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    metric_value: value,
    metric_delta: delta,
    metric_id: id, // id unique to current page load
  });
}
