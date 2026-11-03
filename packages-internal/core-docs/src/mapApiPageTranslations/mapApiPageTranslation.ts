import { createRender } from '@mui/internal-markdown';
import { LANGUAGES_IGNORE_PAGES } from '../constants';

/**
 * Renders the markdown `componentDescription` of an API translation JSON to
 * HTML and computes its `componentDescriptionToc`. Mutates and returns the
 * translation object.
 *
 * @param translation - The raw translation JSON for a single component.
 * @param languagesIgnorePages - A function that returns true if the page
 *   should not be translated. Typically `LANGUAGES_IGNORE_PAGES` from the
 *   docs config.
 */
export function mapApiPageTranslation(
  translation: any,
  languagesIgnorePages: (pathname: string) => boolean = LANGUAGES_IGNORE_PAGES,
) {
  if (!translation || !translation.componentDescription) {
    return translation;
  }

  const componentDescriptionToc: any[] = [];
  const render = createRender({
    headingHashes: {},
    toc: componentDescriptionToc,
    userLanguage: 'en',
    location: [],
    options: {
      ignoreLanguagePages: languagesIgnorePages || (() => false),
      env: {
        SOURCE_CODE_REPO: '',
      },
    },
  });
  translation.componentDescription = render(translation.componentDescription);
  translation.componentDescriptionToc = componentDescriptionToc;

  return translation;
}
