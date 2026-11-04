import { expectType } from '@mui/types';
import { mergeSlotProps } from '@mui/material/utils';
import type { StepContentProps } from '@mui/material/StepContent';
import StepContent from '@mui/material/StepContent';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';

// slotProps.transition should reject unknown props
<StepContent
  slotProps={{
    // @ts-expect-error — unknown props should be rejected
    transition: { randomInvalidProp: 'test' },
  }}
>
  Step Content
</StepContent>;

<StepContent slots={{ transition: Fade }}>Step Content</StepContent>;
<StepContent slots={{ transition: Collapse }}>Step Content</StepContent>;
<StepContent slots={{ transition: Grow }}>Step Content</StepContent>;
<StepContent slots={{ transition: Slide }}>Step Content</StepContent>;
<StepContent slots={{ transition: Zoom }}>Step Content</StepContent>;

function Custom(props: StepContentProps) {
  const { slotProps, ...other } = props;
  return (
    <StepContent
      slotProps={{
        ...slotProps,
        transition: (ownerState) => {
          const transitionProps =
            typeof slotProps?.transition === 'function'
              ? slotProps.transition(ownerState)
              : slotProps?.transition;
          return {
            ...transitionProps,
            onExited: (node) => {
              transitionProps?.onExited?.(node);
            },
          };
        },
      }}
      {...other}
    >
      test
    </StepContent>
  );
}

function Custom2(props: StepContentProps) {
  const { slotProps, ...other } = props;
  return (
    <StepContent
      slotProps={{
        ...slotProps,
        transition: mergeSlotProps(slotProps?.transition, {
          onExited: (node) => {
            expectType<HTMLElement, typeof node>(node);
          },
        }),
      }}
      {...other}
    >
      test
    </StepContent>
  );
}
