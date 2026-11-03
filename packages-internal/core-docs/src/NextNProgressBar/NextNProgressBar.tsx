import * as React from 'react';
import { debounce } from '@mui/material/utils';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import NProgressBar from './NProgressBar';

const nProgressStart = debounce(() => {
  NProgress.start();
}, 200);

function nProgressDone() {
  nProgressStart.clear();
  NProgress.done();
}

export function NextNProgressBar() {
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChangeStart = (_url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        nProgressStart();
      }
    };

    const handleRouteChangeDone = (_url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        nProgressDone();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeDone);
    router.events.on('routeChangeError', handleRouteChangeDone);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeDone);
      router.events.off('routeChangeError', handleRouteChangeDone);
    };
  }, [router]);

  return <NProgressBar />;
}
