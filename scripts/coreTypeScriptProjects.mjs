import path from 'path';

export default {
  material: {
    rootPath: path.join(process.cwd(), 'packages/mui-material'),
    entryPointPath: 'src/index.d.ts',
  },
  lab: {
    rootPath: path.join(process.cwd(), 'packages/mui-lab'),
    entryPointPath: 'src/index.ts',
  },
  system: {
    rootPath: path.join(process.cwd(), 'packages/mui-system'),
    entryPointPath: 'src/index.ts',
  },
  docs: {
    rootPath: path.join(process.cwd(), 'docs'),
    tsConfigPath: 'tsconfig.json',
  },
};
