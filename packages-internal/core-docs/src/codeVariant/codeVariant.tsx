import * as React from 'react';
import { CODE_VARIANTS } from '../constants';
import { getCookie } from '../helpers/index';

interface CodeVariantContextValue {
  codeVariant: string;
  noSsrCodeVariant?: string;
  setCodeVariant: React.Dispatch<React.SetStateAction<string>>;
}

const CodeVariantContext = React.createContext<CodeVariantContextValue>({
  codeVariant: CODE_VARIANTS.TS,
  setCodeVariant: () => {},
});
if (process.env.NODE_ENV !== 'production') {
  CodeVariantContext.displayName = 'CodeVariant';
}

function useFirstRender() {
  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return firstRenderRef.current;
}

export function resolveInitialCodeVariant(urlHash: string, cookie: string | undefined) {
  const sourceExtension = urlHash.match(/\.(js|jsx|ts|tsx)$/)?.[1];
  if (sourceExtension) {
    return sourceExtension === 'js' || sourceExtension === 'jsx'
      ? CODE_VARIANTS.JS
      : CODE_VARIANTS.TS;
  }
  if (cookie === CODE_VARIANTS.JS || cookie === CODE_VARIANTS.TS) {
    return cookie;
  }
  return CODE_VARIANTS.TS;
}

export function CodeVariantProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [codeVariant, setCodeVariant] = React.useState(CODE_VARIANTS.TS);

  const initialCodeVariant = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return CODE_VARIANTS.TS;
    }
    return resolveInitialCodeVariant(window.location.hash, getCookie('codeVariant'));
  }, []);
  const isFirstRender = useFirstRender();

  // Initialize from navigation or cookies. On subsequent renders the store is the truth.
  const noSsrCodeVariant = isFirstRender ? initialCodeVariant : codeVariant;

  React.useEffect(() => {
    if (codeVariant !== noSsrCodeVariant) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCodeVariant(noSsrCodeVariant);
    }
  }, [codeVariant, noSsrCodeVariant]);

  React.useEffect(() => {
    document.cookie = `codeVariant=${codeVariant};path=/;max-age=31536000`;
  }, [codeVariant]);

  const contextValue = React.useMemo(() => {
    return { codeVariant, noSsrCodeVariant, setCodeVariant };
  }, [codeVariant, noSsrCodeVariant]);

  return <CodeVariantContext.Provider value={contextValue}>{children}</CodeVariantContext.Provider>;
}

export function useCodeVariant() {
  return React.useContext(CodeVariantContext).codeVariant;
}

export function useNoSsrCodeVariant() {
  return React.useContext(CodeVariantContext).noSsrCodeVariant;
}

export function useSetCodeVariant() {
  return React.useContext(CodeVariantContext).setCodeVariant;
}
