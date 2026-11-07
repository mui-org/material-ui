// Compare production ESM builds with the same installed dependencies.
// pnpm exec node test/bundle-size/menu2.mjs [path-to-material-build]
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync, constants } from 'node:zlib';
import { build, normalizePath, version as viteVersion } from 'vite';

const root = path.resolve(import.meta.dirname, '../..');
// eslint-disable-next-line mui/consistent-production-guard -- The bundler must use production package exports.
process.env.NODE_ENV = 'production';
// Vite module IDs use forward slashes on every platform.
const workspaceBuild = normalizePath(
  await realpath(path.join(root, 'packages/mui-material/build')),
);
const materialBuild = normalizePath(
  await realpath(path.resolve(process.argv[2] ?? workspaceBuild)),
);
const materialPackage = JSON.parse(
  await readFile(path.join(materialBuild, 'package.json'), 'utf8'),
);
// Keep framework and styling peers out, as in the package size checker.
const externals = ['react', 'react-dom', '@emotion/react', '@emotion/styled'];
const hasMenu2 = './Unstable_Menu2' in materialPackage.exports;
const classic = ['Button', 'Menu', 'MenuItem'];
const menu2 = [
  'Button',
  'Unstable_Menu2',
  'Unstable_Menu2Trigger',
  'Unstable_Menu2Popup',
  'Unstable_Menu2Item',
];
const submenu = [
  ...menu2,
  'Unstable_Menu2Submenu',
  'Unstable_Menu2SubmenuTrigger',
  'Unstable_Menu2SubmenuPopup',
];
const cases = [
  { name: 'button', parts: ['Button'] },
  { name: 'button-barrel', parts: ['Button'], barrel: true },
  { name: 'classic-menu', parts: classic },
  { name: 'classic-menu-barrel', parts: classic, barrel: true },
  { name: 'classic-menu-high-contrast', parts: classic, highContrast: true },
  ...(hasMenu2
    ? [
        { name: 'menu2', parts: menu2 },
        { name: 'menu2-submenu', parts: submenu },
        { name: 'classic-and-menu2', parts: [...new Set([...classic, ...menu2])] },
        { name: 'classic-and-menu2-submenu', parts: [...new Set([...classic, ...submenu])] },
      ]
    : []),
];

const results = {};
for (const { name, parts, barrel, highContrast } of cases) {
  const entry = '\0menu2-bundle-entry';
  const componentImports = barrel
    ? `import { ${parts.join(', ')} } from '@mui/material';`
    : parts.map((part) => `import ${part} from '@mui/material/${part}';`).join('\n');
  const code = [
    componentImports,
    highContrast && "import { enhanceHighContrast } from '@mui/material/styles';",
  ]
    .filter(Boolean)
    .join('\n');
  const liveImports = [...parts, ...(highContrast ? ['enhanceHighContrast'] : [])];
  // eslint-disable-next-line no-await-in-loop -- Build one scenario at a time to limit memory use.
  const output = await build({
    configFile: false,
    root,
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    build: {
      write: false,
      target: 'esnext',
      minify: true,
      modulePreload: false,
      reportCompressedSize: false,
      rollupOptions: {
        input: entry,
        external: (id) => externals.some((peer) => id === peer || id.startsWith(`${peer}/`)),
      },
    },
    plugins: [
      {
        name: 'menu2-bundle-entry',
        enforce: 'pre',
        resolveId(id, importer) {
          if (id === entry) {
            return entry;
          }
          if (id === '@mui/material' || id.startsWith('@mui/material/')) {
            const subpath = id === '@mui/material' ? '.' : `.${id.slice('@mui/material'.length)}`;
            const exported = materialPackage.exports[subpath];
            const condition = exported?.import ?? exported?.default;
            const target = typeof condition === 'string' ? condition : condition?.default;
            if (!target) {
              throw new Error(`No built ESM export for ${id}`);
            }
            // Use normal resolution to preserve sideEffects and browser metadata.
            return this.resolve(path.resolve(materialBuild, target), importer, { skipSelf: true });
          }
          return null;
        },
        load(id) {
          // Keep every selected component and helper live, as in the package size checker.
          return id === entry ? `${code}\nconsole.log(${liveImports.join(', ')});` : null;
        },
      },
    ],
  });
  if (Array.isArray(output)) {
    throw new Error('Expected one build output');
  }
  const chunks = output.output.filter((chunk) => chunk.type === 'chunk');
  const renderedModules = chunks.flatMap((chunk) =>
    Object.entries(chunk.modules)
      .filter(([, module]) => module.renderedLength > 0)
      .map(([id]) => id),
  );
  const baseModules = renderedModules.filter((id) => /\/(?:@base-ui|@floating-ui)\//.test(id));
  const materialModules = renderedModules.filter((id) => id.startsWith(`${materialBuild}/`));
  if (
    materialModules.length === 0 ||
    (materialBuild !== workspaceBuild &&
      renderedModules.some((id) => id.startsWith(`${workspaceBuild}/`)))
  ) {
    throw new Error(`Expected all Material modules to come from ${materialBuild}`);
  }
  const unexpectedSources = renderedModules.filter((id) => /\/packages\/mui-[^/]+\/src\//.test(id));
  if (unexpectedSources.length > 0) {
    throw new Error(`Expected built packages, found source files: ${unexpectedSources.join(', ')}`);
  }
  const expectsBase = name.includes('menu2');
  if (expectsBase !== baseModules.length > 0) {
    throw new Error(`Unexpected Base UI module graph for ${name}`);
  }
  results[name] = {
    parsed: chunks.reduce((sum, chunk) => sum + Buffer.byteLength(chunk.code), 0),
    gzip: chunks.reduce(
      (sum, chunk) => sum + gzipSync(chunk.code, { level: constants.Z_BEST_COMPRESSION }).length,
      0,
    ),
    chunks: chunks.length,
    renderedModules: renderedModules.length,
    materialModules,
    baseModules,
  };
}

process.stdout.write(
  `${JSON.stringify({ materialBuild, viteVersion, externals, results }, null, 2)}\n`,
);
