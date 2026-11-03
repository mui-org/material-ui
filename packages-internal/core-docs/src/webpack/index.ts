/**
 * Type declarations for webpack's require.context() API.
 *
 * Usage: import '@mui/internal-core-docs/webpack' in a .d.ts or at the top of a file,
 * or add to tsconfig "types".
 */

export interface WebpackRequireContext {
  (req: string): string;
  keys: () => string[];
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Require {
      context(
        directory: string,
        useSubdirectories?: boolean,
        regExp?: RegExp,
        mode?: string,
      ): WebpackRequireContext;
    }
  }
}
