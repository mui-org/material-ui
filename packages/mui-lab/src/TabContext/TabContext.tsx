'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

export interface TabContextValue {
  idPrefix: string;
  value: string;
}

export interface TabContextProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The value of the currently selected `Tab`.
   */
  value: string | number;
}

const Context = React.createContext<TabContextValue | null>(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix() {
  const [id, setId] = React.useState<string | null>(null);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setId(`mui-p-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [TabContext API](https://mui.com/material-ui/api/tab-context/)
 */
export default function TabContext(props: TabContextProps): React.JSX.Element {
  const { children, value } = props;
  const idPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    return { idPrefix, value } as TabContextValue;
  }, [idPrefix, value]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

TabContext.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The value of the currently selected `Tab`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
} as any;

export function useTabContext(): TabContextValue | null {
  return React.useContext(Context);
}

export function getPanelId(context: TabContextValue, value: string): string {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null as any;
  }
  return `${context.idPrefix}-P-${value}`;
}
/**
 *
 * Demos:
 *
 * - [Tabs](https://next.mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [TabContext API](https://next.mui.com/material-ui/api/tab-context/)
 */
export function getTabId(context: TabContextValue, value: string): string {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null as any;
  }
  return `${context.idPrefix}-T-${value}`;
}
