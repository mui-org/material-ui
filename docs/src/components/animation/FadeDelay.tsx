import * as React from 'react';
import type { FadeProps } from '@mui/material/Fade';
import Fade from '@mui/material/Fade';

export default function FadeDelay({ delay, ...props }: { delay: number } & FadeProps) {
  const [fadeIn, setFadeIn] = React.useState(false);
  React.useEffect(() => {
    const time = setTimeout(() => {
      setFadeIn(true);
    }, delay);
    return () => {
      clearTimeout(time);
    };
  }, [delay]);
  return <Fade in={fadeIn} timeout={1000} {...props} />;
}
