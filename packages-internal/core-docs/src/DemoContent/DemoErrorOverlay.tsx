import * as React from 'react';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

// `styled` (static, cached) rather than `sx` (re-processed per render): this
// overlay can re-render on every live-edit keystroke, so keep its styles off the
// render path.
const ErrorAlert = styled(Alert)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  maxWidth: 'calc(100% - 32px)',
  transform: 'translateX(-50%) translateY(-50%)',
  paddingTop: '2px',
  paddingBottom: '2px',
  paddingLeft: '6px',
  paddingRight: '6px',
  '& .MuiAlert-icon': {
    fontSize: 14,
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.25),
    paddingTop: 0,
    paddingBottom: 0,
  },
  '& .MuiAlert-message': {
    fontSize: 12,
    paddingTop: 0,
    paddingBottom: 0,
    whiteSpace: 'pre-wrap',
  },
}));

// Drops a trailing `(line:column)` from a parse-error message. The position is
// relative to the FULL transpiled source; while the code is collapsed the user
// only sees the preview snippet, so the numbers point at lines they can't see.
function stripPosition(message: string): string {
  return message.replace(/\s*\(\d+:\d+\)$/, '');
}

/**
 * Floating alert anchored to the top border of the code panel (below the toolbar,
 * where the user is editing). Surfaces the live-edit runtime error for the selected
 * variant, reported by `useDemoController` through `CodeControllerContext` and read
 * off `useDemo().error`.
 */
export function DemoErrorOverlay({ message }: { message: string | null }) {
  const requestRef = React.useRef({ message, id: 0 });
  if (requestRef.current.message !== message) {
    requestRef.current = { message, id: requestRef.current.id + 1 };
  }
  const [visibleError, setVisibleError] = React.useState<{
    message: string;
    requestId: number;
  } | null>(null);

  React.useEffect(() => {
    if (!message) {
      return undefined;
    }
    const requestId = requestRef.current.id;
    const timeout = setTimeout(() => setVisibleError({ message, requestId }), 300);
    return () => clearTimeout(timeout);
  }, [message]);

  if (
    !message ||
    visibleError?.requestId !== requestRef.current.id ||
    visibleError.message !== message
  ) {
    return null;
  }
  return (
    <ErrorAlert aria-live="polite" variant="filled" severity="error">
      {stripPosition(visibleError.message)}
    </ErrorAlert>
  );
}
