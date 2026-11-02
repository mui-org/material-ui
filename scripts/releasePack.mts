/* eslint-disable no-console */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { $ } from 'execa';
import * as path from 'path';
import * as fs from 'fs/promises';
import { availableParallelism } from 'node:os';
import { mapAsync } from 'es-toolkit/array';

interface WorkspaceDefinition {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

interface Manifest {
  packages: Record<string, string>;
}

interface RunOptions {
  packages?: string[];
  outDir: string;
  concurrency: number;
}

async function packWorkspace(workspace: WorkspaceDefinition, outDir: string): Promise<string> {
  const { stdout: zipFilePath } = await $({
    cwd: workspace.path,
  })`pnpm pack --pack-destination ${outDir}`;
  return zipFilePath;
}

async function run({ packages, outDir, concurrency }: RunOptions) {
  const allWorkspaces: WorkspaceDefinition[] = await $`pnpm -r ls --depth -1 --json`.then(
    (result) => JSON.parse(result.stdout),
  );
  const workspacesMap = new Map(allWorkspaces.map((workspace) => [workspace.name, workspace]));

  const publicPackages = allWorkspaces
    .filter((workspace) => !workspace.private)
    .map((workspace) => workspace.name);
  const packagesToPack = packages || publicPackages;

  const workspacesToPack = packagesToPack.map((name) => {
    const workspace = workspacesMap.get(name);
    if (!workspace) {
      throw new Error(`Workspace ${name} not found`);
    }
    return workspace;
  });

  const absoluteDestination = path.resolve(outDir);

  const packed = await mapAsync(
    workspacesToPack,
    async (workspace) => {
      console.log(`packing "${workspace.name}"`);
      const zipFilePath = await packWorkspace(workspace, absoluteDestination);
      const newName = path.join(absoluteDestination, `${workspace.name}.tgz`);
      await fs.mkdir(path.dirname(newName), { recursive: true });
      await fs.rename(zipFilePath, newName);
      console.log(`packed "${zipFilePath}"`);
      return [workspace.name, path.relative(absoluteDestination, newName)] as const;
    },
    { concurrency },
  );

  const manifest: Manifest = { packages: Object.fromEntries(packed) };

  await fs.writeFile(
    path.join(absoluteDestination, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  );
}

yargs(hideBin(process.argv))
  .command<RunOptions>(
    '$0',
    'Pack workspaces.',
    (command) => {
      return command
        .option('packages', {
          describe: 'Workspace Packages to pack, defaults to public packages',
          type: 'array',
          alias: 'p',
        })
        .option('outDir', {
          default: './packed',
          describe: 'Destination folder',
          type: 'string',
        })
        .option('concurrency', {
          default: availableParallelism(),
          describe: 'Number of concurrent packing processes',
          type: 'number',
        })
        .check(({ concurrency }) => {
          if (!Number.isInteger(concurrency) || concurrency < 1) {
            throw new Error(`--concurrency must be a positive integer, received ${concurrency}.`);
          }
          return true;
        });
    },
    run,
  )
  .help()
  .strict(true)
  .version(false)
  .parse();
