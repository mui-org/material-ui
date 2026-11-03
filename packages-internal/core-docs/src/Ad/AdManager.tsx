import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';

type AdPortal = {
  placement: 'body-top';
  element: Element | null;
};

interface AdManagerProps {
  /**
   * The querySelector use to target the element which will include the ad.
   */
  classSelector?: string;
  children?: React.ReactNode | undefined;
}

export const AdContext = React.createContext<AdPortal>({ placement: 'body-top', element: null });

// Persisted for the whole session.
// The state is used to use different ad placements.
const randomSession = Math.random();

// Distribution profile:
// 20% body-inline
// 80% body-image
export const adShape = randomSession < 0.2 ? 'inline' : 'image';

export function AdManager({ classSelector = '.description', children }: AdManagerProps) {
  const [portal, setPortal] = React.useState<AdPortal>({ placement: 'body-top', element: null });

  useEnhancedEffect(() => {
    const container = document.querySelector(classSelector);
    setPortal({ placement: 'body-top', element: container });
  }, [classSelector]);

  return <AdContext.Provider value={portal}>{children}</AdContext.Provider>;
}
