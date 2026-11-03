import { isPlainObject } from '@mui/utils/deepmerge';
import defaultSxConfig from './defaultSxConfig';
import type { SxProps } from './styleFunctionSx';

const splitProps = (props: any) => {
  const result: { systemProps: Record<string, any>; otherProps: Record<string, any> } = {
    systemProps: {},
    otherProps: {},
  };

  const config = props?.theme?.unstable_sxConfig ?? defaultSxConfig;

  Object.keys(props).forEach((prop) => {
    if ((config as any)[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });

  return result;
};

export default function extendSxProp<
  Props extends { sx?: SxProps<any> | undefined } = { sx?: SxProps<any> | undefined },
>(props: Props): Props {
  const { sx: inSx, ...other } = props as any;
  const { systemProps, otherProps } = splitProps(other);

  let finalSx: any;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === 'function') {
    finalSx = (...args: any[]) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return { ...systemProps, ...result };
    };
  } else {
    finalSx = { ...systemProps, ...inSx };
  }

  return {
    ...otherProps,
    sx: finalSx,
  } as Props;
}
