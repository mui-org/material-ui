import * as React from 'react';
import { useRunner } from 'react-runner';

export interface ReactRunnerProps {
  code: string;
  scope: {
    process: {};
    import: {};
  };
  onError: (error: string | null) => {};
}

// The docs https://github.com/nihgwu/react-runner
export function ReactRunner(props: ReactRunnerProps) {
  const { code, scope: scopeProp, onError } = props;

  let scope = scopeProp;

  if (process.env.NODE_ENV !== 'production') {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- valid reason to disable the rules of hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks -- process.env never changes
    scope = React.useMemo(() => {
      const handler = {
        get() {
          throw new Error(
            [
              'A demo tries to access process.x in ReactRunner. This is not supported.',
              'If you do not need to show the source, you can set "hideToolbar": true to solve the issue.',
            ].join('\n'),
          );
        },
      };

      return {
        ...scopeProp,
        process: new Proxy(scopeProp.process, handler),
      };
    }, [scopeProp]);
  }

  const { element, error } = useRunner({
    code,
    scope,
  });

  React.useEffect(() => {
    onError(error);
  }, [error, onError]);

  return element;
}
