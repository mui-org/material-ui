import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Octokit } from '@octokit/rest';
import {
  fetchCommitsBetweenRefs,
  findLatestTaggedVersion,
} from '@mui/internal-code-infra/changelog';
import { getRateLimitRetryTime } from '@mui/internal-code-infra/github';
import yargs from 'yargs';

/**
 * @TODO: Add it to @mui/internal-code-infra/changelog
 *
 * @param {string} login
 * @returns {boolean}
 */
function isBot(login) {
  return login.endsWith('[bot]') && !login.includes('copilot');
}

/**
 * @param {import('@mui/internal-code-infra/changelog').FetchedCommitDetails} commit
 * @returns {string | null}
 */
function getCommitAuthor(commit) {
  if (!commit.author) {
    return null;
  }

  if (commit.labels.includes('cherry-pick') && isBot(commit.author.login)) {
    const originalAuthorMatch = commit.prTitle.match(/\(@([\w-]+)\)$/);
    if (originalAuthorMatch) {
      return originalAuthorMatch[1];
    }
  }

  return commit.author.login;
}

/**
 * @param {string} commitMessage
 * @returns {string} The tags in lowercases, ordered ascending and comma separated
 */
function parseTags(commitMessage) {
  const tagMatch = commitMessage.match(/^(\[[\w-]+\])+/);
  if (tagMatch === null) {
    return '';
  }
  const [tagsWithBracketDelimiter] = tagMatch;
  return tagsWithBracketDelimiter
    .match(/([\w-]+)/g)
    .map((tag) => {
      return tag.toLocaleLowerCase();
    })
    .sort((a, b) => {
      return a.localeCompare(b);
    })
    .join(',');
}

// Match commit messages like:
// "[docs] Fix small typo on Grid2 page (#44062)"
const prLinkRegEx = /\(#[0-9]+\)$/;

/**
 *
 * @param {import('@mui/internal-code-infra/changelog').FetchedCommitDetails[]} commits
 * @returns {string[]}
 */
function getAllContributors(commits) {
  const authors = Array.from(new Set(commits.map(getCommitAuthor).filter((author) => !!author)));

  return authors.sort((a, b) => a.localeCompare(b)).map((author) => `@${author}`);
}

async function main(argv) {
  const { lastRelease: previousReleaseParam, release } = argv;

  const latestTaggedVersion = await findLatestTaggedVersion({
    cwd: process.cwd(),
    fetchAll: false,
  });
  const previousRelease =
    previousReleaseParam !== undefined ? previousReleaseParam : latestTaggedVersion;
  if (previousRelease !== latestTaggedVersion) {
    console.warn(
      `Creating changelog for ${previousRelease}..${release} while the latest tagged version is '${latestTaggedVersion}'.`,
    );
  }

  if (process.env.GITHUB_TOKEN) {
    console.warn(
      `Using GITHUB_TOKEN from environment variables have been deprecated. Please remove it if set locally.`,
    );
  }

  /** @type {string | undefined} */
  let currentPhase;
  /** @type {import('@mui/internal-code-infra/changelog').FetchedCommitDetails[]} */
  let fetchedCommits;
  try {
    fetchedCommits = await fetchCommitsBetweenRefs({
      lastRelease: previousRelease,
      release,
      repo: 'material-ui',
      octokit: process.env.GITHUB_TOKEN
        ? new Octokit({ auth: process.env.GITHUB_TOKEN })
        : undefined,
      onProgress: process.stderr.isTTY
        ? ({ phase, count, total }) => {
            if (currentPhase !== undefined && currentPhase !== phase) {
              process.stderr.write('\n');
            }
            currentPhase = phase;
            process.stderr.write(`\r${phase} ${count}/${total}`);
          }
        : undefined,
    });
  } finally {
    if (currentPhase !== undefined) {
      process.stderr.write('\n');
    }
  }
  const commitsItems = fetchedCommits.filter(
    (commit) =>
      (!commit.author || !isBot(commit.author.login) || commit.labels.includes('cherry-pick')) &&
      !commit.message.startsWith('[website]'),
  );

  const contributorHandles = getAllContributors(commitsItems);

  // We don't know when a particular commit was made from the API.
  // Only that the commits are ordered by date ASC
  const commitsItemsByOrder = new Map(commitsItems.map((item, index) => [item, index]));
  // Sort by tags ASC, date desc
  // Will only consider exact matches of tags so `[Slider]` will not be grouped with `[Slider][Modal]`
  commitsItems.sort((a, b) => {
    const aTags = parseTags(a.message);
    const bTags = parseTags(b.message);
    if (aTags === bTags) {
      return commitsItemsByOrder.get(b) - commitsItemsByOrder.get(a);
    }
    return aTags.localeCompare(bTags);
  });
  const changes = commitsItems.map((commitsItem) => {
    let shortMessage = commitsItem.message.split('\n')[0];
    const isCherryPickByBot =
      commitsItem.labels.includes('cherry-pick') &&
      commitsItem.author &&
      isBot(commitsItem.author.login);

    if (isCherryPickByBot) {
      shortMessage = shortMessage.replace(/\s+\(@[\w-]+\)(?=\s+\(#[0-9]+\)$)/, '');
    }

    // If the commit message doesn't have an associated PR, add the commit sha for reference.
    if (!prLinkRegEx.test(shortMessage)) {
      shortMessage += ` (${commitsItem.sha.substring(0, 7)})`;
    }

    const author = getCommitAuthor(commitsItem);
    return `- ${shortMessage} ${author ? `@${author}` : "TODO INSERT AUTHOR'S USERNAME"}`;
  });
  const generationDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const releaseName = /** @type {string} */ (
    JSON.parse(await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8')).version
  );

  const changelog = `
## ${releaseName}

<!-- generated comparing ${previousRelease}..${release} -->

_${generationDate}_

A big thanks to the ${contributorHandles.length} contributors who made this release possible. Here are some highlights ✨:

TODO INSERT HIGHLIGHTS

${changes.join('\n')}

All contributors of this release in alphabetical order: ${contributorHandles.join(', ')}
`;

  // eslint-disable-next-line no-console -- output of this script
  console.log(changelog);
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    description: 'Creates a changelog',
    builder: (command) =>
      command
        .option('lastRelease', {
          describe:
            'The release to compare against e.g. `v5.0.0-alpha.23`. Default: The latest tag on the current branch.',
          type: 'string',
        })
        .option('release', {
          // #target-branch-reference
          default: 'master',
          describe: 'Ref which we want to release',
          type: 'string',
        }),
    handler: main,
  })
  .fail((message, error, cli) => {
    if (!error) {
      cli.showHelp();
      console.error(`\n${message}`);
    } else {
      const retryAt = getRateLimitRetryTime(error);
      if (retryAt) {
        const minutes = Math.ceil((retryAt.getTime() - Date.now()) / 60_000);
        console.error(
          `GitHub API rate limit exceeded. Try again after ${retryAt.toLocaleTimeString()} (in about ${minutes} minute${minutes === 1 ? '' : 's'}).`,
        );
      } else {
        console.error(error);
      }
    }
    process.exit(1);
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
