import { mkdirSync } from 'fs';
import path from 'path';
import { kebabCase } from 'es-toolkit/string';
import { writePrettifiedFile } from '../buildApiUtils';
import type { HooksTranslations, PropsTranslations } from '../types/ApiBuilder.types';

/**
 * Sorts object keys, does not recurse).
 */
function sortObjectKeys<T extends Record<string, unknown>>(obj: T | undefined): T | undefined {
  if (!obj) {
    return obj;
  }
  const sortedKeys = Object.keys(obj).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  const result: Record<string, unknown> = {};
  for (const key of sortedKeys) {
    result[key] = obj[key];
  }
  return result as T;
}

/**
 * Sorts the description keys inside translations to ensure consistent JSON output ordering.
 */
function sortTranslationDescriptions(
  translations: PropsTranslations | HooksTranslations,
): PropsTranslations | HooksTranslations {
  if ('propDescriptions' in translations) {
    // PropsTranslations
    return {
      ...translations,
      propDescriptions: sortObjectKeys(translations.propDescriptions) ?? {},
      classDescriptions: sortObjectKeys(translations.classDescriptions) ?? {},
      slotDescriptions: sortObjectKeys(translations.slotDescriptions),
      cssVariablesDescriptions: sortObjectKeys(translations.cssVariablesDescriptions),
      dataAttributesDescriptions: sortObjectKeys(translations.dataAttributesDescriptions),
    };
  }
  // HooksTranslations
  return {
    ...translations,
    parametersDescriptions: sortObjectKeys(translations.parametersDescriptions) ?? {},
    returnValueDescriptions: sortObjectKeys(translations.returnValueDescriptions) ?? {},
  };
}

interface MinimalReactAPI {
  name: string;
  apiDocsTranslationFolder?: string;
  translations: PropsTranslations | HooksTranslations;
}

export default async function generateApiTranslations<ReactApi extends MinimalReactAPI>(
  outputDirectory: string,
  reactApi: ReactApi,
  languages: string[],
) {
  const definitionName = reactApi.name;
  const apiDocsTranslationPath = path.resolve(outputDirectory, kebabCase(definitionName));
  function resolveApiDocsTranslationsComponentLanguagePath(
    language: (typeof languages)[0],
  ): string {
    const languageSuffix = language === 'en' ? '' : `-${language}`;

    return path.join(apiDocsTranslationPath, `${kebabCase(definitionName)}${languageSuffix}.json`);
  }

  mkdirSync(apiDocsTranslationPath, {
    mode: 0o777,
    recursive: true,
  });
  reactApi.apiDocsTranslationFolder = apiDocsTranslationPath;

  const sortedTranslations = sortTranslationDescriptions(reactApi.translations);

  await writePrettifiedFile(
    resolveApiDocsTranslationsComponentLanguagePath('en'),
    JSON.stringify(sortedTranslations),
  );

  await Promise.all(
    languages.map(async (language) => {
      if (language !== 'en') {
        try {
          await writePrettifiedFile(
            resolveApiDocsTranslationsComponentLanguagePath(language),
            JSON.stringify(sortedTranslations),
            undefined,
            { flag: 'wx' },
          );
        } catch (error) {
          // File exists
        }
      }
    }),
  );
}
