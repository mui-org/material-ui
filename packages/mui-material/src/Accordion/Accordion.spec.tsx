import * as React from 'react';
import { expectType } from '@mui/types';
import { mergeSlotProps } from '@mui/material/utils';
import type { AccordionProps } from '@mui/material/Accordion';
import Accordion from '@mui/material/Accordion';

function testOnChange() {
  function handleAccordionChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Accordion onChange={handleAccordionChange}>
    <div />
  </Accordion>;

  function handleElementChange(event: React.ChangeEvent) {}
  <Accordion
    // @ts-expect-error internally it's whatever even lead to a change in value
    onChange={handleElementChange}
  >
    <div />
  </Accordion>;
}

const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
  return <div />;
};

const requiredProps = {
  children: <div />,
};

const AccordionComponentTest = () => {
  return (
    <div>
      <Accordion {...requiredProps} />
      <Accordion {...requiredProps} component="legend" />
      <Accordion
        {...requiredProps}
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />

      {/* @ts-expect-error: Anchor elements do not support incorrectAttribute. */}
      <Accordion {...requiredProps} component="a" incorrectAttribute="url" />
      {/* @ts-expect-error: The div root does not support href. */}
      <Accordion {...requiredProps} component="div" href="url" />
      <Accordion {...requiredProps} component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error: CustomComponent requires prop2. */}
      <Accordion {...requiredProps} component={CustomComponent} prop1="1" />
      {/* @ts-expect-error: CustomComponent requires a numeric prop2. */}
      <Accordion {...requiredProps} component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};

// slotProps type test. Changing heading level.
<Accordion slotProps={{ heading: { component: 'h4' } }}>
  <div />
</Accordion>;

function Custom(props: AccordionProps) {
  const { slotProps, ...other } = props;
  return (
    <Accordion
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
    </Accordion>
  );
}

// slotProps.transition should reject unknown props
<Accordion
  slotProps={{
    // @ts-expect-error — unknown props should be rejected
    transition: { randomInvalidProp: 'test' },
  }}
>
  <div />
</Accordion>;

function Custom2(props: AccordionProps) {
  const { slotProps, ...other } = props;
  return (
    <Accordion
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
    </Accordion>
  );
}
