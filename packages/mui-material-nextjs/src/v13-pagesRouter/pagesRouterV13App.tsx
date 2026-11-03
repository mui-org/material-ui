import * as React from 'react';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createCache';
import { useRouter as usePagesRouter } from '../nextCompatRouter.cjs';

export interface EmotionCacheProviderProps {
  emotionCache?: EmotionCache | undefined;
}

const defaultEmotionCache = createEmotionCache();

export function AppCacheProvider({
  emotionCache = defaultEmotionCache,
  children,
}: React.PropsWithChildren<EmotionCacheProviderProps>) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = usePagesRouter();
    if (!router) {
      console.error(
        [
          'The Pages router CacheProvider is not compatible with the App router.',
          'Please use the App Router CacheProvider from `@mui/material-ui-nextjs/vx-appRouter` instead.',
        ].join('n'),
      );
    }
  }
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
