import type { DeploySucceededEvent } from '@netlify/functions';

const DEPLOY_PREVIEW_CONTEXT = 'deploy-preview';

// Uses `permalinkUrl` which is per-deploy and hostnamed `deploy-preview-<n>--<site>`
// for PR previews (https://docs.netlify.com/deploy/deploy-overview/).
const PREVIEW_URL_PR_RE = /^deploy-preview-(\d+)--/;

function findPrNumber(deployURL: URL): string {
  const match = PREVIEW_URL_PR_RE.exec(deployURL.hostname);
  if (!match) {
    throw new Error(`Could not find a PR number in deploy URL: ${deployURL.href}`);
  }
  return match[1];
}

export default {
  async deploySucceeded(event: DeploySucceededEvent) {
    const { deploy } = event;

    if (deploy.context !== DEPLOY_PREVIEW_CONTEXT) {
      return;
    }

    let deployPermalinkUrl: URL;
    try {
      deployPermalinkUrl = new URL(deploy.permalinkUrl);
    } catch {
      throw new Error(`Invalid permalinkUrl: ${deploy.permalinkUrl}`);
    }
    if (deployPermalinkUrl.protocol !== 'https:') {
      throw new Error(`Expected an https permalinkUrl, got: ${deploy.permalinkUrl}`);
    }

    const prNumber = findPrNumber(deployPermalinkUrl);

    // eslint-disable-next-line no-console
    console.info(`PR:`, prNumber);
    // eslint-disable-next-line no-console
    console.info(`url:`, deployPermalinkUrl.href);

    // for more details > https://circleci.com/docs/2.0/api-developers-guide/#
    // Repo is hardcoded: this function is only ever notified about mui/material-ui deploys.
    // So no need to parse it from any field.
    await fetch(`https://circleci.com/api/v2/project/gh/mui/material-ui/pipeline`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // Token from https://app.netlify.com/projects/material-ui/configuration/env#content
        'Circle-Token': process.env.CIRCLE_CI_TOKEN!,
      },
      body: JSON.stringify({
        // For PR, /head is needed. https://support.circleci.com/hc/en-us/articles/360049841151
        branch: `pull/${prNumber}/head`,
        parameters: {
          // the parameters defined in .circleci/config.yml
          workflow: 'e2e-website', // name of the workflow
          'e2e-base-url': deployPermalinkUrl.href, // deploy preview url
        },
      }),
    });
  },
};
