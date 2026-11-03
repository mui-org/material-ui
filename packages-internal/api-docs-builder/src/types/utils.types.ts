export type SeeMore = { description: string; link: { text: string; url: string } };

export interface Slot {
  class: string | null;
  name: string;
  description: string;
  default?: string;
}

export interface ApiItemDescription {
  name: string;
  description: string;
}

export type ComponentInfo = {
  /**
   * Full path to the source file.
   */
  filename: string;
  /**
   * Component name as imported in the docs, in the global MUI namespace.
   */
  name: string;
  /**
   * Component name with `Mui` prefix, in the global HTML page namespace.
   */
  muiName: string;
  /**
   * The name of the slots interface. By default we consider `${componentName}Slots`.
   */
  slotInterfaceName?: string;
  apiPathname: string;
  readFile: () => {
    src: string;
    spread: boolean;
    shouldSkip: boolean;
    EOL: string;
    inheritedComponent?: string;
  };
  getInheritance: (inheritedComponent?: string) => null | {
    /**
     * Component name
     */
    name: string;
    /**
     * API pathname
     */
    apiPathname: string;
  };
  getDemos: () => Array<{ demoPageTitle: string; demoPathname: string; filePath: string }>;
  apiPagesDirectory: string;
  /**
   * The path to import specific layout config of the page if needed.
   */
  layoutConfigPath?: string;
  skipApiGeneration?: boolean;
  /**
   * If `true`, the component's name match one of the MUI System components.
   */
  isSystemComponent?: boolean;
  /**
   * If provided, this annotation will be used instead of the auto-generated demo & API links
   */
  customAnnotation?: string;
};

export type HookInfo = {
  /**
   * Full path to the source file.
   */
  filename: string;
  /**
   * Hook name as imported in the docs, in the global MUI namespace.
   */
  name: string;
  apiPathname: string;
  readFile: ComponentInfo['readFile'];
  getDemos: ComponentInfo['getDemos'];
  apiPagesDirectory: string;
  skipApiGeneration?: boolean;
  /**
   * If provided, this annotation will be used instead of the auto-generated demo & API links
   */
  customAnnotation?: string;
};
