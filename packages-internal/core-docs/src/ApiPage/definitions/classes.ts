import type { PropsTranslations, ComponentApiContent } from '@mui/internal-api-docs-builder';
import { kebabCase } from 'es-toolkit/string';
import type { ClassDefinition, BaseCssTOCParams } from './types';
import type { TocItem } from '../types';

export const getClassesToc = ({
  classes,
  t,
  hash,
  componentName,
}: BaseCssTOCParams & {
  classes: ClassDefinition[];
  componentName?: string;
}): TocItem[] =>
  !classes || classes.length === 0
    ? []
    : [
        {
          text: t('api-docs.classes'),
          hash: hash ?? 'classes',
          children: [
            ...classes.map(({ key, hash: classHash }) => ({
              text: key,
              hash: componentName ? `${kebabCase(componentName)}-classes-${key}` : classHash,
              children: [],
            })),
          ],
        },
      ];

export interface GetClassApiDefinitionsParams {
  componentClasses: ComponentApiContent['classes'];
  classDescriptions: PropsTranslations['classDescriptions'];
  componentName: string;
}

const errorMessage = (componentName: string, className: string, slotName: string): string =>
  `${className} description from component ${componentName} should include ${slotName} since its definition includes "{{${slotName}}}"`;

export function getClassApiDefinitions(params: GetClassApiDefinitionsParams): ClassDefinition[] {
  const { componentClasses, classDescriptions, componentName } = params;

  return componentClasses.map((classDefinition) => {
    const {
      conditions,
      nodeName,
      deprecationInfo,
      description: translatedDescription,
    } = classDescriptions[classDefinition.key] ?? {}; // Not all classes have a description.

    let description = translatedDescription ?? classDefinition.description;

    if (description.includes('{{conditions}}')) {
      if (!conditions) {
        throw new Error(errorMessage(componentName, classDefinition.className, 'conditions'));
      }
      description = description.replace(/{{conditions}}/, conditions);
    }

    if (description.includes('{{nodeName}}')) {
      if (!nodeName) {
        throw new Error(errorMessage(componentName, classDefinition.className, 'nodeName'));
      }
      description = description.replace(/{{nodeName}}/, nodeName);
    }

    return {
      ...classDefinition,
      description,
      deprecationInfo,
      hash: `${kebabCase(componentName)}-classes-${classDefinition.className}`,
    };
  });
}
