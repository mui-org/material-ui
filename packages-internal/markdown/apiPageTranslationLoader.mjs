// @ts-check
import { createRender } from './parseMarkdown.mjs';

/**
 * Renders the markdown `componentDescription` of an API translation JSON to HTML
 * and computes its `componentDescriptionToc`, at bundler build time. Lets API
 * pages import the rendered descriptions directly from the raw translation JSON
 * without committing the rendered HTML or shipping the markdown lib to the client.
 *
 * Applied by path convention to `translations/api-docs/**.json` (see next.config),
 * which only the generated API pages import.
 *
 * @param {string} source
 * @returns {string}
 */
export default function apiPageTranslationLoader(source) {
  const translation = JSON.parse(source);

  if (translation && translation.componentDescription) {
    /** @type {any[]} */
    const componentDescriptionToc = [];
    const render = createRender({
      headingHashes: {},
      toc: componentDescriptionToc,
      userLanguage: 'en',
      options: { env: { SOURCE_CODE_REPO: '' } },
    });
    translation.componentDescription = render(translation.componentDescription);
    // Only attach the ToC when the description actually produced headings.
    if (componentDescriptionToc.length > 0) {
      translation.componentDescriptionToc = componentDescriptionToc;
    }
  }

  return `export default ${JSON.stringify(translation)};`;
}
