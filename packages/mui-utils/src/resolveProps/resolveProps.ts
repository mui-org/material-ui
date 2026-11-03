import clsx from 'clsx';

/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param defaultProps
 * @param props
 * @param mergeClassNameAndStyle If `true`, merges `className` and `style` props instead of overriding them.
 *   When `false` (default), props override defaultProps. When `true`, `className` values are concatenated
 *   and `style` objects are merged with props taking precedence.
 * @returns resolved props
 */
export default function resolveProps<
  T extends {
    components?: Record<string, unknown> | undefined;
    componentsProps?: Record<string, unknown> | undefined;
    slots?: Record<string, unknown> | undefined;
    slotProps?: Record<string, unknown> | undefined;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
  } & Record<string, unknown>,
>(defaultProps: T, props: T, mergeClassNameAndStyle: boolean = false) {
  const output = { ...props };

  for (const key in defaultProps) {
    if (Object.prototype.hasOwnProperty.call(defaultProps, key)) {
      const propName = key as keyof T;

      if (propName === 'components' || propName === 'slots') {
        output[propName] = {
          ...(defaultProps[propName] as any),
          ...(output[propName] as any),
        };
      } else if (propName === 'componentsProps' || propName === 'slotProps') {
        const defaultSlotProps = defaultProps[propName] as T[keyof T] | undefined;
        const slotProps = props[propName] as {} as T[keyof T] | undefined;

        if (!slotProps) {
          output[propName] = defaultSlotProps || ({} as T[keyof T]);
        } else if (!defaultSlotProps) {
          output[propName] = slotProps;
        } else {
          output[propName] = { ...slotProps };

          for (const slotKey in defaultSlotProps) {
            if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
              const slotPropName = slotKey;
              const defaultSlotPropValue = (defaultSlotProps as Record<string, any>)[slotPropName];
              const slotPropValue = (slotProps as Record<string, any>)[slotPropName];

              if (
                typeof defaultSlotPropValue === 'function' ||
                typeof slotPropValue === 'function'
              ) {
                // Function slot props are resolved later (with `ownerState`), so defer
                // the merge until then to avoid dropping either side.
                (output[propName] as Record<string, unknown>)[slotPropName] = (
                  ...args: unknown[]
                ) =>
                  resolveProps(
                    (typeof defaultSlotPropValue === 'function'
                      ? defaultSlotPropValue(...args)
                      : defaultSlotPropValue) ?? {},
                    (typeof slotPropValue === 'function'
                      ? slotPropValue(...args)
                      : slotPropValue) ?? {},
                    mergeClassNameAndStyle,
                  );
              } else {
                (output[propName] as Record<string, unknown>)[slotPropName] = resolveProps(
                  defaultSlotPropValue ?? {},
                  slotPropValue ?? {},
                  mergeClassNameAndStyle,
                );
              }
            }
          }
        }
      } else if (
        propName === 'className' &&
        mergeClassNameAndStyle &&
        props.className !== undefined
      ) {
        output.className = clsx(defaultProps?.className, props?.className);
      } else if (propName === 'style' && mergeClassNameAndStyle && props.style) {
        output.style = {
          ...defaultProps?.style,
          ...props?.style,
        };
      } else if (output[propName] === undefined) {
        output[propName] = defaultProps[propName];
      }
    }
  }

  return output;
}
