import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { prefixer } from 'stylis';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeOptionsContext } from '../ThemeContext';

type EmotionCache = ReturnType<typeof createCache>;

type StyledEngineProviderProps = {
  cacheLtr: EmotionCache;
  children: React.ReactNode;
};

let rtlCachePromise: Promise<EmotionCache> | undefined;
function loadRtlCache() {
  rtlCachePromise ??= import('@mui/stylis-plugin-rtl').then(({ default: rtlPlugin }) =>
    createCache({
      key: 'rtl',
      prepend: true,
      enableCssLayer: true,
      stylisPlugins: [prefixer, rtlPlugin],
    }),
  );
  return rtlCachePromise;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps) {
  const { children, cacheLtr } = props;
  const { direction } = React.useContext(ThemeOptionsContext);
  const rtl = direction === 'rtl';
  const [cacheRtl, setCacheRtl] = React.useState<EmotionCache | null>(null);

  React.useEffect(() => {
    if (rtl && !cacheRtl) {
      loadRtlCache().then(setCacheRtl);
    }
  }, [rtl, cacheRtl]);

  return (
    <CacheProvider value={rtl && cacheRtl ? cacheRtl : cacheLtr}>
      <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
      {children}
    </CacheProvider>
  );
}
