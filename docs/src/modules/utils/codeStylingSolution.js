import * as React from 'react';
import PropTypes from 'prop-types';
import { getCookie } from '@mui/internal-core-docs/helpers';
import { CODE_STYLING } from '@mui/internal-core-docs/constants';

const CodeStylingContext = React.createContext({
  codeStyling: CODE_STYLING.SYSTEM,
  setCodeStyling: () => {},
});
if (process.env.NODE_ENV !== 'production') {
  CodeStylingContext.displayName = 'CodeStyling';
}

function useFirstRender() {
  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return firstRenderRef.current;
}

export function CodeStylingProvider(props) {
  const { children } = props;

  const [codeStyling, setCodeStyling] = React.useState(CODE_STYLING.SYSTEM);

  const navigatedCodeStyling = React.useMemo(() => {
    const navigatedCodeMatch =
      typeof window !== 'undefined' ? window.location.hash.match(/\.(js|tsx)$/) : null;

    if (navigatedCodeMatch === null) {
      return undefined;
    }

    if (typeof window !== 'undefined') {
      if (window.location.hash.includes('tailwind-')) {
        return CODE_STYLING.TAILWIND;
      }
      if (window.location.hash.includes('css-')) {
        return CODE_STYLING.CSS;
      }
      if (window.location.hash.includes('system-')) {
        return CODE_STYLING.SYSTEM;
      }
    }

    return undefined;
  }, []);

  const persistedCodeStyling = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return getCookie('codeStyling');
  }, []);
  const isFirstRender = useFirstRender();

  // We initialize from navigation or cookies. on subsequent renders the store is the truth
  const noSsrCodeStyling =
    isFirstRender === true
      ? navigatedCodeStyling || persistedCodeStyling || codeStyling
      : codeStyling;

  React.useEffect(() => {
    if (codeStyling !== noSsrCodeStyling) {
      setCodeStyling(noSsrCodeStyling);
    }
  }, [codeStyling, noSsrCodeStyling]);

  React.useEffect(() => {
    document.cookie = `codeStyling=${codeStyling};path=/;max-age=31536000`;
  }, [codeStyling]);

  const contextValue = React.useMemo(() => {
    return { codeStyling, noSsrCodeStyling, setCodeStyling };
  }, [codeStyling, noSsrCodeStyling]);

  return <CodeStylingContext.Provider value={contextValue}>{children}</CodeStylingContext.Provider>;
}

CodeStylingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCodeStyling() {
  return React.useContext(CodeStylingContext).codeStyling;
}

export function useNoSsrCodeStyling() {
  return React.useContext(CodeStylingContext).noSsrCodeStyling;
}

export function useSetCodeStyling() {
  return React.useContext(CodeStylingContext).setCodeStyling;
}
