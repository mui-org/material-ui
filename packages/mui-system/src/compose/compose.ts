import fastDeepAssign from '@mui/utils/fastDeepAssign';
import type { StyleFunction } from '../style';

type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;
type ComposedOwnerState<T> = ComposedArg<T>;

export type ComposedStyleFunction<T extends Array<StyleFunction<any>>> = StyleFunction<
  ComposedOwnerState<T>
> & { filterProps: string[] };

function compose<T extends Array<StyleFunction<any>>>(...styles: T): ComposedStyleFunction<T> {
  const handlers: Record<string, any> = (styles as any[]).reduce(
    (acc, style) => {
      style.filterProps.forEach((prop: string) => {
        acc[prop] = style;
      });

      return acc;
    },
    {} as Record<string, any>,
  );

  const fn = ((props: any) => {
    const result: Record<string, any> = {};
    for (const prop in props) {
      if (handlers[prop]) {
        fastDeepAssign(result, handlers[prop](props));
      }
    }
    return result;
  }) as ComposedStyleFunction<T>;

  (fn as any).propTypes =
    process.env.NODE_ENV !== 'production'
      ? (styles as any[]).reduce((acc, style) => Object.assign(acc, style.propTypes), {})
      : {};

  (fn as any).filterProps = (styles as any[]).reduce(
    (acc: string[], style) => acc.concat(style.filterProps),
    [] as string[],
  );

  return fn;
}

export default compose;
