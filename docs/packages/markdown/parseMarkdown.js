const marked = require('marked');
const kebabCase = require('lodash/kebabCase');
const textToHash = require('./textToHash');
const prism = require('./prism');

// TODO: pass as argument
const LANGUAGES_IN_PROGRESS = ['en', 'zh', 'ru', 'pt', 'es', 'fr', 'de', 'ja'];

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const titleRegExp = /# (.*)[\r\n]/;
const descriptionRegExp = /<p class="description">(.*)<\/p>/s;
const headerKeyValueRegExp = /(.*?): (.*)/g;
const emptyRegExp = /^\s*$/;
const notEnglishMarkdownRegExp = /-([a-z]{2})\.md$/;

/**
 * Extract information from the top of the markdown.
 * For instance, the following input:
 *
 * ---
 * title: Backdrop React Component
 * components: Backdrop
 * ---
 *
 * # Backdrop
 *
 * should output:
 * { title: 'Backdrop React Component', components: ['Backdrop'] }
 */
function getHeaders(markdown) {
  let header = markdown.match(headerRegExp);

  if (!header) {
    return {
      components: [],
    };
  }

  header = header[1];

  let regexMatches;
  const headers = {};

  // eslint-disable-next-line no-cond-assign
  while ((regexMatches = headerKeyValueRegExp.exec(header)) !== null) {
    const key = regexMatches[1];
    const value = regexMatches[2].replace(/(.*)/, '$1');
    if (value[0] === '[') {
      // Need double quotes to JSON parse.
      headers[key] = JSON.parse(value.replace(/'/g, '"'));
    } else {
      // Remove trailing single quote yml escaping.
      headers[key] = value.replace(/^'|'$/g, '');
    }
  }

  if (headers.components) {
    headers.components = headers.components
      .split(',')
      .map((x) => x.trim())
      .sort();
  } else {
    headers.components = [];
  }

  return headers;
}

function getContents(markdown) {
  return markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/{{("(?:demo|component)":[^}]*)}}$/gm) // Split markdown into an array, separating demos
    .filter((content) => !emptyRegExp.test(content)); // Remove empty lines
}

function getTitle(markdown) {
  const matches = markdown.match(titleRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing title in the page');
  }

  return matches[1];
}

function getDescription(markdown) {
  const matches = markdown.match(descriptionRegExp);
  if (matches === null) {
    return undefined;
  }

  return matches[1].trim();
}

/**
 * @param {string} markdown
 */
function renderInline(markdown) {
  return marked.parseInline(markdown);
}

const externs = [
  'https://material.io/',
  'https://getbootstrap.com/',
  'https://www.amazon.com/',
  'https://materialdesignicons.com/',
  'https://www.w3.org/',
  'https://devexpress.github.io/',
  'https://ui-kit.co/',
];

/**
 * Creates a function that MUST be used to render non-inline markdown.
 * It keeps track of a table of contents and hashes of its items.
 * This is important to create anchors that are invariant between languages.
 *
 * @typedef {object} TableOfContentsEntry
 * @property {TableOfContentsEntry[]} children
 * @property {string} hash
 * @property {number} level
 * @property {string} text
 * @param {object} context
 * @param {Record<string, string>} context.headingHashes - WILL BE MUTATED
 * @param {TableOfContentsEntry[]} context.toc - WILL BE MUTATED
 * @param {string} context.userLanguage
 */
function createRender(context) {
  const { headingHashes, toc, userLanguage } = context;
  const headingHashesFallbackTranslated = {};
  let headingIndex = -1;

  /**
   * @param {string} markdown
   */
  function render(markdown) {
    const renderer = new marked.Renderer();
    renderer.code = (code, infostring) => {
      const lang = (infostring || '').match(/\S*/)[0];

      return `
      {{"component": "modules/components/HighlightedCode.js","encodedCode" : "${encodeURI(
        code,
      )}","language" : "${lang}","isCopyButtonEnabled" : true }}
      `;
    };

    renderer.heading = (headingHtml, level) => {
      // Main title, no need for an anchor.
      // It adds noises to the URL.
      //
      // Small title, no need for an anchor.
      // It reduces the risk of duplicated id and it's fewer elements in the DOM.
      if (level === 1 || level >= 4) {
        return `<h${level}>${headingHtml}</h${level}>`;
      }

      const headingText = headingHtml
        .replace(
          /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\uFE0F?/g,
          '',
        ) // remove emojis
        .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML
        .trim();

      // Standardizes the hash from the default location (en) to different locations
      // Need english.md file parsed first
      let hash;
      if (userLanguage === 'en') {
        hash = textToHash(headingText, headingHashes);
      } else {
        headingIndex += 1;
        hash = Object.keys(headingHashes)[headingIndex];
        if (!hash) {
          hash = textToHash(headingText, headingHashesFallbackTranslated);
        }
      }

      // enable splitting of long words from function name + first arg name
      // Closing parens are less interesting since this would only allow breaking one character earlier.
      // Applying the same mechanism would also allow breaking of non-function signatures like "Community help (free)".
      // To detect that we enabled breaking of open/closing parens we'd need a context-sensitive parser.
      const displayText = headingText.replace(/([^\s]\()/g, '$1&#8203;');

      // create a nested structure with 2 levels starting with level 2 e.g.
      // [{...level2, children: [level3, level3, level3]}, level2]
      if (level === 2) {
        toc.push({
          text: displayText,
          level,
          hash,
          children: [],
        });
      } else if (level === 3) {
        if (!toc[toc.length - 1]) {
          throw new Error(`Missing parent level for: ${headingText}`);
        }

        toc[toc.length - 1].children.push({
          text: displayText,
          level,
          hash,
        });
      }
      const headingId = `heading-${hash}`;

      return [
        `<h${level} id="${headingId}">`,
        `<span class="anchor-link" id="${hash}"></span>`,
        headingHtml,
        `<a aria-labelledby="${headingId}" class="anchor-link-style" href="#${hash}" tabindex="-1">`,
        '<svg><use xlink:href="#anchor-link-icon" /></svg>',
        '</a>',
        `</h${level}>`,
      ].join('');
    };
    renderer.link = (href, linkTitle, linkText) => {
      let more = '';

      if (externs.some((domain) => href.indexOf(domain) !== -1)) {
        more = ' target="_blank" rel="noopener nofollow"';
      }

      let finalHref = href;

      if (userLanguage !== 'en' && finalHref.indexOf('/') === 0 && finalHref !== '/size-snapshot') {
        finalHref = `/${userLanguage}${finalHref}`;
      }

      return `<a href="${finalHref}"${more}>${linkText}</a>`;
    };

    const markedOptions = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: prism,
      renderer,
    };

    return marked(markdown, markedOptions);
  }

  return render;
}

/**
 * @param {object} config
 * @param {() => string} config.requireRaw - returnvalue of require.context
 * @param {string} config.pageFilename - posix filename relative to nextjs pages directory
 */
function prepareMarkdown(config) {
  const { pageFilename, requireRaw } = config;

  const demos = {};
  /**
   * @type {Record<string, { rendered: Array<string | { component: string } | { demo:string }> }>}
   */
  const docs = {};
  const headingHashes = {};

  // Process the English markdown before the other locales.
  // English ToC anchor links are used in all languages
  let filenames = [];
  requireRaw.keys().forEach((filename) => {
    if (filename.match(notEnglishMarkdownRegExp)) {
      filenames.push(filename);
    } else {
      filenames = [filename].concat(filenames);
    }
  });

  filenames.forEach((filename) => {
    if (filename.indexOf('.md') !== -1) {
      const matchNotEnglishMarkdown = filename.match(notEnglishMarkdownRegExp);

      const userLanguage =
        matchNotEnglishMarkdown && LANGUAGES_IN_PROGRESS.indexOf(matchNotEnglishMarkdown[1]) !== -1
          ? matchNotEnglishMarkdown[1]
          : 'en';

      const markdown = requireRaw(filename);
      const headers = getHeaders(markdown);
      const title = headers.title || getTitle(markdown);
      const description = headers.description || getDescription(markdown);
      const contents = getContents(markdown);

      if (headers.components.length > 0) {
        contents.push(`
## API

${headers.components
  .map((component) => `- [\`<${component} />\`](/api/${kebabCase(component)}/)`)
  .join('\n')}
  `);
      }

      const toc = [];
      const render = createRender({ headingHashes, toc, userLanguage });

      const rendered = [];
      contents.forEach((content) => {
        if (/^"(demo|component)": "(.*)"/.test(content)) {
          try {
            rendered.push(JSON.parse(`{${content}}`));
            return;
          } catch (err) {
            console.error('JSON.parse fails with: ', `{${content}}`);
            console.error(err);
            rendered.push(null);
            return;
          }
        }

        const afterRenderContents = getContents(render(content)); // seperate components for markdown elements
        afterRenderContents.forEach((afterRenderContent) => {
          if (/"(?:demo|component)": "(.*)"/.test(afterRenderContent)) {
            try {
              rendered.push(JSON.parse(`{${afterRenderContent}}`));
              return;
            } catch (err) {
              console.error('JSON.parse fails with: ', `{${afterRenderContent}}`);
              console.error(err);
              rendered.push(null);
              return;
            }
          }
          rendered.push(afterRenderContent);
        });
      });

      // fragment link symbol
      rendered.unshift(`<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
  <symbol id="anchor-link-icon" viewBox="0 0 16 16">
    <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
  </symbol>
</svg>`);

      docs[userLanguage] = {
        description,
        location: headers.filename || `/docs/src/pages/${pageFilename}/${filename}`,
        rendered,
        toc,
        title,
        headers,
      };
    } else if (filename.indexOf('.tsx') !== -1) {
      const demoName = `pages/${pageFilename}/${filename
        .replace(/\.\//g, '')
        .replace(/\.tsx/g, '.js')}`;

      demos[demoName] = {
        ...demos[demoName],
        moduleTS: filename,
        rawTS: requireRaw(filename),
      };
    } else {
      const demoName = `pages/${pageFilename}/${filename.replace(/\.\//g, '')}`;

      demos[demoName] = {
        ...demos[demoName],
        module: filename,
        raw: requireRaw(filename),
      };
    }
  });

  return { demos, docs };
}

module.exports = {
  createRender,
  notEnglishMarkdownRegExp,
  getContents,
  getDescription,
  getHeaders,
  getTitle,
  prepareMarkdown,
  renderInline,
};
