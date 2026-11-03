import * as React from 'react';

const MultiApp = React.createContext<{
  multiApp: boolean;
  setMultiApp: React.Dispatch<React.SetStateAction<boolean>>;
}>(undefined as any);

if (process.env.NODE_ENV !== 'production') {
  MultiApp.displayName = 'MultiApp';
}

export function MultiAppProvider(props: any) {
  const [multiApp, setMultiApp] = React.useState<boolean>(false);
  const value = React.useMemo(() => ({ multiApp, setMultiApp }), [multiApp, setMultiApp]);
  return <MultiApp.Provider value={value}>{props.children}</MultiApp.Provider>;
}

export function useMultiApp() {
  return React.useContext(MultiApp);
}
