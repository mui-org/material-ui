import PropTypes from 'prop-types';
import SystemInitColorSchemeScript from '@mui/system/InitColorSchemeScript';

export const defaultConfig = {
  attribute: 'data-mui-color-scheme',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'mui-mode',
} as const;

export interface InitColorSchemeScriptProps {
  /**
   * The default mode when the storage is empty (user's first visit).
   * @default 'system'
   */
  defaultMode?: 'system' | 'light' | 'dark' | undefined;
  /**
   * The default color scheme to be used in light mode.
   * @default 'light'
   */
  defaultLightColorScheme?: string | undefined;
  /**
   * The default color scheme to be used in dark mode.
   * @default 'dark'
   */
  defaultDarkColorScheme?: string | undefined;
  /**
   * The node (provided as string) used to attach the color-scheme attribute.
   *
   * Requires a static value, do not derive from user input.
   * @default 'document.documentElement'
   */
  colorSchemeNode?: string | undefined;
  /**
   * localStorage key used to store `mode`.
   * @default 'mui-mode'
   */
  modeStorageKey?: string | undefined;
  /**
   * localStorage key used to store `colorScheme`.
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey?: string | undefined;
  /**
   * DOM attribute for applying a color scheme.
   * @default 'data-mui-color-scheme'
   * @example '.mode-%s' // for class based color scheme
   * @example '[data-mode-%s]' // for data-attribute without '='
   */
  attribute?: 'class' | 'data' | string | undefined;
  /**
   * Nonce string to pass to the inline script for CSP headers.
   */
  nonce?: string | undefined;
}
/**
 *
 * Demos:
 *
 * - [InitColorSchemeScript](https://next.mui.com/material-ui/react-init-color-scheme-script/)
 *
 * API:
 *
 * - [InitColorSchemeScript API](https://next.mui.com/material-ui/api/init-color-scheme-script/)
 */
function InitColorSchemeScript(props: InitColorSchemeScriptProps) {
  const {
    defaultMode = 'system',
    defaultLightColorScheme = defaultConfig.defaultLightColorScheme,
    defaultDarkColorScheme = defaultConfig.defaultDarkColorScheme,
    modeStorageKey = defaultConfig.modeStorageKey,
    colorSchemeStorageKey = defaultConfig.colorSchemeStorageKey,
    attribute: initialAttribute = defaultConfig.attribute,
    colorSchemeNode = 'document.documentElement',
    nonce,
  } = props;
  return (
    <SystemInitColorSchemeScript
      defaultMode={defaultMode}
      defaultLightColorScheme={defaultLightColorScheme}
      defaultDarkColorScheme={defaultDarkColorScheme}
      modeStorageKey={modeStorageKey}
      colorSchemeStorageKey={colorSchemeStorageKey}
      attribute={initialAttribute}
      colorSchemeNode={colorSchemeNode}
      nonce={nonce}
    />
  );
}

InitColorSchemeScript.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * DOM attribute for applying a color scheme.
   * @default 'data-mui-color-scheme'
   * @example '.mode-%s' // for class based color scheme
   * @example '[data-mode-%s]' // for data-attribute without '='
   */
  attribute: PropTypes.string,
  /**
   * The node (provided as string) used to attach the color-scheme attribute.
   *
   * Requires a static value, do not derive from user input.
   * @default 'document.documentElement'
   */
  colorSchemeNode: PropTypes.string,
  /**
   * localStorage key used to store `colorScheme`.
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey: PropTypes.string,
  /**
   * The default color scheme to be used in dark mode.
   * @default 'dark'
   */
  defaultDarkColorScheme: PropTypes.string,
  /**
   * The default color scheme to be used in light mode.
   * @default 'light'
   */
  defaultLightColorScheme: PropTypes.string,
  /**
   * The default mode when the storage is empty (user's first visit).
   * @default 'system'
   */
  defaultMode: PropTypes.oneOf(['dark', 'light', 'system']),
  /**
   * localStorage key used to store `mode`.
   * @default 'mui-mode'
   */
  modeStorageKey: PropTypes.string,
  /**
   * Nonce string to pass to the inline script for CSP headers.
   */
  nonce: PropTypes.string,
} as any;

export default InitColorSchemeScript;
