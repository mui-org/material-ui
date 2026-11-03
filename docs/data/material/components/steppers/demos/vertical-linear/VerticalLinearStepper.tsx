import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {
  // @focus-start @padding 1
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const previousActiveStepRef = React.useRef(activeStep);
  const continueButtonRef = React.useRef<HTMLButtonElement>(null);
  const backButtonRef = React.useRef<HTMLButtonElement>(null);
  const resetButtonRef = React.useRef<HTMLButtonElement>(null);

  // Manage focus when the active step changes.
  React.useEffect(() => {
    const previousActiveStep = previousActiveStepRef.current;
    previousActiveStepRef.current = activeStep;

    // If the user is going forward.
    if (previousActiveStep < activeStep) {
      if (activeStep === steps.length) {
        // If the user has completed all steps and hits "Finish", focus the "Reset" button.
        resetButtonRef.current!.focus();
      } else {
        // Focus the "Continue" button otherwise.
        continueButtonRef.current!.focus();
      }
      return;
    }
    // Otherwise, the user is going back.

    if (activeStep === 0) {
      // If the user hit "Back" on the second step, or hit "Reset", focus the "Continue" button.
      continueButtonRef.current!.focus();
      return;
    }

    // Focus the "Back" button otherwise.
    backButtonRef.current!.focus();
  }, [activeStep]);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  ref={continueButtonRef}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                {index !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    ref={backButtonRef}
                  >
                    Back
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} ref={resetButtonRef}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
  // @focus-end
}
