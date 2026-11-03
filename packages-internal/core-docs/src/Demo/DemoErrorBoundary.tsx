import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

/**
 * Based on https://github.com/sindresorhus/new-github-issue-url/blob/061fa0ddb7d51f3b96d3a0f6a6bebb196f105a7b/index.js
 * with node 8 + IE 11 support i.e. not using URL (URLSearchParams.set replaced with Map.set)
 */
function newGitHubIssueUrl(options: Record<string, string>): string {
  const url = `${process.env.SOURCE_CODE_REPO}/issues/new`;

  const query = Object.keys(options)
    .map((type) => {
      const value = options[type];
      return `${type}=${encodeURIComponent(String(value))}`;
    })
    .join('&');

  return `${url}?${query}`;
}

export interface DemoErrorBoundaryProps {
  children: React.ReactNode;
  name: string;
  onResetDemoClick: () => void;
  /**
   * translate function from redux store
   */
  t: (key: string) => string;
}

interface DemoErrorBoundaryState {
  error: Error | null;
}

export class DemoErrorBoundary extends React.Component<
  DemoErrorBoundaryProps,
  DemoErrorBoundaryState
> {
  state: DemoErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): DemoErrorBoundaryState {
    return { error };
  }

  render() {
    const { children, name, onResetDemoClick, t } = this.props;
    const { error } = this.state;

    if (error) {
      const title = `[docs] Demo ${name} crashes`;
      const searchQuery = encodeURIComponent(`is:issue ${title}`);
      const issueLink = newGitHubIssueUrl({
        title,
        body: `
<!-- Please make sure you have fulfilled the following items before submitting -->
<!-- Checked checkbox should look like this: [x] -->
- [ ] I have [searched for similar issues](${
          process.env.SOURCE_CODE_REPO
        }/issues?q=${searchQuery}) in this repository and believe that this is not a duplicate.

## Steps to reproduce
1. Visit ${window.location.href}
2. ??
3. demo *${name}* crashes

## Your environment
| Tech         | Version |
|--------------|---------|
| Version  | v${process.env.LIB_VERSION}  |
| Netlify deploy | ${process.env.NETLIFY_DEPLOY_URL} |
| Browser      | ${
          typeof window !== 'undefined' && window.navigator
            ? window.navigator.userAgent
            : '*Unknown*'
        } |
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
            {` directly in our issue tracker with the steps you took to trigger it.
The "report this error" link prefills the issue description with valuable information.`}
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error.toString()}</pre>
          <Button onClick={onResetDemoClick} variant="text">
            {t('resetDemo')}
          </Button>
        </div>
      );
    }

    return children;
  }
}
