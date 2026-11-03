import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalNonLinearStepper() {
  // @focus-start @padding 1
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = steps.length;
  const completedSteps = Object.keys(completed).length;
  const isLastStep = activeStep === totalSteps - 1;
  const allStepsCompleted = completedSteps === totalSteps;

  const handleNext = () => {
    const newActiveStep =
      isLastStep && !allStepsCompleted
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has not been completed
          steps.findIndex((_step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const resetButtonRef = React.useRef<HTMLButtonElement>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement>(null);
  const previousActiveStepRef = React.useRef(activeStep);
  const previousCompletedRef = React.useRef(completed);

  // Manage focus when the completed steps change.
  React.useEffect(() => {
    const previousCompleted = previousCompletedRef.current;
    previousCompletedRef.current = completed;

    if (allStepsCompleted) {
      // If the user has completed all steps and hits "Finish", focus the "Reset" button.
      resetButtonRef.current!.focus();
      return;
    }

    if (
      Object.keys(completed).length === 0 &&
      Object.keys(previousCompleted).length !== 0
    ) {
      // If the user has completed all steps and hits "Reset", focus the "Next" button.
      nextButtonRef.current!.focus();
    }
  }, [completed, allStepsCompleted]);

  // Manage focus when the active step changes.
  React.useEffect(() => {
    if (activeStep === 0 && previousActiveStepRef.current === 1) {
      // If the user navigated to first step via "Back" button, focus the "Next" button.
      nextButtonRef.current!.focus();
    }

    previousActiveStepRef.current = activeStep;
  }, [activeStep]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              aria-controls="stepper-content"
              color="inherit"
              onClick={handleStep(index)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div id="stepper-content">
        {allStepsCompleted ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset} ref={resetButtonRef}>
                Reset
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }} ref={nextButtonRef}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps === totalSteps - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
  // @focus-end
}
