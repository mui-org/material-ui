import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import TextField from '@mui/material/TextField';

function Form({ count }: { count: number }) {
  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <TextField key={index} label={`Field ${index}`} defaultValue={`Value ${index}`} />
      ))}
    </div>
  );
}

reactBenchmark('TextField mount', () => <Form count={200} />);
