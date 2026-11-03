import type {
  PropsTableItem,
  PropsTranslations,
  HookApiContent,
  HooksTranslations,
} from '@mui/internal-api-docs-builder';
import { kebabCase } from 'es-toolkit/string';
import type { BaseCssTOCParams, PropertyDefinition } from './types';
import type { TocItem } from '../types';

type GetPropertiesTocParams = BaseCssTOCParams &
  (
    | {
        properties: Array<Pick<PropertyDefinition, 'propName' | 'hash'>>;
        componentProps?: never;
        componentName?: never;
      }
    | { componentProps: Record<string, unknown>; componentName: string; properties?: never }
  );

export const getPropertiesToc = ({
  properties,
  componentProps,
  componentName,
  inheritance,
  themeDefaultProps,
  t,
  hash,
}: GetPropertiesTocParams): TocItem => {
  const resolvedProperties =
    properties ??
    Object.keys(componentProps).map((propName) => ({
      propName,
      hash: `${kebabCase(componentName)}-prop-${propName}`,
    }));

  return {
    text: t('api-docs.props'),
    hash: hash ?? '',
    children: [
      ...resolvedProperties.map(({ propName, hash: propertyHash }) => ({
        text: propName,
        hash: propertyHash,
        children: [],
      })),
      ...(inheritance
        ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
        : []),
      ...(themeDefaultProps
        ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
        : []),
    ],
  };
};

interface GetPropsApiDefinitionsParams {
  componentName: string;
  properties: {
    [name: string]: PropsTableItem & {
      /**
       * Only to be compatible the time of the migration for X
       */
      isProPlan?: boolean;
      /**
       * Only to be compatible the time of the migration for X
       */
      isPremiumPlan?: boolean;
    };
  };
  propertiesDescriptions: PropsTranslations['propDescriptions'];
  /**
   * Add indicators that the properties is optional instead of showing it is required.
   */
  showOptionalAbbr?: boolean;
}

export function getPropsApiDefinitions(params: GetPropsApiDefinitionsParams): PropertyDefinition[] {
  const { properties, propertiesDescriptions, componentName, showOptionalAbbr = false } = params;

  return Object.entries(properties).map(([propName, propData]) => {
    const isRequired = propData.required && !showOptionalAbbr;
    const isOptional = !propData.required && showOptionalAbbr;

    const isDeprecated = propData.deprecated;
    const deprecationInfo = propData.deprecationInfo;

    const typeName = propData.type?.description || propData.type.name;
    const propDefault = propData.default;
    const propDescription = propertiesDescriptions[propName];

    const additionalInfo = (
      ['cssApi', 'sx', 'slotsApi', 'joy-size', 'joy-color', 'joy-variant'] as const
    ).filter((key) => propData.additionalInfo?.[key]);

    const seeMoreDescription =
      propDescription?.seeMoreText &&
      propData.seeMoreLink &&
      propDescription.seeMoreText.replace(
        '{{link}}',
        `<a href="${propData.seeMoreLink.url}">${propData.seeMoreLink.text}</a>`,
      );

    const signature = propData.signature?.type;
    const signatureArgs = propData.signature?.describedArgs?.map((argName) => ({
      argName,
      argDescription: propertiesDescriptions[propName].typeDescriptions?.[argName].description,
      argType: propertiesDescriptions[propName].typeDescriptions?.[argName]?.argType,
      argTypeDescription:
        propertiesDescriptions[propName].typeDescriptions?.[argName]?.argTypeDescription,
    }));
    const signatureReturnDescription =
      propData.signature?.returned &&
      propertiesDescriptions[propName].typeDescriptions?.[propData.signature.returned]
        .argTypeDescription;

    return {
      hash: `${kebabCase(componentName)}-prop-${propName}`,
      propName,
      seeMoreDescription,
      description: propDescription?.description,
      requiresRef: propDescription?.requiresRef,
      isOptional,
      isRequired,
      isDeprecated,
      deprecationInfo,
      typeName,
      propDefault,
      additionalInfo,
      signature,
      signatureArgs,
      signatureReturnDescription,
      isProPlan: propData.isProPlan,
      isPremiumPlan: propData.isPremiumPlan,
    };
  });
}

interface HookCommonApiParams {
  hookName: string;
  showOptionalAbbr?: boolean;
}

interface GetHookReturnApiDefinitionsParams extends HookCommonApiParams {
  kind: 'return';
  properties: HookApiContent['returnValue'];
  translations: HooksTranslations['returnValueDescriptions'];
}

interface GetHookParametersApiDefinitions extends HookCommonApiParams {
  kind: 'parameters';
  properties: HookApiContent['parameters'];
  translations: HooksTranslations['parametersDescriptions'];
}

export function getHookApiDefinitions(
  params: GetHookReturnApiDefinitionsParams | GetHookParametersApiDefinitions,
): PropertyDefinition[] {
  const { properties, translations, hookName, kind, showOptionalAbbr } = params;

  return Object.entries(properties).map(([propName, propData]) => {
    const isRequired = propData.required && !showOptionalAbbr;
    const isOptional = !propData.required && showOptionalAbbr;

    const isDeprecated = propData.deprecated;
    const deprecationInfo = propData.deprecationInfo;

    const typeName = propData.type?.description || propData.type.name;
    const propDefault = propData.default;
    const propDescription = translations[propName];

    return {
      hash: `${kebabCase(hookName)}-${kind === 'parameters' ? 'parameters' : 'return-value'}-${propName}`,
      propName,
      description: propDescription?.description,
      isRequired,
      isOptional,
      isDeprecated,
      deprecationInfo,
      typeName,
      propDefault,
    };
  });
}
