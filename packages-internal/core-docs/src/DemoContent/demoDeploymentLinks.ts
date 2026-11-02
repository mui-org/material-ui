export interface DemoDeploymentLinks {
  pullRequest?: string;
  next: string;
  permalink: string;
  master: string;
}

interface DemoDeploymentEnvironment {
  deployEnv?: string;
  siteName?: string;
  siteDeployUrl?: string;
  pullRequestId?: string;
}

export function buildDemoDeploymentLinks(
  environment: DemoDeploymentEnvironment,
  currentRoute: string,
  anchor?: string,
): DemoDeploymentLinks | null {
  if (
    (environment.deployEnv !== 'staging' && environment.deployEnv !== 'pull-request') ||
    !environment.siteName ||
    !environment.siteDeployUrl
  ) {
    return null;
  }

  const route = currentRoute.split('#')[0].split('?')[0];
  const hash = anchor ? `#${anchor}` : '';
  const path = `${route}${hash}`;
  const { siteName } = environment;

  return {
    pullRequest:
      environment.pullRequestId && environment.deployEnv === 'pull-request'
        ? `https://deploy-preview-${environment.pullRequestId}--${siteName}.netlify.app${path}`
        : undefined,
    next: `https://next--${siteName}.netlify.app${path}`,
    permalink: `${environment.siteDeployUrl}${path}`,
    master: `https://master--${siteName}.netlify.app${path}`,
  };
}
