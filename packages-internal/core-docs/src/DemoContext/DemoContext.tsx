import * as React from 'react';
import type { MuiProductId } from '../utils/getProductInfoFromUrl';

export type CodeVariant = 'TS' | 'JS';

type RelativeModule = {
  module: string;
  raw: string;
};

export interface DemoData {
  title: string;
  language: string;
  raw: string;
  codeVariant: CodeVariant;
  githubLocation: string;
  productId?: Exclude<MuiProductId, 'null'>;
  relativeModules?: RelativeModule[];
}

export interface SandboxConfig {
  /**
   * Generates the root index.js/tsx content for CodeSandbox/StackBlitz.
   * Receives codeVariant ('TS' | 'JS') for type assertion.
   */
  getRootIndex?: (codeVariant: CodeVariant) => string;

  /**
   * Primary npm package for this product, used in sandbox generation.
   * e.g., "@mui/material", "@mui/joy", "@mui/x-data-grid"
   */
  primaryPackage: string;

  /**
   * Default dependency to add when generating sandbox (e.g., '@mui/material' for StyledEngineProvider)
   * Used when the root index template requires a specific package.
   */
  fallbackDependency?: { name: string; version: string };

  /**
   * Hook to add extra peer dependencies to sandbox.
   */
  includePeerDependencies?: (
    deps: Record<string, string>,
    options: { versions: Record<string, string> },
  ) => Record<string, string>;

  /**
   * Hook to override default package versions.
   */
  getVersions?: (
    versions: Record<string, string>,
    options: { muiCommitRef?: string },
  ) => Record<string, string>;

  /**
   * Hook to resolve custom imports to dependencies.
   */
  postProcessImport?: (importName: string) => Record<string, string> | null;
}

export interface IframeWrapperProps {
  /**
   * The demo content (already cloned with `window` prop by FramedDemo).
   * The wrapper should just render {children} - no cloning needed.
   */
  children: React.ReactElement;
  /** The iframe's document, for setting attributes or observing color scheme */
  document: Document;
  /** If true, the demo is isolated and should not inject theme CSS variables */
  isolated?: boolean;
}

export interface DemoContextValue {
  /**
   * Display name shown in demo titles, e.g., "Material UI", "Joy UI", "MUI X"
   */
  productDisplayName: string;

  /**
   * Optional wrapper component for iframe demo content.
   * Responsible for:
   * - Creating and injecting CSS theme variables (via GlobalStyles)
   * - Any product-specific observers (e.g., JoyIframeObserver)
   *
   * If not provided, defaults to MaterialIframeWrapper (creates Material theme).
   * Pass `null` explicitly to disable iframe wrapping entirely.
   */
  IframeWrapper?: React.ComponentType<IframeWrapperProps> | null;

  /**
   * Configuration for CodeSandbox/StackBlitz sandbox generation.
   */
  csb: SandboxConfig;

  /**
   * Page/site-wide killswitch for the inline Carbon ad rendered inside demos.
   * Per-demo `disableAd` may also be set via the demo options.
   */
  disableAd?: boolean;
}

const DemoContext = React.createContext<DemoContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  DemoContext.displayName = 'DemoContext';
}

export function useDemoContext(): DemoContextValue {
  const context = React.useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoContext must be used within a DemoContext.Provider');
  }
  return context;
}

export default DemoContext;
