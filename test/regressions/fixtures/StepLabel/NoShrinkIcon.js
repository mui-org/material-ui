import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function TestIcon() {
  return <div style={{ border: '1px solid red' }}>should not shrink</div>;
}

const steps = ['Step 1', 'Step 2'];

export default function NoShrinkIcon() {
  return (
    <Stepper sx={{ width: 200 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel slots={{ stepIcon: TestIcon }} sx={{ width: '1px' }}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
