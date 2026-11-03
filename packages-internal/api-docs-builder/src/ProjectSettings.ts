import type { CreateTypeScriptProjectOptions } from './utils/createTypeScriptProject';
import type { CreateDescribeablePropSettings } from './utils/createDescribeableProp';
import type {
  ComponentClassDefinition,
  ComponentReactApi,
  HookReactApi,
} from './types/ApiBuilder.types';
import type { Slot, ComponentInfo, HookInfo } from './types/utils.types';

export type SortingStrategiesType = {
  /**
   * Sort slots items. Setting it to `null` keeps the order defined in the source code.
   * @default alphabetical order.
   */
  classesSort?: null | ((a: ComponentClassDefinition, b: ComponentClassDefinition) => number);
  /**
   * Sort slots items. Setting null result in no sorting (respect the order provided by TS).
   * @default required props first and alphabetical order otherwise.
   */
  slotsSort?: null | ((a: Slot, b: Slot) => number);
};

export interface ProjectSettings {
  output: {
    /**
     * The output path of `pagesApi` generated from `input.pageDirectory`
     */
    apiManifestPath: string;
    /**
     * Determine if the API manifest file is created.
     * @default true
     */
    writeApiManifest?: boolean;
  };
  /**
   * Component directories to be used to generate API
   */
  typeScriptProjects: CreateTypeScriptProjectOptions[];
  getApiPages: () => Array<{ pathname: string }>;
  getComponentInfo: (filename: string) => ComponentInfo;
  getHookInfo?: (filename: string) => HookInfo;
  /**
   * Allows to force sorting strategies for listed properties.
   */
  sortingStrategies?: SortingStrategiesType;
  /**
   * Callback function to be called when the API generation is completed
   */
  onCompleted?: () => void | Promise<void>;
  /**
   * Callback to customize the manifest file before it's written to the disk
   */
  onWritingManifestFile?: (
    builds: PromiseSettledResult<ComponentReactApi | HookReactApi | null | never[]>[],
    source: string,
  ) => string;
  /**
   * Languages to which the API docs will be generated
   */
  translationLanguages: string[];
  /**
   * Function called to determine whether to skip the generation of a particular component's API docs
   */
  skipComponent: (filename: string) => boolean;
  /**
   * Function called to determine whether to skip the generation of a particular hook's API docs
   */
  skipHook?: (filename: string) => boolean;
  /**
   * Determine is the component definition should be updated.
   */
  skipAnnotatingComponentDefinition?: boolean | ((filename: string) => boolean);
  /**
   * If `true`, skips extracting CSS class and slot information from the component.
   */
  skipSlotsAndClasses?: boolean;
  /**
   * The path to the translation directory.
   */
  translationPagesDirectory: string;
  /**
   * The path to import the translation directory.
   * @default the `translationPagesDirectory` value
   */
  importTranslationPagesDirectory?: string;
  /**
   * Returns an array of import commands used for the component API page header.
   */
  getComponentImports?: (name: string, filename: string) => string[];
  /**
   * Returns an array of import commands used for the hook API page header.
   */
  getHookImports?: (name: string, filename: string) => string[];
  /**
   * Settings to configure props definition tests.
   */
  propsSettings?: CreateDescribeablePropSettings;
  /**
   * If `true`, the script does not generate JS page file.
   * Once we have the API tabs in all projects, we can make this `true` by default.
   * @default false
   */
  generateJsonFileOnly?: boolean;
  /**
   * Function called to generate the class name for a component (or its slot)
   */
  generateClassName: (componentName: string, slotOrState: string) => string;
  /**
   * Determines if a given slot or state is a global state
   */
  isGlobalClassName: (slotOrState: string) => boolean;
  /**
   * Determines the base API URL for generated JSDocs
   */
  baseApiUrl?: string;
  /**
   * The path to the `pages.ts` manifest file for public markdown generation.
   */
  pagesManifestPath?: string;
  /**
   * Determines the non-component folders for ordering in the llms.txt file.
   * The folders are relative to the `docs/data` directory.
   */
  nonComponentFolders?: string[];
}
