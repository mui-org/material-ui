import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useTranslate } from '../i18n';

// Wraps the rendered demo component so a runtime render error doesn't leave
// the user with a blank preview. Surfaces a localized "report this error" link
// prefilled with environment details, plus a reset button that re-mounts the
// demo.

function newGitHubIssueUrl(options: Record<string, string>): string {
  const url = `${process.env.SOURCE_CODE_REPO}/issues/new`;
  const query = Object.keys(options)
    .map((type) => `${type}=${encodeURIComponent(String(options[type]))}`)
    .join('&');
  return `${url}?${query}`;
}

export interface DemoErrorBoundaryProps {
  children: React.ReactNode;
  /** Demo name used in the prefilled issue title and the fallback heading. */
  name: string;
  /** Optional reset hook \u2014 when provided, the fallback shows a reset button. */
  onReset?: () => void;
}

interface DemoErrorBoundaryState {
  error: Error | null;
}

interface DemoErrorFallbackProps {
  error: Error;
  name: string;
  onReset?: () => void;
}

function DemoErrorFallback({ error, name, onReset }: DemoErrorFallbackProps) {
  const t = useTranslate();
  const title = `[docs] Demo ${name} crashes`;
  const searchQuery = encodeURIComponent(`is:issue ${title}`);
  const issueLink = newGitHubIssueUrl({
    title,
    body: `
<!-- Please make sure you have fulfilled the following items before submitting -->
<!-- Checked checkbox should look like this: [x] -->
- [ ] I have [searched for similar issues](${process.env.SOURCE_CODE_REPO}/issues?q=${searchQuery}) in this repository and believe that this is not a duplicate.

## Steps to reproduce
1. Visit ${typeof window !== 'undefined' ? window.location.href : '*Unknown*'}
2. ??
3. demo *${name}* crashes

## Your environment
| Tech         | Version |
|--------------|---------|
| Version      | v${process.env.LIB_VERSION}  |
| Netlify deploy | ${process.env.NETLIFY_DEPLOY_URL} |
| Browser      | ${typeof window !== 'undefined' && window.navigator ? window.navigator.userAgent : '*Unknown*'} |
`,
  });

  return (
    <div>
      <Typography color="error" component="p" variant="h5" gutterBottom>
        This demo had a runtime error!
      </Typography>
      <Typography>
        {'We would appreciate it if you '}
        <Link href={issueLink} target="_blank">
          report this error
        </Link>
        {
          ' directly in our issue tracker with the steps you took to trigger it. The "report this error" link prefills the issue description with valuable information.'
        }
      </Typography>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.toString()}</pre>
      {onReset ? (
        <Button onClick={onReset} variant="text">
          {t('resetDemo')}
        </Button>
      ) : null}
    </div>
  );
}

export class DemoErrorBoundary extends React.Component<
  DemoErrorBoundaryProps,
  DemoErrorBoundaryState
> {
  state: DemoErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): DemoErrorBoundaryState {
    return { error };
  }

  render() {
    const { children, name, onReset } = this.props;
    const { error } = this.state;
    if (error) {
      return <DemoErrorFallback error={error} name={name} onReset={onReset} />;
    }
    return children;
  }
}
