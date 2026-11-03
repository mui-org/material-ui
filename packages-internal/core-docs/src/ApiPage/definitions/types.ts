import type { Translate } from '../../i18n';

export type ClassDefinition = {
  className: string;
  key: string;
  hash: string;
  description?: string;
  isGlobal?: boolean;
  isDeprecated?: boolean;
  deprecationInfo?: string;
};

export type PropertyDefinition = {
  additionalInfo?: string[];
  hash: string;
  deprecationInfo?: string;
  description?: string;
  isDeprecated?: boolean;
  isOptional?: boolean;
  isRequired?: boolean;
  propDefault?: string;
  propName: string;
  requiresRef?: boolean;
  seeMoreDescription?: string;
  signature?: string;
  signatureArgs?: {
    argName: string;
    argDescription?: string;
    argType?: string;
    argTypeDescription?: string;
  }[];
  signatureReturnDescription?: string;
  typeName: string;
  /**
   * Used by MUI X interface documentation
   */
  isProPlan?: boolean;
  /**
   * Used by MUI X interface documentation
   */
  isPremiumPlan?: boolean;
};

export type SlotDefinition = {
  className: string | null;
  hash: string;
  description?: string;
  name: string;
  defaultValue?: string;
};

export type BaseCssTOCParams = {
  inheritance?: boolean;
  themeDefaultProps?: boolean;
  t: Translate;
  hash?: string;
};
