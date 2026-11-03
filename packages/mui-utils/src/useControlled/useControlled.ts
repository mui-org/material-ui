'use client';
// TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes, dependency arrays are intentionally ignored
/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
import * as React from 'react';

export interface UseControlledProps<T = unknown> {
  /**
   * Holds the component value when it's controlled.
   */
  controlled: T | undefined;
  /**
   * The default value when uncontrolled.
   */
  default: T | undefined;
  /**
   * The component name displayed in warnings.
   */
  name: string;
  /**
   * The name of the state variable displayed in warnings.
   */
  state?: string | undefined;
}

export default function useControlled<T = unknown>(
  props: UseControlledProps<T>,
): [T, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const { controlled, default: defaultProp, name, state = 'value' } = props;
  // isControlled is ignored in the hook dependency lists as it should never change.
  const { current: isControlled } = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState<T | undefined>(defaultProp);
  const value = isControlled ? controlled : valueState;

  if (process.env.NODE_ENV !== 'production') {
    React.useEffect(() => {
      if (isControlled !== (controlled !== undefined)) {
        console.error(
          [
            `MUI: A component is changing the ${
              isControlled ? '' : 'un'
            }controlled ${state} state of ${name} to be ${isControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${name} ` +
              'element for the lifetime of the component.',
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [state, name, controlled]);

    const { current: defaultValue } = React.useRef(defaultProp);

    React.useEffect(() => {
      if (!isControlled && JSON.stringify(defaultProp) !== JSON.stringify(defaultValue)) {
        console.error(
          [
            `MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n'),
        );
      }
    }, [JSON.stringify(defaultProp)]);
  }

  const setValueIfUncontrolled: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback((newValue: React.SetStateAction<T | undefined>) => {
      if (!isControlled) {
        setValue(newValue);
      }
    }, []);

  // TODO: provide overloads for the useControlled function to account for the case where either
  // controlled or default is not undefined.
  // In that case the return type should be [T, React.Dispatch<React.SetStateAction<T>>]
  // otherwise it should be [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>]
  return [value as T, setValueIfUncontrolled];
}
