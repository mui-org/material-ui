'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

interface RtlProviderProps {
  children?: React.ReactNode;
  value?: boolean | undefined;
}

const RtlContext = React.createContext<boolean | undefined>(undefined);

function RtlProvider({ value, ...props }: RtlProviderProps) {
  return <RtlContext.Provider value={value ?? true} {...props} />;
}

RtlProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.bool,
} as any;

export const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider as React.FC<RtlProviderProps>;
