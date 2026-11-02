'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ownerDocument from '@mui/utils/ownerDocument';
import useControlled from '@mui/utils/useControlled';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useEventCallback from '@mui/utils/useEventCallback';
import useForkRef from '@mui/utils/useForkRef';
import isFocusVisible from '@mui/utils/isFocusVisible';
import visuallyHidden from '@mui/utils/visuallyHidden';
import clamp from '@mui/utils/clamp';
import extractEventHandlers from '@mui/utils/extractEventHandlers';
import type {
  Mark,
  UseSliderHiddenInputProps,
  UseSliderParameters,
  UseSliderReturnValue,
  UseSliderRootSlotProps,
  UseSliderThumbSlotProps,
} from './useSlider.types';
import type { EventHandlers } from '../utils/types';
import areArraysEqual from '../utils/areArraysEqual';
import contains from '../utils/contains';
import getActiveElement from '../utils/getActiveElement';

const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
const EMPTY_MARKS: readonly Mark[] = [];
const EMPTY_OBJ = {};

function getNewValue(
  currentValue: number,
  step: number,
  direction: 1 | -1,
  min: number,
  max: number,
): number {
  const precision = Math.max(getDecimalPrecision(currentValue), getDecimalPrecision(step));
  const newValue = Number((currentValue + direction * step).toFixed(precision));
  return direction === 1 ? Math.min(newValue, max) : Math.max(newValue, min);
}

function asc(a: number, b: number) {
  return a - b;
}

function findClosest(values: number[], currentValue: number, preferredIndex = -1) {
  const closestValue =
    values.reduce<{ distance: number; index: number } | null>(
      (acc, value: number, index: number) => {
        const distance = Math.abs(currentValue - value);

        if (acc == null || distance <= acc.distance) {
          return {
            distance,
            index,
          };
        }

        return acc;
      },
      null,
    ) ?? (EMPTY_OBJ as { index?: number | undefined });
  const { index: closestIndex } = closestValue;

  if (closestIndex == null) {
    return closestIndex;
  }

  if (preferredIndex >= 0 && values[preferredIndex] === values[closestIndex]) {
    return preferredIndex;
  }

  return closestIndex;
}

function trackFinger(
  event: TouchEvent | PointerEvent | React.PointerEvent,
  touchIdRef: React.RefObject<number | undefined>,
) {
  // The event is TouchEvent
  if (touchIdRef.current != null && (event as TouchEvent).changedTouches) {
    const touchEvent = event as TouchEvent;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        return {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }

    return false;
  }

  // The event is PointerEvent or MouseEvent
  return {
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY,
  };
}

export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num: number) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  // 0 is excluded because its exponential notation (0e+0) has no negative exponent.
  if (num !== 0 && Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value: number, step: number, min: number) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex(values: number[], newValue: number, index: number) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}

function focusThumb(
  sliderRef: React.RefObject<HTMLSpanElement | null>,
  activeIndex: number,
  setActive?: ((num: number) => void) | undefined,
  focusVisible?: boolean | undefined,
) {
  const doc = ownerDocument(sliderRef.current);
  const activeElement = getActiveElement(doc);
  if (
    !contains(sliderRef.current, activeElement) ||
    Number(activeElement?.getAttribute('data-index')) !== activeIndex
  ) {
    const input = sliderRef.current?.querySelector(
      `[type="range"][data-index="${activeIndex}"]`,
    ) as HTMLInputElement | null;
    if (input != null) {
      if (focusVisible == null) {
        input.focus({ preventScroll: true });
      } else {
        input.focus({
          preventScroll: true,
          // Prevent pointer-driven focus rings in browsers that support this option.
          // Chrome 144+ supports `focusVisible` in `HTMLElement.focus()` options.
          focusVisible,
          // Cast can be removed once TypeScript >= 6.0 (added `focusVisible` to lib.dom FocusOptions).
        } as FocusOptions & { focusVisible?: boolean | undefined });
      }
    }
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

function areValuesEqual(
  newValue: number | ReadonlyArray<number>,
  oldValue: number | ReadonlyArray<number>,
): boolean {
  if (typeof newValue === 'number' && typeof oldValue === 'number') {
    return newValue === oldValue;
  }
  if (typeof newValue === 'object' && typeof oldValue === 'object') {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}

const axisProps = {
  horizontal: {
    offset: (percent: number) => ({ left: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` }),
  },
  'horizontal-reverse': {
    offset: (percent: number) => ({ right: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` }),
  },
  vertical: {
    offset: (percent: number) => ({ bottom: `${percent}%` }),
    leap: (percent: number) => ({ height: `${percent}%` }),
  },
};

export const Identity = (x: number) => x;

export function useSlider(parameters: UseSliderParameters): UseSliderReturnValue {
  const {
    'aria-labelledby': ariaLabelledby,
    defaultValue,
    disabled = false,
    disableSwap = false,
    isRtl = false,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = 'horizontal',
    rootRef: ref,
    scale = Identity,
    step = 1,
    shiftStep = 10,
    tabIndex,
    value: valueProp,
  } = parameters;

  const touchIdRef = React.useRef<number | undefined>(undefined);
  const focusFrameRef = React.useRef<number | null>(null);
  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const moveCountRef = React.useRef(0);
  // Ref (not state) because setActive() always accompanies updates, providing the re-render.
  const lastUsedThumbIndexRef = React.useRef(-1);
  // Prevents duplicate listener registration when both pointer and touch events fire
  // for the same physical touch interaction.
  const pointerDownHandledRef = React.useRef(false);
  // Tracks which pointer owns the current drag session, so stray pointerup/pointermove
  // events from a second pointer don't interfere.
  const activePointerIdRef = React.useRef<number>(-1);
  const cancelFocusFrame = useEventCallback(() => {
    if (focusFrameRef.current != null) {
      cancelAnimationFrame(focusFrameRef.current);
      focusFrameRef.current = null;
    }
  });
  // lastChangedValueRef is updated whenever onChange is triggered.
  const lastChangedValueRef = React.useRef<number | number[] | null>(null);

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: 'Slider',
  });

  const handleChange = useEventCallback(
    (event: Event | React.SyntheticEvent, value: number | number[], thumbIndex: number) => {
      // Redefine target to allow name and value to be read.
      // This allows seamless integration with the most popular form libraries.
      // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
      // Clone the event to not override `target` of the original event.
      const nativeEvent = 'nativeEvent' in event ? event.nativeEvent : event;
      const clonedEvent = new (nativeEvent.constructor as typeof Event)(
        nativeEvent.type,
        nativeEvent as EventInit,
      );

      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: { value, name },
      });

      lastChangedValueRef.current = value;
      onChange?.(clonedEvent, value, thumbIndex);
    },
  );

  const range = Array.isArray(valueDerived);
  const values = React.useMemo(() => {
    if (typeof valueDerived === 'number') {
      return [clamp(valueDerived, min, max)];
    }

    if (valueDerived == null) {
      return [min];
    }

    const sortedValues = valueDerived.slice().sort(asc);
    for (let i = 0; i < sortedValues.length; i += 1) {
      const value = sortedValues[i];
      sortedValues[i] = value == null ? min : clamp(value, min, max);
    }

    return sortedValues;
  }, [valueDerived, min, max]);

  const marks = React.useMemo<readonly Mark[]>(() => {
    if (marksProp === true && step != null) {
      const generatedMarks = new Array<Mark>(Math.floor((max - min) / step) + 1);
      for (let i = 0; i < generatedMarks.length; i += 1) {
        generatedMarks[i] = { value: min + step * i };
      }
      return generatedMarks;
    }

    return Array.isArray(marksProp) ? marksProp : EMPTY_MARKS;
  }, [marksProp, step, min, max]);

  const marksValues = React.useMemo(() => {
    const markValues = new Array<number>(marks.length);
    for (let i = 0; i < marks.length; i += 1) {
      markValues[i] = marks[i].value;
    }
    return markValues;
  }, [marks]);

  const [focusedThumbIndex, setFocusedThumbIndex] = React.useState(-1);

  const sliderRef = React.useRef<HTMLSpanElement>(null);
  const handleRef = useForkRef(ref, sliderRef);

  const createHandleHiddenInputFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      if (isFocusVisible(event.target)) {
        setFocusedThumbIndex(index);
      }
      setOpen(index);
      otherHandlers?.onFocus?.(event);
    };
  const createHandleHiddenInputBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent) => {
      if (!isFocusVisible(event.target)) {
        setFocusedThumbIndex(-1);
      }
      setOpen(-1);
      otherHandlers?.onBlur?.(event);
    };

  const changeValue = (event: React.KeyboardEvent | React.ChangeEvent, valueInput: number) => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const value = values[index];
    const marksIndex = marksValues.indexOf(value);

    let newValue: number | number[] = valueInput;
    if (marks && step == null) {
      const maxMarksValue = marksValues[marksValues.length - 1];
      if (newValue >= maxMarksValue) {
        newValue = maxMarksValue;
      } else if (newValue <= marksValues[0]) {
        newValue = marksValues[0];
      } else {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }
    }

    newValue = clamp(newValue, min, max);

    if (range) {
      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(newValue, values[index - 1] ?? -Infinity, values[index + 1] ?? Infinity);
      }

      const previousValue = newValue;
      newValue = setValueIndex(values, newValue, index);

      let activeIndex = index;

      // Potentially swap the index if needed.
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }

      focusThumb(sliderRef, activeIndex);
    }

    setValueState(newValue);
    setFocusedThumbIndex(index);

    if (onChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, lastChangedValueRef.current ?? newValue);
    }
  };

  const createHandleHiddenInputKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'PageUp',
          'PageDown',
          'Home',
          'End',
        ].includes(event.key)
      ) {
        event.preventDefault();
        const index = Number(event.currentTarget.getAttribute('data-index'));
        const value = values[index];
        let newValue = null;
        // Keys actions that change the value by more than the most granular `step`
        // value are only applied if the step not `null`.
        // When step is `null`, the `marks` prop is used instead to define valid values.
        if (step != null) {
          const stepSize = event.shiftKey ? shiftStep : step;
          switch (event.key) {
            case 'ArrowUp':
              newValue = getNewValue(value, stepSize, 1, min, max);
              break;
            case 'ArrowRight':
              newValue = getNewValue(value, stepSize, isRtl ? -1 : 1, min, max);
              break;
            case 'ArrowDown':
              newValue = getNewValue(value, stepSize, -1, min, max);
              break;
            case 'ArrowLeft':
              newValue = getNewValue(value, stepSize, isRtl ? 1 : -1, min, max);
              break;
            case 'PageUp':
              newValue = getNewValue(value, shiftStep, 1, min, max);
              break;
            case 'PageDown':
              newValue = getNewValue(value, shiftStep, -1, min, max);
              break;
            case 'Home':
              newValue = min;
              break;
            case 'End':
              newValue = max;
              break;
            default:
              break;
          }
        } else if (marks) {
          const maxMarksValue = marksValues[marksValues.length - 1];
          const currentMarkIndex = marksValues.indexOf(value);

          const decrementKeys = [
            isRtl ? 'ArrowRight' : 'ArrowLeft',
            'ArrowDown',
            'PageDown',
            'Home',
          ];
          const incrementKeys = [isRtl ? 'ArrowLeft' : 'ArrowRight', 'ArrowUp', 'PageUp', 'End'];

          if (decrementKeys.includes(event.key)) {
            if (currentMarkIndex === 0) {
              newValue = marksValues[0];
            } else {
              newValue = marksValues[currentMarkIndex - 1];
            }
          } else if (incrementKeys.includes(event.key)) {
            if (currentMarkIndex === marksValues.length - 1) {
              newValue = maxMarksValue;
            } else {
              newValue = marksValues[currentMarkIndex + 1];
            }
          }
        }

        if (newValue != null) {
          changeValue(event, newValue);
        }
      }

      otherHandlers?.onKeyDown?.(event);
    };

  useEnhancedEffect(() => {
    const activeElement = getActiveElement(ownerDocument(sliderRef.current));
    if (disabled && contains(sliderRef.current, activeElement)) {
      // This is necessary because Firefox and Safari will keep focus
      // on a disabled element:
      // https://codesandbox.io/p/sandbox/mui-pr-22247-forked-h151h?file=/src/App.js
      if (activeElement != null && 'blur' in activeElement) {
        (activeElement as HTMLElement).blur();
      }
    }
  }, [disabled]);

  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }

  const createHandleHiddenInputChange =
    (otherHandlers: EventHandlers) => (event: React.ChangeEvent<HTMLInputElement>) => {
      otherHandlers.onChange?.(event);
      // Handles value changes reported through the hidden range input.
      changeValue(event, event.currentTarget.valueAsNumber);
    };

  const previousIndexRef = React.useRef<number>(undefined);
  let axis = orientation;
  if (isRtl && orientation === 'horizontal') {
    axis += '-reverse';
  }

  // Converts finger coordinates to a slider value and determines the active thumb.
  // For range sliders, reads `previousIndexRef.current` to decide which thumb is active:
  //   -1 = initial press → find closest thumb
  //   ≥0 = drag in progress → keep same thumb
  // Callers must reset `previousIndexRef.current = -1` before calling on a new interaction.
  const getValueAtFinger = (finger: { x: number; y: number }) => {
    const { current: slider } = sliderRef;
    if (!slider) {
      return null;
    }
    const { width, height, bottom, left } = slider.getBoundingClientRect();
    let percent;

    if (axis.startsWith('vertical')) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }

    if (axis.includes('-reverse')) {
      percent = 1 - percent;
    }

    let newValue;
    newValue = percentToValue(percent, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex!];
    }

    newValue = clamp(newValue, min, max);
    let activeIndex = 0;

    if (range) {
      const isDragging = previousIndexRef.current !== -1;
      activeIndex = isDragging
        ? previousIndexRef.current!
        : findClosest(values, newValue, lastUsedThumbIndexRef.current)!;

      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(
          newValue,
          values[activeIndex - 1] ?? -Infinity,
          values[activeIndex + 1] ?? Infinity,
        );
      }

      const previousValue = newValue;
      newValue = setValueIndex(values, newValue, activeIndex);

      // Potentially swap the index if needed.
      if (!(disableSwap && isDragging)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndexRef.current = activeIndex;
      }
    }

    return { newValue, activeIndex };
  };

  const handleTouchMove = useEventCallback((nativeEvent: TouchEvent | PointerEvent) => {
    // Ignore pointer events from a different pointer than the one that started the drag.
    if ('pointerId' in nativeEvent && nativeEvent.pointerId !== activePointerIdRef.current) {
      return;
    }

    const finger = trackFinger(nativeEvent, touchIdRef);

    if (!finger) {
      return;
    }

    moveCountRef.current += 1;

    // Cancel move in case some other element consumed a pointerup event and it was not fired.
    if (nativeEvent.type === 'pointermove' && (nativeEvent as PointerEvent).buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }

    const newFingerValue = getValueAtFinger(finger);

    if (!newFingerValue) {
      return;
    }

    // React defers updates from continuous events like pointermove to a later task,
    // so the browser paints the frame with the thumb still at its previous position.
    // Flush them synchronously to move the thumb in the same frame as the pointer.
    ReactDOM.flushSync(() => {
      focusThumb(sliderRef, newFingerValue.activeIndex, setActive, false);
      lastUsedThumbIndexRef.current = newFingerValue.activeIndex;
      setValueState(newFingerValue.newValue);

      if (!dragging && moveCountRef.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
        setDragging(true);
      }

      if (onChange && !areValuesEqual(newFingerValue.newValue, valueDerived)) {
        handleChange(nativeEvent, newFingerValue.newValue, newFingerValue.activeIndex);
      }
    });
  });

  const handleTouchEnd = useEventCallback((nativeEvent: TouchEvent | PointerEvent) => {
    // Ignore pointer events from a different pointer than the one that started the drag.
    if ('pointerId' in nativeEvent && nativeEvent.pointerId !== activePointerIdRef.current) {
      return;
    }

    const finger = trackFinger(nativeEvent, touchIdRef);
    setDragging(false);

    if (!finger) {
      return;
    }

    const newFingerValue = getValueAtFinger(finger);

    setActive(-1);
    if (nativeEvent.type === 'touchend') {
      setOpen(-1);
    }

    if (newFingerValue && onChangeCommitted) {
      onChangeCommitted(nativeEvent, lastChangedValueRef.current ?? newFingerValue.newValue);
    }

    // Release pointer capture if applicable
    if (
      'pointerType' in nativeEvent &&
      sliderRef.current?.hasPointerCapture(nativeEvent.pointerId)
    ) {
      sliderRef.current.releasePointerCapture(nativeEvent.pointerId);
    }

    touchIdRef.current = undefined;
    activePointerIdRef.current = -1;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
  });

  const handleTouchStart = useEventCallback((nativeEvent: TouchEvent) => {
    if (disabled) {
      return;
    }

    // If the pointer path already handled this interaction,
    // only record the touch identifier and skip duplicate listener registration.
    if (pointerDownHandledRef.current) {
      pointerDownHandledRef.current = false;
      const touch = nativeEvent.changedTouches[0];
      if (touch != null) {
        touchIdRef.current = touch.identifier;
      }
      return;
    }

    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchIdRef.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchIdRef);
    if (finger !== false) {
      previousIndexRef.current = -1;
      const newFingerValue = getValueAtFinger(finger);
      if (newFingerValue) {
        focusThumb(sliderRef, newFingerValue.activeIndex, setActive, false);
        lastUsedThumbIndexRef.current = newFingerValue.activeIndex;

        setValueState(newFingerValue.newValue);

        if (onChange && !areValuesEqual(newFingerValue.newValue, valueDerived)) {
          handleChange(nativeEvent, newFingerValue.newValue, newFingerValue.activeIndex);
        }
      }
    }

    moveCountRef.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('touchmove', handleTouchMove, { passive: true });
    doc.addEventListener('touchend', handleTouchEnd, { passive: true });
  });

  const stopListening = React.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('pointermove', handleTouchMove);
    doc.removeEventListener('pointerup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);

  React.useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return undefined;
    }
    slider.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);

      cancelFocusFrame();
      stopListening();
    };
  }, [stopListening, handleTouchStart, cancelFocusFrame]);

  React.useEffect(() => {
    if (disabled) {
      stopListening();
      cancelFocusFrame();
    }
  }, [disabled, stopListening, cancelFocusFrame]);

  const createHandlePointerDown =
    (otherHandlers: EventHandlers) => (event: React.PointerEvent<HTMLSpanElement>) => {
      otherHandlers.onPointerDown?.(event);

      // On touch devices, the browser fires both pointerdown and touchstart for the
      // same physical touch. Mark this BEFORE early returns so handleTouchStart always
      // knows the pointer path saw this interaction — even if it was prevented or disabled.
      if (event.pointerType === 'touch') {
        pointerDownHandledRef.current = true;
      }

      if (disabled || event.defaultPrevented || event.button !== 0) {
        return;
      }

      const finger = trackFinger(event, touchIdRef);
      if (finger !== false) {
        previousIndexRef.current = -1;
        const newFingerValue = getValueAtFinger(finger);
        if (newFingerValue) {
          const thumbInput = sliderRef.current?.querySelector(
            `input[type="range"][data-index="${newFingerValue.activeIndex}"]`,
          );
          const doc = ownerDocument(sliderRef.current);
          const pressedOnFocusedThumb = thumbInput != null && thumbInput === getActiveElement(doc);

          setActive(newFingerValue.activeIndex);
          lastUsedThumbIndexRef.current = newFingerValue.activeIndex;

          if (pressedOnFocusedThumb) {
            event.preventDefault();
          } else {
            cancelFocusFrame();
            focusFrameRef.current = requestAnimationFrame(() => {
              focusFrameRef.current = null;
              focusThumb(sliderRef, newFingerValue.activeIndex, undefined, false);
            });
          }

          setValueState(newFingerValue.newValue);

          if (onChange && !areValuesEqual(newFingerValue.newValue, valueDerived)) {
            handleChange(event, newFingerValue.newValue, newFingerValue.activeIndex);
          }
        }
      }

      moveCountRef.current = 0;
      activePointerIdRef.current = event.pointerId;
      const doc = ownerDocument(sliderRef.current);

      // Use pointer capture for reliable drag tracking
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // setPointerCapture can throw if the pointerId is invalid (e.g. synthetic
        // events in tests, or the pointer was already released). The slider still
        // works via document-level listeners; pointer capture is a progressive
        // enhancement for reliable drag tracking.
      }

      doc.addEventListener('pointermove', handleTouchMove, { passive: true });
      doc.addEventListener('pointerup', handleTouchEnd);
    };

  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

  const getRootProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = EMPTY_OBJ as ExternalProps,
  ): UseSliderRootSlotProps<ExternalProps> => {
    const externalHandlers = extractEventHandlers(externalProps);

    const ownEventHandlers = {
      onPointerDown: createHandlePointerDown(externalHandlers),
    };

    const mergedEventHandlers = {
      ...externalHandlers,
      ...ownEventHandlers,
    };

    return {
      ...externalProps,
      ref: handleRef,
      ...mergedEventHandlers,
    };
  };

  const createHandleMouseOver =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      otherHandlers.onMouseOver?.(event);

      const index = Number(event.currentTarget.getAttribute('data-index'));
      setOpen(index);
    };

  const createHandleMouseLeave =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      otherHandlers.onMouseLeave?.(event);

      setOpen(-1);
    };

  const getThumbProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = EMPTY_OBJ as ExternalProps,
  ): UseSliderThumbSlotProps<ExternalProps> => {
    const externalHandlers = extractEventHandlers(externalProps);

    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(externalHandlers),
      onMouseLeave: createHandleMouseLeave(externalHandlers),
    };

    return {
      ...externalProps,
      ...externalHandlers,
      ...ownEventHandlers,
    };
  };

  const getThumbStyle = (index: number) => {
    let zIndex: number | undefined;
    if (range) {
      if (active === index) {
        zIndex = 2;
      } else if (lastUsedThumbIndexRef.current === index) {
        zIndex = 1;
      }
    } else if (active === index) {
      zIndex = 1;
    }

    return {
      // So the non active thumb doesn't show its label on hover.
      pointerEvents: active !== -1 && active !== index ? 'none' : undefined,
      zIndex,
    };
  };

  let cssWritingMode: 'vertical-rl' | 'vertical-lr' | undefined;
  if (orientation === 'vertical') {
    cssWritingMode = isRtl ? 'vertical-rl' : 'vertical-lr';
  }

  const getHiddenInputProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = EMPTY_OBJ as ExternalProps,
  ): UseSliderHiddenInputProps<ExternalProps> => {
    const externalHandlers = extractEventHandlers(externalProps);

    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(externalHandlers),
      onFocus: createHandleHiddenInputFocus(externalHandlers),
      onBlur: createHandleHiddenInputBlur(externalHandlers),
      onKeyDown: createHandleHiddenInputKeyDown(externalHandlers),
    };

    const mergedEventHandlers = {
      ...externalHandlers,
      ...ownEventHandlers,
    };

    return {
      tabIndex,
      'aria-labelledby': ariaLabelledby,
      'aria-orientation': orientation,
      'aria-valuemax': scale(max),
      'aria-valuemin': scale(min),
      name,
      type: 'range',
      min: parameters.min,
      max: parameters.max,
      step: parameters.step === null && parameters.marks ? 'any' : (parameters.step ?? undefined),
      disabled,
      ...externalProps,
      ...mergedEventHandlers,
      style: {
        ...visuallyHidden,
        direction: isRtl ? 'rtl' : 'ltr',
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: '100%',
        height: '100%',
        writingMode: cssWritingMode,
      },
    };
  };

  return {
    active,
    axis: axis as keyof typeof axisProps,
    axisProps,
    dragging,
    focusedThumbIndex,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks,
    open,
    range,
    rootRef: handleRef,
    trackLeap,
    trackOffset,
    values,
    getThumbStyle,
  };
}
