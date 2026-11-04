/* eslint-disable no-console */
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as readline from 'node:readline/promises';
import { execa } from 'execa';
import gitUrlParse from 'git-url-parse';
import { Octokit } from '@octokit/rest';
import yargs from 'yargs';
import { persistentAuthStrategy } from '@mui/internal-code-infra/github';

const OWNER = 'mui';
const REPO = 'material-ui';
const DOCS_REPO = 'material-ui-docs';
const NETLIFY_DEPLOYS_URL = 'https://app.netlify.com/projects/material-ui-docs/deploys';
const PR_NUMBER_PATTERN = /(\d+)\/?$/;
const SOURCE_BRANCH_PATTERN = /^(master|v\d+\.x)$/;
const DEPLOY_TARGET_PATTERN = /material-ui-docs\s+\S+:(\S+)/;
const REMOTE_NAME_FALLBACKS = { [REPO]: 'upstream', [DOCS_REPO]: DOCS_REPO };

function pointsAt(url, repo) {
  try {
    const parsed = gitUrlParse(url);
    return parsed.source === 'github.com' && parsed.owner === OWNER && parsed.name === repo;
  } catch {
    return false;
  }
}

async function ensureRemote(repo) {
  const { stdout } = await execa('git', ['config', '--get-regexp', '^remote\\..*\\.url$'], {
    reject: false,
  });
  const remotes = stdout
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [key, url] = line.split(' ', 2);
      return { name: key.slice('remote.'.length, -'.url'.length), url };
    });

  const found = remotes.find((remote) => pointsAt(remote.url, repo));
  if (found) {
    return found.name;
  }

  const name = REMOTE_NAME_FALLBACKS[repo];
  if (remotes.some((remote) => remote.name === name)) {
    throw new Error(`Remote "${name}" exists but does not point at ${OWNER}/${repo}`);
  }
  const url = `https://github.com/${OWNER}/${repo}.git`;
  console.log(`Adding remote ${name} -> ${url}`);
  await execa('git', ['remote', 'add', name, url]);
  return name;
}

async function deployTarget(ref) {
  try {
    const { stdout } = await execa('git', ['show', `${ref}:docs/package.json`]);
    const pkg = JSON.parse(stdout);
    return pkg.scripts?.deploy?.match(DEPLOY_TARGET_PATTERN)?.[1];
  } catch {
    return undefined;
  }
}

async function sourceBranchFor(upstream, target) {
  const { stdout } = await execa('git', [
    'for-each-ref',
    '--format=%(refname:short)',
    `refs/remotes/${upstream}/`,
  ]);
  const refs = stdout
    .split('\n')
    .filter((ref) => SOURCE_BRANCH_PATTERN.test(ref.slice(upstream.length + 1)));
  const targets = await Promise.all(refs.map(deployTarget));
  const matches = refs.filter((ref, index) => targets[index] === target);
  if (matches.length !== 1) {
    throw new Error(
      `Expected one branch deploying to "${target}", found: ${matches.join(', ') || 'none'}`,
    );
  }
  return matches[0].slice(upstream.length + 1);
}

async function readLines(rl) {
  console.log('Paste PR numbers or URLs, one per line. Empty line to finish.');
  const lines = [];

  while (true) {
    // eslint-disable-next-line no-await-in-loop -- prompts are sequential
    const line = (await rl.question('> ')).trim();
    if (!line) {
      return lines;
    }
    lines.push(line);
  }
}

function toPrNumber(line) {
  const match = line.match(PR_NUMBER_PATTERN);
  if (!match) {
    throw new Error(`Cannot parse PR from "${line}"`);
  }
  return match[1];
}

async function isOnBranch(sha, ref) {
  const { failed } = await execa('git', ['merge-base', '--is-ancestor', sha, ref], {
    reject: false,
  });
  return !failed;
}

async function mergeSha(octokit, pr, { sourceRef, sourceBranch, docsBranch }) {
  const { data } = await octokit.rest.pulls.get({
    owner: OWNER,
    repo: REPO,
    pull_number: Number(pr),
  });
  const { merged, merge_commit_sha: sha, merged_at: mergedAt, title, base } = data;
  if (!merged) {
    throw new Error(`PR #${pr} is not merged`);
  }
  if (base.ref !== sourceBranch) {
    throw new Error(`PR #${pr} targets ${base.ref}, ${docsBranch} is built from ${sourceBranch}`);
  }
  if (!(await isOnBranch(sha, sourceRef))) {
    throw new Error(`PR #${pr} commit ${sha.slice(0, 10)} is not in ${sourceRef}`);
  }
  return { pr, title, sha, mergedAt };
}

async function reportFailure({ error, worktree, docsRef, pending }) {
  const { stdout } = await execa('git', ['diff', '--name-only', '--diff-filter=U'], {
    cwd: worktree,
    reject: false,
  });
  const files = stdout.split('\n').filter(Boolean);
  const [failed] = pending;
  const list = pending.map((pick) => `${pick.sha} (#${pick.pr} ${pick.title})`).join('\n- ');

  console.error(`\nCherry-pick of ${failed.sha} (#${failed.pr}) onto ${docsRef} failed.`);
  console.error(`Conflicted files:\n${files.map((file) => `  ${file}`).join('\n') || '  none'}`);
  console.error(`\nGit output:\n${error.stderr || error.message}`);
  console.error(
    [
      '\nGive this to an agent:',
      '---',
      `Create a worktree with \`git worktree add --detach /tmp/docs-fix ${docsRef}\` and work in it.`,
      'Cherry-pick these commits in order:',
      `- ${list}`,
      `The first one conflicts in: ${files.join(', ') || 'unknown files'}.`,
      "Resolve keeping the docs branch's existing content and only adding what each commit changes.",
      'Run `git cherry-pick --continue` after each resolution.',
      'Do not push. Leave the worktree in place and report its path.',
      '---',
    ].join('\n'),
  );
}

async function applyPicks({ rl, picks, docsRef, docsRemote, docsBranch }) {
  await execa('git', ['fetch', docsRemote, docsBranch]);

  const worktree = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-deploy-'));
  await execa('git', ['worktree', 'add', '--detach', worktree, docsRef]);

  try {
    for (const [index, pick] of picks.entries()) {
      try {
        // eslint-disable-next-line no-await-in-loop -- picks apply in merge order
        await execa('git', ['cherry-pick', pick.sha], { cwd: worktree });
      } catch (error) {
        // eslint-disable-next-line no-await-in-loop -- worktree is removed right after
        await reportFailure({ error, worktree, docsRef, pending: picks.slice(index) });
        throw error;
      }
    }

    const { stdout: log } = await execa('git', ['log', '--oneline', `${docsRef}..HEAD`], {
      cwd: worktree,
    });
    console.log(`\n${log}`);
    const answer = (await rl.question(`\nPush to ${docsRemote} ${docsBranch}? [y/N] `)).trim();
    if (answer.toLowerCase() !== 'y') {
      console.log('Aborted');
      return;
    }

    await execa('git', ['push', docsRemote, `HEAD:${docsBranch}`], {
      cwd: worktree,
      stdio: 'inherit',
    });
    console.log(`Pushed. Monitor the deploy: ${NETLIFY_DEPLOYS_URL}`);
  } finally {
    await execa('git', ['worktree', 'remove', '--force', worktree]);
  }
}

async function deploy({ docsBranch }) {
  const upstream = await ensureRemote(REPO);
  const docsRemote = await ensureRemote(DOCS_REPO);
  await execa('git', ['fetch', upstream]);

  const sourceBranch = await sourceBranchFor(upstream, docsBranch);
  const context = {
    sourceBranch,
    sourceRef: `${upstream}/${sourceBranch}`,
    docsBranch,
    docsRef: `${docsRemote}/${docsBranch}`,
    docsRemote,
  };
  console.log(`Branch ${sourceBranch} deploys to ${context.docsRef}`);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const lines = await readLines(rl);
    if (lines.length === 0) {
      console.log('Nothing to deploy');
      return;
    }

    // A PR may have merged after the startup fetch
    await execa('git', ['fetch', upstream, sourceBranch]);

    const octokit = new Octokit({ authStrategy: persistentAuthStrategy });
    const picks = [];
    for (const line of lines) {
      // eslint-disable-next-line no-await-in-loop -- avoid concurrent API requests
      picks.push(await mergeSha(octokit, toPrNumber(line), context));
    }
    picks.sort((a, b) => Date.parse(a.mergedAt) - Date.parse(b.mergedAt));

    console.log(`\nWill cherry-pick onto ${context.docsRef}:`);
    picks.forEach((pick) => console.log(`  ${pick.sha.slice(0, 10)}  #${pick.pr}  ${pick.title}`));

    await applyPicks({ rl, picks, ...context });
  } finally {
    rl.close();
  }
}

yargs(process.argv.slice(2))
  .command({
    command: '$0 [docsBranch]',
    describe: 'Cherry-pick merged PRs onto a material-ui-docs branch',
    builder: (command) =>
      command.positional('docsBranch', {
        default: 'latest',
        describe: 'material-ui-docs branch to deploy to',
        type: 'string',
      }),
    handler: deploy,
  })
  .strict()
  .fail((message, error, cli) => {
    if (!error) {
      cli.showHelp();
      console.error(`\n${message}`);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  })
  .help()
  .parse();
