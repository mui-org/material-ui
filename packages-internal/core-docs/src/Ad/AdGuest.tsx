import * as React from 'react';
import Portal from '@mui/material/Portal';
import { AdContext } from './AdManager';

export interface AdGuestProps {
  /**
   * The querySelector use to target the element which will include the ad.
   */
  classSelector?: string;
  children?: React.ReactNode | undefined;
}

function AdGuest(props: AdGuestProps) {
  const { classSelector = '.description', children } = props;
  const ad = React.useContext(AdContext);

  if (!ad.element) {
    return null;
  }

  return (
    <Portal
      container={() => {
        const element = document.querySelector(classSelector);

        if (element) {
          if (ad.element === element) {
            element.classList.add('ad');
          } else {
            element.classList.remove('ad');
          }
        }

        return ad.element;
      }}
    >
      {children}
    </Portal>
  );
}

export { AdGuest };
