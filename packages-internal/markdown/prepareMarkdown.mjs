import fs from 'fs';
import path from 'path';
import { kebabCase } from 'es-toolkit/string';
import {
  createRender,
  getContents,
  getDescription,
  getCodeblock,
  getFeatureList,
  getHeaders,
  getTitle,
} from './parseMarkdown.mjs';

/**
 * @type {string | string[]}
 */
const BaseUIReexportedComponents = [];

/**
 * @param {string} productId
 * @example 'material'
 * @param {string} componentPkg
 * @example 'mui-base'
 * @param {string} component
 * @example 'Button'
 * @returns {string}
 */
function resolveComponentApiUrl(productId, componentPkg, component) {
  if (!productId) {
    return `/api/${kebabCase(component)}/`;
  }
  if (productId === 'x-date-pickers') {
    return `/x/api/date-pickers/${kebabCase(component)}/`;
  }
  if (productId === 'x-charts') {
    return `/x/api/charts/${kebabCase(component)}/`;
  }
  if (productId === 'x-tree-view') {
    return `/x/api/tree-view/${kebabCase(component)}/`;
  }
  if (productId === 'x-data-grid') {
    return `/x/api/data-grid/${kebabCase(component)}/`;
  }
  if (productId === 'x-scheduler') {
    return `/x/api/scheduler/${kebabCase(component)}/`;
  }
  if (productId === 'x-chat') {
    return `/x/api/chat/${kebabCase(component)}/`;
  }
  if (componentPkg === 'mui-base' || BaseUIReexportedComponents.includes(component)) {
    return `/base-ui/react-${kebabCase(component)}/components-api/#${kebabCase(component)}`;
  }
  if (productId === 'toolpad-core') {
    return `/toolpad/core/api/${kebabCase(component)}/`;
  }
  return `/${productId}/api/${kebabCase(component)}/`;
}

/**
 * @typedef  {{ component: string, demo?: undefined }} ComponentEntry
 * @typedef  {{ component?: undefined, demo: string, hideToolbar?: boolean }} DemoEntry
 */

/**
 * @typedef {{ rendered: Array<string | ComponentEntry | DemoEntry> }} TranslatedDoc
 */

/**
 * @param {object} config
 * @param {Array<{ markdown: string, filename: string, userLanguage: string }>} config.translations - Mapping of locale to its markdown
 * @param {string} config.fileRelativeContext - posix filename relative to repository root directory
 * @param {object} config.options - provided to the webpack loader
 * @param {string} config.options.workspaceRoot - The absolute path of the repository root directory
 * @param {object} [config.componentPackageMapping] - Mapping of productId to mapping of component name to package name
 * @example { 'material': { 'Button': 'mui-material' } }
 * @returns {{ docs: Record<string, TranslatedDoc> }} - Mapping of locale to its prepared markdown
 */
function prepareMarkdown(config) {
  const { fileRelativeContext, translations, componentPackageMapping = {}, options } = config;

  /**
   * @type {Record<string, TranslatedDoc>}
   */
  const docs = {};
  const headingHashes = {};

  translations
    // Process the English markdown before the other locales.
    // English ToC anchor links are used in all languages
    .sort((a) => (a.userLanguage === 'en' ? -1 : 1))
    .forEach((translation) => {
      const { filename, markdown, userLanguage } = translation;
      const headers = getHeaders(markdown);
      const location = headers.filename || `/${fileRelativeContext}/${filename}`;
      const markdownH1 = getTitle(markdown);
      const title = headers.title || markdownH1;
      const description = headers.description || getDescription(markdown);

      if (title == null || title === '') {
        throw new Error(`docs-infra: Missing title in the page: ${location}\n`);
      }

      if (title.length > 70) {
        throw new Error(
          [
            `docs-infra: The title "${title}" is too long (${title.length} characters).`,
            'It needs to have fewer than 70 characters—ideally less than 60. For more details, see:',
            'https://developers.google.com/search/docs/advanced/appearance/title-link',
            '',
          ].join('\n'),
        );
      }

      if (description == null || description === '') {
        throw new Error(`docs-infra: Missing description in the page: ${location}\n`);
      }

      if (description.length > 160) {
        throw new Error(
          [
            `docs-infra: The description "${description}" is too long (${description.length} characters).`,
            'It needs to have fewer than 170 characters—ideally less than 160. For more details, see:',
            'https://ahrefs.com/blog/meta-description/#4-be-concise',
            '',
          ].join('\n'),
        );
      }

      if (description.slice(-1) !== '.' && description.slice(-1) !== '!') {
        throw new Error(
          `docs-infra: The description "${description}" should end with a "." or "!", those are sentences.`,
        );
      }

      const contents = getContents(markdown);

      if (headers.components.length > 0 && headers.productId !== 'base-ui') {
        contents.push(`
## API

See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.

${headers.components
  .map((component) => {
    const componentPkgMap = componentPackageMapping[headers.productId];
    const componentPkg = componentPkgMap ? componentPkgMap[component] : null;
    return `- [\`<${component} />\`](${resolveComponentApiUrl(
      headers.productId,
      componentPkg,
      component,
    )})`;
  })
  .join('\n')}
${headers.hooks
  .map((hook) => {
    const componentPkgMap = componentPackageMapping[headers.productId];
    const componentPkg = componentPkgMap ? componentPkgMap[hook] : null;
    return `- [\`${hook}\`](${resolveComponentApiUrl(headers.productId, componentPkg, hook)})`;
  })
  .join('\n')}
  `);
      }

      const toc = [];
      const render = createRender({
        headingHashes,
        toc,
        userLanguage,
        location,
        options,
      });

      const rendered = contents.map((content) => {
        if (/^"(demo|component)": "(.*)"/.test(content)) {
          try {
            return JSON.parse(`{${content}}`);
          } catch (err) {
            console.error('JSON.parse fails with: ', `{${content}}`);
            console.error(err);
            return null;
          }
        }
        const codeblock = getCodeblock(content);

        if (codeblock) {
          return codeblock;
        }

        const featureList = getFeatureList(content);

        if (featureList) {
          return featureList;
        }

        return render(content);
      });

      // fragment link symbol
      rendered.unshift(`<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="comment-link-icon" viewBox="0 0 24 24">
<path d="M22.8481 4C22.8481 2.9 21.9481 2 20.8481 2H4.84814C3.74814 2 2.84814 2.9 2.84814 4V16C2.84814 17.1 3.74814 18 4.84814 18H18.8481L22.8481 22V4ZM16.8481 11H13.8481V14C13.8481 14.55 13.3981 15 12.8481 15C12.2981 15 11.8481 14.55 11.8481 14V11H8.84814C8.29814 11 7.84814 10.55 7.84814 10C7.84814 9.45 8.29814 9 8.84814 9H11.8481V6C11.8481 5.45 12.2981 5 12.8481 5C13.3981 5 13.8481 5.45 13.8481 6V9H16.8481C17.3981 9 17.8481 9.45 17.8481 10C17.8481 10.55 17.3981 11 16.8481 11Z" />
</symbol>
</svg>`);

      rendered.unshift(`<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="anchor-link-icon" viewBox="0 0 12 6">
<path d="M8.9176 0.083252H7.1676C6.84677 0.083252 6.58427 0.345752 6.58427 0.666585C6.58427 0.987419 6.84677 1.24992 7.1676 1.24992H8.9176C9.8801 1.24992 10.6676 2.03742 10.6676 2.99992C10.6676 3.96242 9.8801 4.74992 8.9176 4.74992H7.1676C6.84677 4.74992 6.58427 5.01242 6.58427 5.33325C6.58427 5.65409 6.84677 5.91659 7.1676 5.91659H8.9176C10.5276 5.91659 11.8343 4.60992 11.8343 2.99992C11.8343 1.38992 10.5276 0.083252 8.9176 0.083252ZM3.6676 2.99992C3.6676 3.32075 3.9301 3.58325 4.25094 3.58325H7.75094C8.07177 3.58325 8.33427 3.32075 8.33427 2.99992C8.33427 2.67909 8.07177 2.41659 7.75094 2.41659H4.25094C3.9301 2.41659 3.6676 2.67909 3.6676 2.99992ZM4.83427 4.74992H3.08427C2.12177 4.74992 1.33427 3.96242 1.33427 2.99992C1.33427 2.03742 2.12177 1.24992 3.08427 1.24992H4.83427C5.1551 1.24992 5.4176 0.987419 5.4176 0.666585C5.4176 0.345752 5.1551 0.083252 4.83427 0.083252H3.08427C1.47427 0.083252 0.167603 1.38992 0.167603 2.99992C0.167603 4.60992 1.47427 5.91659 3.08427 5.91659H4.83427C5.1551 5.91659 5.4176 5.65409 5.4176 5.33325C5.4176 5.01242 5.1551 4.74992 4.83427 4.74992Z" />
</symbol>
</svg>`);

      rendered.unshift(`<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="copy-icon" viewBox="0 0 24 24">
<path d="M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z" />
+</symbol>
</svg>`);

      rendered.unshift(`<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="copied-icon" viewBox="0 0 24 24">
<path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.24 11.28L9.69 11.2c-.38-.39-.38-1.01 0-1.4.39-.39 1.02-.39 1.41 0l1.36 1.37 4.42-4.46c.39-.39 1.02-.39 1.41 0 .38.39.38 1.01 0 1.4l-5.13 5.17c-.37.4-1.01.4-1.4 0zM3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1z" />
</symbol>
</svg>`);

      // icons for callout (info, success, warning, error)

      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="info-icon" viewBox="0 0 20 20">
<path d="M9.996 14c.21 0 .39-.072.535-.216a.72.72 0 0 0 .219-.534v-3.5a.728.728 0 0 0-.214-.534.72.72 0 0 0-.532-.216.734.734 0 0 0-.535.216.72.72 0 0 0-.219.534v3.5c0 .213.071.39.214.534a.72.72 0 0 0 .532.216Zm0-6.5c.21 0 .39-.071.535-.214a.714.714 0 0 0 .219-.532.736.736 0 0 0-.214-.535.714.714 0 0 0-.532-.219.736.736 0 0 0-.535.214.714.714 0 0 0-.219.532c0 .21.071.39.214.535.143.146.32.219.532.219Zm.01 10.5a7.81 7.81 0 0 1-3.11-.625 8.065 8.065 0 0 1-2.552-1.719 8.066 8.066 0 0 1-1.719-2.551A7.818 7.818 0 0 1 2 9.99c0-1.104.208-2.14.625-3.105a8.066 8.066 0 0 1 4.27-4.26A7.818 7.818 0 0 1 10.009 2a7.75 7.75 0 0 1 3.106.625 8.083 8.083 0 0 1 4.26 4.265A7.77 7.77 0 0 1 18 9.994a7.81 7.81 0 0 1-.625 3.11 8.066 8.066 0 0 1-1.719 2.552 8.083 8.083 0 0 1-2.546 1.719 7.77 7.77 0 0 1-3.104.625Z"/>
</symbol>
</svg>`,
      );
      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="success-icon" viewBox="0 0 20 20">
<path d="m8.938 10.875-1.25-1.23a.718.718 0 0 0-.521-.228.718.718 0 0 0-.521.229.73.73 0 0 0 0 1.062l1.77 1.771c.153.153.327.23.521.23a.718.718 0 0 0 .521-.23l3.896-3.896a.73.73 0 0 0 0-1.062.718.718 0 0 0-.52-.23.718.718 0 0 0-.521.23l-3.376 3.354ZM10 18a7.796 7.796 0 0 1-3.104-.625 8.065 8.065 0 0 1-2.552-1.719 8.064 8.064 0 0 1-1.719-2.552A7.797 7.797 0 0 1 2 10c0-1.111.208-2.15.625-3.115a8.064 8.064 0 0 1 4.27-4.26A7.797 7.797 0 0 1 10 2c1.111 0 2.15.208 3.115.625a8.096 8.096 0 0 1 4.26 4.26C17.792 7.851 18 8.89 18 10a7.797 7.797 0 0 1-.625 3.104 8.066 8.066 0 0 1-4.26 4.271A7.774 7.774 0 0 1 10 18Z"/>
</symbol>
</svg>`,
      );
      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="warning-icon" viewBox="0 0 20 20">
<path d="M2.33 17a.735.735 0 0 1-.665-.375.631.631 0 0 1-.094-.375.898.898 0 0 1 .115-.396L9.353 3.062a.621.621 0 0 1 .281-.27.85.85 0 0 1 .729 0 .622.622 0 0 1 .281.27l7.667 12.792c.07.125.108.257.114.396a.63.63 0 0 1-.093.375.842.842 0 0 1-.271.27.728.728 0 0 1-.394.105H2.33Zm7.664-2.5c.211 0 .39-.072.536-.214a.714.714 0 0 0 .218-.532.736.736 0 0 0-.214-.535.714.714 0 0 0-.531-.22.736.736 0 0 0-.536.215.714.714 0 0 0-.219.531c0 .212.072.39.215.536.143.146.32.219.531.219Zm0-2.5c.211 0 .39-.072.536-.216a.72.72 0 0 0 .218-.534v-2.5a.728.728 0 0 0-.214-.534.72.72 0 0 0-.531-.216.734.734 0 0 0-.536.216.72.72 0 0 0-.219.534v2.5c0 .212.072.39.215.534a.72.72 0 0 0 .531.216Z"/>
</symbol>
</svg>`,
      );
      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
<symbol id="error-icon" viewBox="0 0 20 20">
<path fill-rule="evenodd" d="M2 7.4v5.2a2 2 0 0 0 .586 1.414l3.4 3.4A2 2 0 0 0 7.4 18h5.2a2 2 0 0 0 1.414-.586l3.4-3.4A2 2 0 0 0 18 12.6V7.4a2 2 0 0 0-.586-1.414l-3.4-3.4A2 2 0 0 0 12.6 2H7.4a2 2 0 0 0-1.414.586l-3.4 3.4A2 2 0 0 0 2 7.4Zm11.03-.43a.75.75 0 0 1 0 1.06L11.06 10l1.97 1.97a.75.75 0 1 1-1.06 1.06L10 11.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L8.94 10 6.97 8.03a.75.75 0 0 1 1.06-1.06L10 8.94l1.97-1.97a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/>
</symbol>
</svg>`,
      );
      docs[userLanguage] = {
        description,
        location,
        rendered,
        toc,
        title,
        headers,
      };
    });

  if (docs.en.headers.card === 'true') {
    const slug = docs.en.location.replace(/(.*)\/(.*)\.md/, '$2');
    const exists = fs.existsSync(
      path.resolve(config.options.workspaceRoot, `docs/public/static/blog/${slug}/card.png`),
    );

    if (!exists) {
      throw new Error(
        [
          `MUI: the card image for the blog post "${slug}" is missing.`,
          `Add a docs/public/static/blog/${slug}/card.png file and then restart Next.js or else remove card: true from the headers.`,
        ].join('\n'),
      );
    }
  }

  return { docs };
}

export default prepareMarkdown;
