import type { Symbol } from '@typescript/typescript6';
import { isPropertySignature } from '@typescript/typescript6';
import type { TypeScriptProject } from './createTypeScriptProject';
import type { ParsedProperty } from '../types/ApiBuilder.types';
import { getSymbolDescription, getSymbolJSDocTags, stringifySymbol } from '../buildApiUtils';

const parseProperty = async (
  propertySymbol: Symbol,
  project: TypeScriptProject,
): Promise<ParsedProperty> => ({
  name: propertySymbol.name,
  description: getSymbolDescription(propertySymbol, project),
  tags: getSymbolJSDocTags(propertySymbol),
  required: !propertySymbol.declarations?.find(isPropertySignature)?.questionToken,
  typeStr: await stringifySymbol(propertySymbol, project),
});

const extractInfoFromType = async (
  typeName: string,
  project: TypeScriptProject,
): Promise<ParsedProperty[]> => {
  // Generate the params
  let result: ParsedProperty[] = [];

  try {
    const exportedSymbol = project.exports[typeName];
    const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
    const typeDeclaration = type?.symbol?.declarations?.[0];
    if (!typeDeclaration) {
      return [];
    }

    const properties: Record<string, ParsedProperty> = {};
    const propertiesOnProject = type.getProperties();

    await Promise.all(
      propertiesOnProject.map(async (propertySymbol) => {
        properties[propertySymbol.name] = await parseProperty(propertySymbol, project);
      }),
    );

    result = Object.values(properties)
      .filter((property) => !property.tags.ignore)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    console.error(`No declaration for ${typeName}`);
  }

  return result;
};

export default extractInfoFromType;
