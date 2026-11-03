import * as ts from '@typescript/typescript6';
import type { ComponentClassDefinition } from '../types/ApiBuilder.types';
import { renderMarkdown } from '../buildApi';
import { getSymbolDescription, getSymbolJSDocTags } from '../buildApiUtils';
import type { TypeScriptProject } from './createTypeScriptProject';
import { getPropsFromComponentNode } from './getPropsFromComponentNode';
import { resolveExportSpecifier } from './resolveExportSpecifier';
import type { ProjectSettings } from '../ProjectSettings';
import type { Slot } from '../types/utils.types';

interface ClassInfo {
  description: string;
  isDeprecated?: true;
  deprecationInfo?: string;
}

/**
 * Gets the deprecation information for a given symbol.
 * @param symbol - The TypeScript symbol.
 * @returns An object containing the deprecation information, if the symbol is deprecated.
 */
function getClassDeprecationObject(symbol: ts.Symbol): {
  isDeprecated?: true;
  deprecationInfo?: string;
} {
  const tags = getSymbolJSDocTags(symbol);
  if (tags.deprecated) {
    return {
      isDeprecated: true,
      deprecationInfo: renderMarkdown(tags.deprecated.text?.[0].text || '').trim() || undefined,
    };
  }
  return {};
}

function getComponentDeclaration(
  project: TypeScriptProject,
  componentName: string,
): ts.Node | null {
  const unstableName = `Unstable_${componentName}`;
  const componentSymbol = project.exports[componentName] ?? project.exports[unstableName];

  if (!componentSymbol) {
    return null;
  }

  const localeSymbol = resolveExportSpecifier(componentSymbol, project);
  return localeSymbol.valueDeclaration ?? null;
}

interface ParseSlotsAndClassesParameters {
  typescriptProject: TypeScriptProject;
  projectSettings: ProjectSettings;
  componentName: string;
  muiName: string;
  slotInterfaceName?: string;
}

export default function parseSlotsAndClasses({
  typescriptProject,
  projectSettings,
  componentName,
  muiName,
  slotInterfaceName,
}: ParseSlotsAndClassesParameters): {
  slots: Slot[];
  classes: ComponentClassDefinition[];
} {
  // Obtain an array of classes for the given component
  const classDefinitions = extractClasses(
    typescriptProject,
    projectSettings,
    componentName,
    muiName,
  );
  const slots = extractSlots(typescriptProject, componentName, classDefinitions, slotInterfaceName);

  const nonSlotClassDefinitions = classDefinitions.filter(
    (classDefinition) => !Object.keys(slots).includes(classDefinition.key),
  );

  return {
    slots: Object.values(slots),
    classes: nonSlotClassDefinitions,
  };
}

function extractClasses(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  return (
    extractClassesFromProps(typescriptProject, projectSettings, componentName, muiName) ??
    extractClassesFromInterface(typescriptProject, projectSettings, componentName, muiName)
  );
}

/**
 * Gets class names and descriptions from the {ComponentName}Classes interface.
 */
function extractClassesFromInterface(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  const result: ComponentClassDefinition[] = [];

  const classesInterfaceName = `${componentName}Classes`;
  if (!typescriptProject.exports[classesInterfaceName]) {
    return result;
  }

  const classesType = typescriptProject.checker.getDeclaredTypeOfSymbol(
    typescriptProject.exports[classesInterfaceName],
  );

  const classesTypeDeclaration = classesType?.symbol?.declarations?.[0];
  if (classesTypeDeclaration && ts.isInterfaceDeclaration(classesTypeDeclaration)) {
    const classesProperties = classesType.getProperties();
    classesProperties.forEach((symbol) => {
      const tags = getSymbolJSDocTags(symbol);
      if (tags.ignore) {
        return;
      }
      result.push({
        key: symbol.name,
        className: projectSettings.generateClassName(muiName, symbol.name),
        description: getSymbolDescription(symbol, typescriptProject),
        isGlobal: projectSettings.isGlobalClassName(symbol.name),
        ...getClassDeprecationObject(symbol),
      });
    });
  }

  return result;
}

function extractClassesFromProps(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] | null {
  const declaration = getComponentDeclaration(typescriptProject, componentName);

  if (!declaration) {
    throw new Error(
      `No export found in "${typescriptProject.rootPath}" for component "${componentName}" or "Unstable_${componentName}".`,
    );
  }

  const classesProp = getPropsFromComponentNode({
    node: declaration,
    project: typescriptProject,
    shouldInclude: ({ name }) => name === 'classes',
    checkDeclarations: true,
  })?.props.classes;

  if (classesProp == null) {
    return null;
  }

  const classes: Record<string, ClassInfo> = {};
  classesProp.signatures.forEach((propType) => {
    const type = typescriptProject.checker.getTypeAtLocation(propType.symbol.declarations![0]);
    removeUndefinedFromType(type)
      ?.getProperties()
      .forEach((property) => {
        const tags = getSymbolJSDocTags(property);
        if (tags.ignore) {
          return;
        }
        const description = getSymbolDescription(property, typescriptProject);
        classes[property.escapedName.toString()] = {
          description,
          ...getClassDeprecationObject(property),
        };
      });
  });

  return Object.keys(classes).map((name) => ({
    key: name,
    className: projectSettings.generateClassName(muiName, name),
    description: name !== classes[name].description ? classes[name].description : '',
    isGlobal: projectSettings.isGlobalClassName(name),
    isDeprecated: classes[name].isDeprecated,
    deprecationInfo: classes[name].deprecationInfo,
  }));
}

function extractSlots(
  project: TypeScriptProject,
  componentName: string,
  classDefinitions: ComponentClassDefinition[],
  slotsInterfaceNameParams?: string,
): Record<string, Slot> {
  const defaultSlotsInterfaceName = `${componentName}Slots`;
  const slotsInterfaceName = slotsInterfaceNameParams ?? defaultSlotsInterfaceName;
  const exportedSymbol = project.exports[slotsInterfaceName];

  const hasSlotsProp = (): boolean => {
    const declaration = getComponentDeclaration(project, componentName);
    if (!declaration) {
      return false;
    }

    const slotsProp = getPropsFromComponentNode({
      node: declaration,
      project,
      shouldInclude: ({ name }) => name === 'slots',
      checkDeclarations: true,
    })?.props.slots;

    return slotsProp != null;
  };

  if (!exportedSymbol) {
    if (hasSlotsProp()) {
      console.warn(
        `Component "${componentName}" has a "slots" prop but is missing the "${slotsInterfaceName}" export.`,
      );
    }
    return {};
  }

  if (!hasSlotsProp()) {
    console.warn(
      `"${slotsInterfaceName}" is exported but component "${componentName}" has no "slots" prop.`,
    );
  }

  const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
  const typeDeclaration = type?.symbol?.declarations?.[0];

  if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
    return {};
  }

  const slots: Record<string, Slot> = {};
  const propertiesOnProject = type.getProperties();
  const classDefMap = new Map(classDefinitions.map((classDef) => [classDef.key, classDef]));

  propertiesOnProject.forEach((propertySymbol) => {
    const tags = getSymbolJSDocTags(propertySymbol);
    if (tags.ignore) {
      return;
    }
    const slotName = propertySymbol.name;
    const slotClassDefinition = classDefMap.get(slotName);

    slots[slotName] = {
      name: slotName,
      description: getSymbolDescription(propertySymbol, project),
      default: tags.default?.text?.[0].text,
      class: slotClassDefinition?.className ?? null,
    };
  });

  return slots;
}

function removeUndefinedFromType(type: ts.Type) {
  // eslint-disable-next-line no-bitwise
  if (type.flags & ts.TypeFlags.Union) {
    return (type as ts.UnionType).types.find((subType) => {
      return subType.flags !== ts.TypeFlags.Undefined;
    });
  }

  return type;
}
