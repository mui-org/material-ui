import * as React from 'react';

export interface AdConfig {
  /**
   * The ratio of "ad display" event sent to Google Analytics.
   * Used to avoid an exceed on the Google Analytics quotas.
   * @default 0.1
   */
  GADisplayRatio: number;
}

export interface AdProviderProps {
  children: React.ReactNode;
  config?: Partial<AdConfig>;
}

const AdConfigContext = React.createContext<AdConfig | null>(null);

export function AdProvider(props: AdProviderProps) {
  const { children, config } = props;

  const value = React.useMemo(() => ({ GADisplayRatio: 0.1, ...config }), [config]);

  return <AdConfigContext.Provider value={value}>{children}</AdConfigContext.Provider>;
}

export function useAdConfig() {
  const config = React.useContext(AdConfigContext);
  if (!config) {
    throw new Error(
      'Could not find docs ad config context value; please ensure the component is wrapped in a <AdProvider>',
    );
  }
  return config;
}
