import * as React from 'react';
import { styled, keyframes, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface OpenInMUIChatButtonProps extends Omit<ButtonProps, 'onClick'> {
  /**
   * Async handler that performs the MUI Chat API call. Typically wired to
   * `useDemo()`'s `openMuiChat`. When `undefined`, the button renders nothing
   * (env vars missing / scope not enabled).
   */
  openMuiChat?: () => Promise<void>;
}

const rainbow = keyframes`
  0% {
    background-position: -100% center;
  }
  100% {
    background-position: 100% center;
  }
`;

const RainbowButton = styled(Button)(({ theme }) => ({
  '--color-1': '0 100% 50%',
  '--color-2': '270 100% 50%',
  '--color-3': '210 100% 50%',
  '--color-4': '195 100% 50%',
  '--color-5': '90 100% 50%',
  position: 'relative',
  display: 'inline-flex',
  height: 26,
  padding: '7px 8px 8px 8px', // 7px for optical alignment
  flexShrink: 0,
  borderRadius: 999,
  border: '1px solid transparent',
  borderBottomWidth: '2.5px',
  borderColor: alpha(theme.palette.grey[200], 0.8),
  '&.MuiButton-loading': {
    '& > svg': {
      transform: 'translateX(36px)',
    },
  },
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  backgroundSize: '200%',
  backgroundClip: 'padding-box, border-box, border-box',
  backgroundOrigin: 'border-box',
  '--bg-color-raw': '255,255,255',
  '--bg-color': 'rgb(var(--bg-color-raw))',
  backgroundImage: `linear-gradient(var(--bg-color), var(--bg-color)), linear-gradient(var(--bg-color) 50%, rgba(var(--bg-color-raw)) 80%, rgba(var(--bg-color-raw), 0)), linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))`,
  // Bring the rainbow to life only while hovered. Because just the single
  // hovered button animates (rather than every button on the page,
  // continuously), the animation no longer competes with demo
  // expand/collapse transitions — so none of the previous `contain` /
  // `isolation` / `data-demo-transitioning` machinery is needed.
  '&:hover': {
    '--bg-color-raw': '235,245,255',
    animation: `${rainbow} 2s linear infinite`,
    '&::before': {
      animation: `${rainbow} 3s linear infinite`,
    },
  },
  ...theme.applyDarkStyles({
    '--bg-color-raw': '16, 18, 20',
    borderColor: alpha(theme.palette.primary[300], 0.2),
    '&:hover': {
      '--bg-color-raw': '13, 38, 63',
    },
  }),
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-25%',
    left: '50%',
    zIndex: 0,
    height: '20%',
    width: '60%',
    transform: 'translateX(-50%)',
    background:
      'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))',
    filter: 'blur(1.2rem)',
    ...theme.applyDarkStyles({
      width: '90%',
      filter: 'blur(0.5rem)',
    }),
  },
  '& > svg': {
    height: 18,
    width: 18,
    margin: '0 4px 0 0',
    stroke: (theme.vars || theme).palette.primary.main,
    fill: (theme.vars || theme).palette.primary.main,
    transition: 'transform 0.4s',
  },
}));

export const OpenInMUIChatButton = React.forwardRef<HTMLButtonElement, OpenInMUIChatButtonProps>(
  function OpenInMUIChatButton({ openMuiChat, ...props }, ref) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    if (!openMuiChat) {
      return null;
    }

    const handleClick = async () => {
      setLoading(true);
      setError(null);
      try {
        await openMuiChat();
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    return (
      <React.Fragment>
        <RainbowButton
          data-mui-color-scheme="dark"
          ref={ref}
          loading={loading}
          disabled={!!error}
          loadingIndicator={<CircularProgress color="inherit" size={12} />}
          onClick={handleClick}
          {...props}
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>{' '}
          Edit in Chat
        </RainbowButton>
        <Snackbar
          open={!!error}
          color="error"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setError(null)}
          autoHideDuration={6000}
        >
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error?.message || 'Failed to open in MUI Chat'}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  },
);
