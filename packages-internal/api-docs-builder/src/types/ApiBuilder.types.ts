import type { Documentation } from 'react-docgen';
import type { JSDocTagInfo } from '@typescript/typescript6';
import type { ComponentInfo, Slot, HookInfo, SeeMore, ApiItemDescription } from './utils.types';

export type AdditionalPropsInfo = {
  cssApi?: boolean;
  sx?: boolean;
  slotsApi?: boolean;
  'joy-size'?: boolean;
  'joy-color'?: boolean;
  'joy-variant'?: boolean;
};

/**
 * Common interface for both Component and Hook API builders.
 */
interface CommonReactApi extends Documentation {
  demos: ReturnType<HookInfo['getDemos']>;
  EOL: string;
  filename: string;
  apiPathname: string;
  description: string;
  /**
   * Different ways to import components
   */
  imports: string[];
  /**
   * result of path.readFileSync from the `filename` in utf-8
   */
  src: string;
  /**
   * The folder used to store the API translation.
   */
  apiDocsTranslationFolder?: string;
  deprecated: true | undefined;
  customAnnotation?: string;
}

export interface PropsTableItem {
  default: string | undefined;
  required: boolean | undefined;
  type: { name: string; description: string | undefined };
  deprecated: true | undefined;
  deprecationInfo: string | undefined;
  signature: undefined | { type: string; describedArgs?: string[]; returned?: string };
  additionalInfo?: AdditionalPropsInfo;
  seeMoreLink?: SeeMore['link'];
}

export interface PropsTranslations {
  componentDescription: string;
  deprecationInfo: string | undefined;
  propDescriptions: {
    [key: string]: PropDescription;
  };
  classDescriptions: {
    [key: string]: ClassDescription;
  };
  slotDescriptions?: { [key: string]: string };
  cssVariablesDescriptions?: { [key: string]: string };
  dataAttributesDescriptions?: { [key: string]: string };
}

export interface TypeDescription {
  name: string;
  description: string;
  argType?: string;
  argTypeDescription?: string;
}

export interface TypeDescriptions {
  [t: string]: TypeDescription;
}

interface PropDescription {
  description: string;
  requiresRef?: boolean;
  deprecated?: string;
  typeDescriptions?: { [t: string]: TypeDescription };
  seeMoreText?: string;
}

interface ClassDescription {
  description: string;
  conditions?: string;
  nodeName?: string;
  deprecationInfo?: string;
}

export interface ComponentReactApi extends CommonReactApi {
  forwardsRefTo: string | undefined;
  inheritance: ReturnType<ComponentInfo['getInheritance']>;
  /**
   * react component name
   * @example 'Accordion'
   */
  name: string;
  muiName: string;
  spread: boolean | undefined;
  /**
   * If `true`, the component supports theme default props customization.
   * If `null`, we couldn't infer this information.
   * If `undefined`, it's not applicable in this context, for example Base UI components.
   */
  themeDefaultProps: boolean | undefined | null;
  classes: ComponentClassDefinition[];
  slots: Slot[];
  cssVariables: { [key: string]: ApiItemDescription };
  dataAttributes: { [key: string]: ApiItemDescription };
  propsTable: { [key: string]: PropsTableItem };
  translations: PropsTranslations;
}

export interface ComponentApiContent {
  props: { [name: string]: PropsTableItem };
  name: string;
  imports: string[];
  slots?: Slot[];
  cssVariables?: { [key: string]: ApiItemDescription };
  dataAttributes?: { [key: string]: ApiItemDescription };
  classes: ComponentClassDefinition[];
  spread: boolean | undefined;
  themeDefaultProps: boolean | null | undefined;
  muiName: string;
  forwardsRefTo: string | undefined;
  filename: string;
  inheritance: null | { component: string; pathname: string };
  demos: string;
  deprecated: true | undefined;
}

export interface ParsedProperty {
  name: string;
  description: string;
  tags: { [tagName: string]: JSDocTagInfo };
  required: boolean;
  typeStr: string;
}

export interface HooksTranslations {
  hookDescription: string;
  deprecationInfo: string | undefined;
  parametersDescriptions: {
    [key: string]: {
      description: string;
      deprecated?: string;
    };
  };
  returnValueDescriptions: {
    [key: string]: {
      description: string;
      deprecated?: string;
    };
  };
}

export interface ComponentClassDefinition {
  key: string;
  className: string;
  description: string;
  isGlobal: boolean;
  isDeprecated?: boolean;
  deprecationInfo?: string;
}

interface AttributeDefinition {
  default: string | undefined;
  required: boolean | undefined;
  type: { name: string; description: string | undefined };
  deprecated: true | undefined;
  deprecationInfo: string | undefined;
}

export interface HookReactApi extends CommonReactApi {
  parameters?: ParsedProperty[];
  returnValue?: ParsedProperty[];
  /**
   * hook name
   * @example 'useButton'
   */
  name: string;
  parametersTable: { [key: string]: AttributeDefinition };
  returnValueTable: { [key: string]: AttributeDefinition };
  translations: HooksTranslations;
}

export interface HookApiContent {
  parameters: Record<string, AttributeDefinition>;
  returnValue: Record<string, AttributeDefinition>;
  name: string;
  filename: string;
  imports: string[];
  demos: string;
  deprecated: boolean | undefined;
}
