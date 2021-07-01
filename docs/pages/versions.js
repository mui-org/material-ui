import * as React from 'react';
import sortedUniqBy from 'lodash/sortedUniqBy';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  requireDemo,
} from '!@material-ui/markdown/loader!docs/src/pages/versions/versions.md';

export default function Page() {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

function formatVersion(version) {
  return version
    .replace('v', '')
    .split('.')
    .map((n) => +n + 1000)
    .join('.');
}

async function getBranches() {
  const githubAuthorizationToken = process.env.GITHUB_AUTH || '';

  const result = await fetch('https://api.github.com/repos/mui-org/material-ui-docs/branches', {
    headers: {
      Authorization: `Basic ${Buffer.from(githubAuthorizationToken).toString('base64')}`,
    },
  });
  const text = await result.text();

  if (result.status !== 200) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

Page.getInitialProps = async () => {
  const FILTERED_BRANCHES = ['latest', 'l10n', 'next'];

  const branches = await getBranches();
  let versions = branches.map((branch) => branch.name);
  versions = versions.filter((value) => FILTERED_BRANCHES.indexOf(value) === -1);
  versions = versions.map((version) => ({
    version,
    // Replace dot with dashes for Netlify branch subdomains
    url: `https://${version.replace(/\./g, '-')}.material-ui.com`,
  }));
  // Current version.
  versions.push({
    version: `v${process.env.LIB_VERSION}`,
    url: 'https://material-ui.com',
  });
  // Legacy documentation.
  versions.push({
    version: 'v0',
    url: 'https://v0.material-ui.com',
  });
  versions = versions.sort((a, b) =>
    formatVersion(b.version).localeCompare(formatVersion(a.version)),
  );

  if (
    branches.find((branch) => branch.name === 'next') &&
    !versions.find((version) => /beta|alpha/.test(version.version))
  ) {
    versions.unshift({
      version: `v${Number(versions[0].version[1]) + 1} pre-release`,
      url: 'https://next.material-ui.com',
    });
  }

  versions = sortedUniqBy(versions, 'version');

  return { versions };
};
