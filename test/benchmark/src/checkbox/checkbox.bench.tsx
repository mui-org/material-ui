import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// A list whose selection lives in the parent, so checking one item re-renders every row.
function CheckboxList({ count }: { count: number }) {
  const [checked, setChecked] = React.useState<ReadonlySet<number>>(() => new Set());

  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <FormControlLabel
          key={index}
          label={`Item ${index}`}
          control={
            <Checkbox
              checked={checked.has(index)}
              onChange={() => {
                setChecked((previous) => {
                  const next = new Set(previous);
                  if (next.has(index)) {
                    next.delete(index);
                  } else {
                    next.add(index);
                  }
                  return next;
                });
              }}
            />
          }
        />
      ))}
    </div>
  );
}

reactBenchmark(
  'Checkbox toggle',
  () => <CheckboxList count={1000} />,
  async ({ resumeReactRecording }) => {
    resumeReactRecording();
    document.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click();
  },
  { reactRecordingPaused: true },
);
