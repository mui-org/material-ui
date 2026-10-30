import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import resolveComponentProps from '@mui/utils/resolveComponentProps';

import AddIcon from '../internal/svg-icons/Add';
import RemoveIcon from '../internal/svg-icons/Remove';
import ImportExportIcon from '../internal/svg-icons/ImportExport';
import OpenInFullIcon from '../internal/svg-icons/OpenInFull';

import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import useSlot from '../utils/useSlot';
import OutlinedInput, { OutlinedInputProps } from '../OutlinedInput';
import FilledInput from '../FilledInput';
import Input from '../Input';
import InputAdornment from '../InputAdornment';
import { getControlElements, resolveInputProps, useUtilityClasses } from './utils';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import NumberFieldButtonSlot from './NumberFieldButtonSlot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

interface NumberFieldInputProps {
  baseProps: React.ComponentPropsWithRef<'input'>;
  baseState: BaseNumberField.Input.State;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: Required<Pick<NumberFieldProps, 'slots' | 'slotProps'>>;
}

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const buttonStyles = {
  variants: [
    {
      props: { variant: 'standard' },
      // The standard input has no vertical padding to accommodate a full-size IconButton.
      style: { padding: 4 },
    },
  ],
};
const NumberFieldIncrementButton = styled(IconButton, {
  name: 'MuiNumberField',
  slot: 'IncrementButton',
})(buttonStyles);
const NumberFieldDecrementButton = styled(IconButton, {
  name: 'MuiNumberField',
  slot: 'DecrementButton',
})(buttonStyles);
const NumberFieldScrubArea = styled('span', {
  name: 'MuiNumberField',
  slot: 'ScrubArea',
})<{ ownerState: NumberFieldOwnerState }>(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 4,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    color: (theme.vars || theme).palette.action.active,
    cursor: 'ew-resize',
    variants: [
      { props: { 'data-direction': 'vertical' }, style: { cursor: 'ns-resize' } },
      { props: { size: 'small' }, style: { fontSize: theme.typography.pxToRem(18) } },
      {
        props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
          ownerState.disabled || ownerState.readOnly,
        style: {
          color: (theme.vars || theme).palette.action.disabled,
          cursor: 'default',
        },
      },
    ],
  })),
);
const NumberFieldScrubAreaCursor = styled('span', {
  name: 'MuiNumberField',
  slot: 'ScrubAreaCursor',
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    // Match Base UI's black/white SVG cursor and shadow at the larger size.
    color: (theme.vars || theme).palette.common.black,
    filter: 'drop-shadow(0 1px 1px #0008)',
    '& svg': {
      stroke: (theme.vars || theme).palette.common.white,
      strokeWidth: 1,
    },
    zIndex: theme.zIndex.tooltip + 1,
  })),
);

/**
 * @ignore - internal component.
 */
const NumberFieldInputSlot = React.forwardRef(
  (props: NumberFieldInputProps, ref: React.Ref<HTMLDivElement>) => {
    const { baseProps, baseState, materialProps, externalForwardedProps } = props;
    const { inputValue } = baseState;
    const { autoFocus, variant, label, id, fullWidth, inputRef } = materialProps;
    const ownerState = {
      ...materialProps,
      disabled: baseState.disabled,
      required: baseState.required,
      readOnly: baseState.readOnly,
    };

    const hasHelperText = materialProps.helperText != null && materialProps.helperText !== '';
    const helperTextId = hasHelperText && id ? `${id}-helper-text` : undefined;

    const classes = useUtilityClasses(ownerState);

    const InputComponent = variantComponent[materialProps.variant ?? 'standard'];
    const inputLabelSlotProps = resolveComponentProps(
      externalForwardedProps.slotProps?.inputLabel,
      ownerState,
    );
    const inputAdditionalProps: Pick<OutlinedInputProps, 'label' | 'notched'> = {};

    if (variant === 'outlined') {
      if (
        inputLabelSlotProps &&
        'shrink' in inputLabelSlotProps &&
        typeof inputLabelSlotProps.shrink !== 'undefined'
      ) {
        inputAdditionalProps.notched = inputLabelSlotProps.shrink;
      }
      inputAdditionalProps.label = label;
    }

    const [InputSlot, inputProps] = useSlot('input', {
      elementType: InputComponent,
      externalForwardedProps,
      additionalProps: inputAdditionalProps,
      ownerState,
      className: undefined,
      ref,
    });

    const { materialInputProps, nativeSlotProps } = resolveInputProps({
      inputProps,
      htmlInputSlotProps: externalForwardedProps.slotProps.htmlInput,
      ownerState,
    });

    const [HtmlInputSlot, htmlInputProps] = useSlot('htmlInput', {
      elementType: 'input',
      externalForwardedProps: {
        ...externalForwardedProps,
        slotProps: {
          ...externalForwardedProps.slotProps,
          htmlInput: nativeSlotProps,
        },
      },
      ownerState,
      className: undefined,
      getSlotProps: (externalHandlers) => {
        // An unspecified Base UI validation state must not clear Material's aria-invalid.
        const { 'aria-invalid': ariaInvalid, ...restBaseProps } = baseProps;

        // Compose the selected consumer handlers with Base UI; useSlot merges their refs.
        return mergeProps(ariaInvalid === undefined ? restBaseProps : baseProps, externalHandlers);
      },
    });

    // Build direction-aware defaults without evaluating the consumer's slot callback twice.
    const resolvedScrubAreaSlotProps = resolveComponentProps(
      externalForwardedProps.slotProps.scrubArea,
      ownerState,
    );
    const scrubDirection = resolvedScrubAreaSlotProps?.direction ?? 'horizontal';
    const [ScrubAreaSlot, scrubAreaSlotProps] = useSlot('scrubArea', {
      elementType: NumberFieldScrubArea,
      externalForwardedProps: {
        ...externalForwardedProps,
        slotProps: {
          ...externalForwardedProps.slotProps,
          scrubArea: resolvedScrubAreaSlotProps,
        },
      },
      ownerState,
      className: classes.scrubArea,
      additionalProps: {
        'data-direction': scrubDirection,
        children: (
          <ImportExportIcon
            fontSize="inherit"
            style={{ transform: scrubDirection === 'horizontal' ? 'rotate(90deg)' : undefined }}
          />
        ),
      },
    });
    const [ScrubAreaCursorSlot, scrubAreaCursorProps] = useSlot('scrubAreaCursor', {
      elementType: NumberFieldScrubAreaCursor,
      externalForwardedProps,
      ownerState,
      className: classes.scrubAreaCursor,
      additionalProps: {
        // Rotate the SVG, since Base UI updates the cursor container's transform as it moves.
        // Inline transforms also preserve the drag axis when RTL styles are flipped.
        children: (
          <OpenInFullIcon
            fontSize="inherit"
            style={{
              transform: scrubDirection === 'horizontal' ? 'rotate(45deg)' : 'rotate(-45deg)',
            }}
          />
        ),
      },
    });

    const [DecrementButtonSlot, decrementButtonProps] = useSlot('decrementButton', {
      elementType: NumberFieldDecrementButton,
      externalForwardedProps,
      ownerState,
      className: classes.decrementButton,
      additionalProps: {
        size: ownerState.size,
        children: <RemoveIcon fontSize="inherit" />,
      },
      shouldForwardComponentProp: true,
    });
    const [IncrementButtonSlot, incrementButtonProps] = useSlot('incrementButton', {
      elementType: NumberFieldIncrementButton,
      externalForwardedProps,
      ownerState,
      className: classes.incrementButton,
      additionalProps: {
        size: ownerState.size,
        children: <AddIcon fontSize="inherit" />,
      },
      shouldForwardComponentProp: true,
    });

    const {
      direction,
      pixelSensitivity,
      teleportDistance,
      children: scrubAreaChildren,
      ...restScrubAreaProps
    } = scrubAreaSlotProps;
    // Unset consumer handlers must preserve Base UI's internal handlers.
    const scrubAreaProps = Object.fromEntries(
      Object.entries(restScrubAreaProps).filter(
        ([key, value]) => !(/^on[A-Z]/.test(key) && value == null),
      ),
    ) as typeof restScrubAreaProps;

    const { disabled: decrementButtonDisabled, ...restDecrementButtonProps } =
      decrementButtonProps as IconButtonProps;
    const { disabled: incrementButtonDisabled, ...restIncrementButtonProps } =
      incrementButtonProps as IconButtonProps;

    const scrubAreaElement = ownerState.scrubArea !== false && (
      <BaseNumberField.ScrubArea
        direction={direction}
        pixelSensitivity={pixelSensitivity}
        teleportDistance={teleportDistance}
        render={<ScrubAreaSlot {...scrubAreaProps} />}
      >
        {scrubAreaChildren}
        <BaseNumberField.ScrubAreaCursor
          render={<ScrubAreaCursorSlot {...scrubAreaCursorProps} />}
        />
      </BaseNumberField.ScrubArea>
    );

    const incrementButton = (
      <BaseNumberField.Increment
        disabled={incrementButtonDisabled}
        render={(buttonBaseProps, buttonBaseState) => (
          <NumberFieldButtonSlot
            ButtonSlot={IncrementButtonSlot}
            buttonProps={restIncrementButtonProps}
            baseProps={buttonBaseProps}
            baseState={buttonBaseState}
            materialProps={ownerState}
          />
        )}
      />
    );
    const decrementButton = (
      <BaseNumberField.Decrement
        disabled={decrementButtonDisabled}
        render={(buttonBaseProps, buttonBaseState) => (
          <NumberFieldButtonSlot
            ButtonSlot={DecrementButtonSlot}
            buttonProps={restDecrementButtonProps}
            baseProps={buttonBaseProps}
            baseState={buttonBaseState}
            materialProps={ownerState}
          />
        )}
      />
    );

    const { startControls, endControls } = getControlElements({
      controlsPosition: ownerState.controlsPosition,
      IncrementButton: incrementButton,
      DecrementButton: decrementButton,
      classes,
      ownerState,
    });

    const consumerStartAdornment =
      'startAdornment' in materialInputProps ? materialInputProps.startAdornment : undefined;
    const consumerEndAdornment =
      'endAdornment' in materialInputProps ? materialInputProps.endAdornment : undefined;

    const startScrubArea = ownerState.scrubArea === 'start' && (
      <InputAdornment position="start">{scrubAreaElement}</InputAdornment>
    );
    const endScrubArea = ownerState.scrubArea === 'end' && (
      <InputAdornment position="end">{scrubAreaElement}</InputAdornment>
    );

    // An empty fragment would still mark the input as adorned and shrink its label.
    const startAdornment =
      startControls || startScrubArea ? (
        <React.Fragment>
          {startControls}
          {startScrubArea}
          {consumerStartAdornment}
        </React.Fragment>
      ) : (
        consumerStartAdornment
      );
    const endAdornment =
      endControls || endScrubArea ? (
        <React.Fragment>
          {consumerEndAdornment}
          {endScrubArea}
          {endControls}
        </React.Fragment>
      ) : (
        consumerEndAdornment
      );

    // Keep Material styling and native behavior aligned with Base UI's resolved state.
    const inputStateProps = {
      disabled: ownerState.disabled,
      required: ownerState.required,
      readOnly: ownerState.readOnly,
    };

    // Apply behavioral flags after native consumer props, preserving merged handlers and refs.
    const finalHtmlInputProps = {
      ...htmlInputProps,
      ...inputStateProps,
    };

    return (
      <InputSlot
        aria-describedby={helperTextId}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        value={inputValue}
        id={id}
        inputRef={inputRef}
        onBlur={materialProps.onBlur}
        onFocus={materialProps.onFocus}
        slots={{
          input: externalForwardedProps.slots.htmlInput ? HtmlInputSlot : undefined,
        }}
        {...materialInputProps}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        {...inputStateProps}
        inputProps={finalHtmlInputProps}
      />
    );
  },
);

export default NumberFieldInputSlot;
