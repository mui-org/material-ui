import * as React from 'react';
import Box from '@mui/material/Box';

import useResizeHandle from 'docs/src/modules/utils/useResizeHandle';
import { Frame } from '@mui/internal-core-docs/AppLayout';

export default function CustomThemeComparison() {
  const objectRef = React.useRef(null);
  const handleDragging = React.useCallback((target, length) => {
    const rect = target.getBoundingClientRect();
    target.style.setProperty(
      '--split-point',
      `clamp(12px, ${((length * 100) / rect.width).toFixed(2)}%, calc(100% - 12px))`,
    );
  }, []);
  const { dragging, getDragHandlers } = useResizeHandle(objectRef, {
    onDragging: handleDragging,
  });
  return (
    <Frame
      ref={objectRef}
      style={{ touchAction: dragging ? 'none' : 'auto' }}
      sx={{
        height: 'clamp(260px, 40vmax, 420px)',
        mx: { md: '-64px' },
        position: 'relative',
        mb: 2,
        '--split-point': '50%',
        '& > *': {
          borderRadius: '12px',
        },
      }}
    >
      <Frame.Demo
        sx={{
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: 'inset(0 calc(100% - var(--split-point)) 0 0)',
        }}
      >
        <Box
          component="img"
          src="/static/screenshots/material-ui/getting-started/templates/dashboard-default.jpg"
          sx={(theme) => ({
            userSelect: 'none',
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            ...theme.applyStyles('dark', {
              content:
                'url(/static/screenshots/material-ui/getting-started/templates/dashboard-default-dark.jpg)',
            }),
          })}
        />
      </Frame.Demo>
      <Frame.Demo
        sx={{
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: 'inset(0 0 0 var(--split-point))',
        }}
      >
        <Box
          component="img"
          src="/static/screenshots/material-ui/getting-started/templates/dashboard.jpg"
          loading="lazy"
          sx={(theme) => ({
            userSelect: 'none',
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            ...theme.applyStyles('dark', {
              content:
                'url(/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)',
            }),
          })}
        />
      </Frame.Demo>
      <Box
        {...getDragHandlers()}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 20,
          left: 'var(--split-point)',
          transform: 'translateX(-50%)',
          cursor: 'col-resize',
        }}
      >
        <Box
          sx={{
            margin: '0 auto',
            width: 10,
            bgcolor: 'background.default',
            height: '100%',
            borderInline: '1px solid',
            borderColor: 'divider',
          }}
        />
        <Box
          className="handleButton"
          sx={{
            position: 'absolute',
            width: 2,
            height: 14,
            borderRadius: '12px',
            bgcolor: 'primary.main',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%)',
            transition: '0.15s',
          }}
        />
      </Box>
    </Frame>
  );
}
