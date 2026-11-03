import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function DelayingAppearance() {
  // @focus-start @padding 1
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }

    setQuery('progress');
    timerRef.current = setTimeout(() => {
      setQuery('success');
    }, 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ height: 40 }}>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress aria-label="Loading…" />
        </Fade>
      </Box>
      <Button onClick={handleClickLoading} sx={{ m: 2 }}>
        {loading ? 'Stop loading' : 'Loading'}
      </Button>
      <Box sx={{ height: 40 }}>
        {query === 'success' ? (
          <Typography>Success!</Typography>
        ) : (
          <Fade
            in={query === 'progress'}
            style={{
              transitionDelay: query === 'progress' ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress aria-label="Loading…" />
          </Fade>
        )}
      </Box>
      <Button onClick={handleClickQuery} sx={{ m: 2 }}>
        {query !== 'idle' ? 'Reset' : 'Simulate a load'}
      </Button>
    </Box>
  );
  // @focus-end
}
