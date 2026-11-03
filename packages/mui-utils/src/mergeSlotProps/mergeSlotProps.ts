import type * as React from 'react';
import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import type { Simplify } from '@mui/types';
import type { EventHandlers } from '../types';
import extractEventHandlers from '../extractEventHandlers';
import omitEventHandlers from '../omitEventHandlers';

export type WithCommonProps<OtherProps> = OtherProps & {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  ref?: React.Ref<any> | undefined;
};

export interface MergeSlotPropsParameters<
  SlotProps,
  ExternalForwardedProps,
  ExternalSlotProps,
  AdditionalProps,
> {
  /**
   * A function that returns the internal props of the component.
   * It accepts the event handlers passed into the component by the user
   * and is responsible for calling them where appropriate.
   */
  getSlotProps?: ((other: EventHandlers) => WithCommonProps<SlotProps>) | undefined;
  /**
   * Props provided to the `slotProps.*` of the Base UI component.
   */
  externalSlotProps?: WithCommonProps<ExternalSlotProps> | undefined;
  /**
   * Extra props placed on the Base UI component that should be forwarded to the slot.
   * This should usually be used only for the root slot.
   */
  externalForwardedProps?: WithCommonProps<ExternalForwardedProps> | undefined;
  /**
   * Additional props to be placed on the slot.
   */
  additionalProps?: WithCommonProps<AdditionalProps> | undefined;
  /**
   * Extra class name(s) to be placed on the slot.
   */
  className?: ClassValue | ClassValue[] | undefined;
}

export type MergeSlotPropsResult<
  SlotProps,
  ExternalForwardedProps,
  ExternalSlotProps,
  AdditionalProps,
> = {
  props: Simplify<
    SlotProps &
      ExternalForwardedProps &
      ExternalSlotProps &
      AdditionalProps & { className?: string | undefined; style?: React.CSSProperties | undefined }
  >;
  internalRef: React.Ref<any> | undefined;
};

/**
 * Merges the slot component internal props (usually coming from a hook)
 * with the externally provided ones.
 *
 * The merge order is (the latter overrides the former):
 * 1. The internal props (specified as a getter function to work with get*Props hook result)
 * 2. Additional props (specified internally on a Base UI component)
 * 3. External props specified on the owner component. These should only be used on a root slot.
 * 4. External props specified in the `slotProps.*` prop.
 * 5. The `className` prop - combined from all the above.
 * @param parameters
 * @returns
 */
function mergeSlotProps<
  SlotProps,
  ExternalForwardedProps extends Record<string, unknown>,
  ExternalSlotProps extends Record<string, unknown>,
  AdditionalProps,
>(
  parameters: MergeSlotPropsParameters<
    SlotProps,
    ExternalForwardedProps,
    ExternalSlotProps,
    AdditionalProps
  >,
): MergeSlotPropsResult<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps> {
  const { getSlotProps, additionalProps, externalSlotProps, externalForwardedProps, className } =
    parameters;

  if (!getSlotProps) {
    // The simpler case - getSlotProps is not defined, so no internal event handlers are defined,
    // so we can simply merge all the props without having to worry about extracting event handlers.
    const joinedClasses = clsx(
      additionalProps?.className,
      className,
      externalForwardedProps?.className,
      externalSlotProps?.className,
    );

    const props = {
      ...additionalProps,
      ...externalForwardedProps,
      ...externalSlotProps,
    } as MergeSlotPropsResult<
      SlotProps,
      ExternalForwardedProps,
      ExternalSlotProps,
      AdditionalProps
    >['props'];

    if (joinedClasses.length > 0) {
      props.className = joinedClasses;
    }

    if (additionalProps?.style || externalForwardedProps?.style || externalSlotProps?.style) {
      const mergedStyle = {
        ...additionalProps?.style,
        ...externalForwardedProps?.style,
        ...externalSlotProps?.style,
      };
      if (Object.keys(mergedStyle).length > 0) {
        props.style = mergedStyle;
      }
    }

    return {
      props,
      internalRef: undefined,
    };
  }

  // In this case, getSlotProps is responsible for calling the external event handlers.
  // We don't need to include them in the merged props because of this.

  const eventHandlers = extractEventHandlers({ ...externalForwardedProps, ...externalSlotProps });
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);

  const internalSlotProps = getSlotProps(eventHandlers);

  // The order of classes is important here.
  // Emotion (that we use in libraries consuming Base UI) depends on this order
  // to properly override style. It requires the most important classes to be last
  // (see https://github.com/mui/material-ui/pull/33205) for the related discussion.
  const joinedClasses = clsx(
    internalSlotProps?.className,
    additionalProps?.className,
    className,
    externalForwardedProps?.className,
    externalSlotProps?.className,
  );

  const props = {
    ...internalSlotProps,
    ...additionalProps,
    ...otherPropsWithoutEventHandlers,
    ...componentsPropsWithoutEventHandlers,
  } as MergeSlotPropsResult<
    SlotProps,
    ExternalForwardedProps,
    ExternalSlotProps,
    AdditionalProps
  >['props'];

  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }

  if (
    internalSlotProps?.style ||
    additionalProps?.style ||
    externalForwardedProps?.style ||
    externalSlotProps?.style
  ) {
    const mergedStyle = {
      ...internalSlotProps?.style,
      ...additionalProps?.style,
      ...externalForwardedProps?.style,
      ...externalSlotProps?.style,
    };
    if (Object.keys(mergedStyle).length > 0) {
      props.style = mergedStyle;
    }
  }

  return {
    props,
    internalRef: internalSlotProps.ref,
  };
}

export default mergeSlotProps;
