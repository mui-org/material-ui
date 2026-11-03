import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import { StyledEngineProvider } from '@mui/material/styles';

function TestViewer(props) {
  const { children, path } = props;

  // We're simulating `act(() => ReactDOM.render(children))`
  // In the end children passive effects should've been flushed.
  // React doesn't have any such guarantee outside of `act()` so we're approximating it.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    function handleFontsEvent(event) {
      if (event.type === 'loading') {
        setReady(false);
      } else if (event.type === 'loadingdone') {
        // Don't know if there could be multiple loaded events after we started loading multiple times.
        // So make sure we're only ready if fonts are actually ready.
        if (document.fonts.status === 'loaded') {
          setReady(true);
        }
      }
    }

    document.fonts.addEventListener('loading', handleFontsEvent);
    document.fonts.addEventListener('loadingdone', handleFontsEvent);

    // In case the child triggered font fetching we're not ready yet.
    // The fonts event handler will mark the test as ready on `loadingdone`
    if (document.fonts.status === 'loaded') {
      setReady(true);
    }

    return () => {
      document.fonts.removeEventListener('loading', handleFontsEvent);
      document.fonts.removeEventListener('loadingdone', handleFontsEvent);
    };
  }, []);

  const viewerBoxSx = {
    display: 'block',
    p: 1,
  };

  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles
        styles={{
          html: {
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
            // Do the opposite of the docs in order to help catching issues.
            boxSizing: 'content-box',
          },
          '*, *::before, *::after': {
            boxSizing: 'inherit',
            // Disable transitions to avoid flaky screenshots
            transition: 'none !important',
            animation: 'none !important',
          },
          body: {
            margin: 0,
            overflowX: 'hidden',
          },
        }}
      />
      <Box
        aria-busy={!ready}
        data-testid="testcase"
        data-testpath={path}
        sx={{ bgcolor: 'background.default', ...viewerBoxSx }}
      >
        {children}
      </Box>
    </StyledEngineProvider>
  );
}

TestViewer.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default TestViewer;
