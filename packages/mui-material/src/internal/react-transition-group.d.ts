declare module 'react-transition-group/TransitionGroupContext' {
  import * as React from 'react';

  interface TransitionGroupContextValue {
    isMounting: boolean;
  }

  const TransitionGroupContext: React.Context<TransitionGroupContextValue | null>;
  export default TransitionGroupContext;
}

declare module 'react-transition-group/cjs/TransitionGroupContext.js' {
  import * as React from 'react';

  interface TransitionGroupContextValue {
    isMounting: boolean;
  }

  const TransitionGroupContext: React.Context<TransitionGroupContextValue | null>;
  export default TransitionGroupContext;
}
