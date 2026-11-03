import { marked } from 'marked';
import textToHash from './textToHash.mjs';
import prism from './prism.mjs';

/**
 * Option used by `marked` the library parsing markdown.
 */
const markedOptions = {
  gfm: true,
  breaks: false,
  pedantic: false,
};

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const titleRegExp = /# (.*)[\r\n]/;
const descriptionRegExp = /<p class="description">(.*?)<\/p>/s;
const headerKeyValueRegExp = /(.*?):[\r\n]?\s+(\[[^\]]+\]|.*)/g;
const emptyRegExp = /^\s*$/;

/**
 * Same as https://github.com/markedjs/marked/blob/master/src/helpers.js
 * Need to duplicate because `marked` does not export `escape` function
 */
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else if (escapeTestNoEncode.test(html)) {
    return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
  }

  return html;
}

function checkUrlHealth(href, linkText, context) {
  const url = new URL(href, 'https://mui.com/');

  if (/\/{2,}$/.test(url.pathname)) {
    throw new Error(
      [
        'docs-infra: Duplicated trailing slashes. The following link:',
        `[${linkText}](${href}) in ${context.location} has duplicated trailing slashes, please only add one.`,
        '',
        'See https://ahrefs.com/blog/trailing-slash/ for more details.',
        '',
      ].join('\n'),
    );
  }

  // External links to MUI, ignore
  if (url.host !== 'mui.com') {
    return;
  }

  /**
   * Break for links like:
   * /material-ui/customization/theming
   *
   * It needs to be:
   * /material-ui/customization/theming/
   */
  if (!url.pathname.endsWith('/')) {
    throw new Error(
      [
        'docs-infra: Missing trailing slash. The following link:',
        `[${linkText}](${href}) in ${context.location} is missing a trailing slash, please add it.`,
        '',
        'See https://ahrefs.com/blog/trailing-slash/ for more details.',
        '',
      ].join('\n'),
    );
  }

  // Relative links
  if (href[0] !== '#' && !(href.startsWith('https://') || href.startsWith('http://'))) {
    /**
     * Break for links like:
     * material-ui/customization/theming/
     *
     * It needs to be:
     * /material-ui/customization/theming/
     */
    if (href[0] !== '/') {
      throw new Error(
        [
          'docs-infra: Missing leading slash. The following link:',
          `[${linkText}](${href}) in ${context.location} is missing a leading slash, please add it.`,
          '',
        ].join('\n'),
      );
    }
  }
}

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

  try {
    let regexMatches;
    const headers = {};

    // eslint-disable-next-line no-cond-assign
    while ((regexMatches = headerKeyValueRegExp.exec(header)) !== null) {
      const key = regexMatches[1];
      let value = regexMatches[2].replace(/(.*)/, '$1');
      if (value.startsWith('[')) {
        // Need double quotes to JSON parse.
        value = value.replace(/'/g, '"');
        // Remove the comma after the last value e.g. ["foo", "bar",] -> ["foo", "bar"].
        value = value.replace(/,\s+\]$/g, ']');
        headers[key] = JSON.parse(value);
      } else {
        // Remove quote YAML escaping.
        headers[key] = value.replace(/^"|"$|^'|'$/g, '');
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

    if (headers.hooks) {
      headers.hooks = headers.hooks
        .split(',')
        .map((x) => x.trim())
        .sort();
    } else {
      headers.hooks = [];
    }

    return headers;
  } catch (err) {
    throw new Error(
      `docs-infra: ${err.message} in getHeader(markdown) with markdown: \n\n${header}\n`,
    );
  }
}

function getContents(markdown) {
  const rep = markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/^{{("(?:demo|component)":.*)}}$/gm) // Split markdown into an array, separating demos
    .flatMap((text) => text.split(/^(<codeblock.*?<\/codeblock>)$/gmsu))
    .flatMap((text) => text.split(/^(<featureList.*?<\/featureList>)$/gmsu))
    .filter((content) => !emptyRegExp.test(content)); // Remove empty lines
  return rep;
}

function getTitle(markdown) {
  const matches = markdown.match(titleRegExp);

  if (matches === null) {
    return '';
  }

  return matches[1].replace(/`/g, '');
}

function getDescription(markdown) {
  const matches = markdown.match(descriptionRegExp);
  if (matches === null) {
    return undefined;
  }

  return matches[1].trim().replace(/`/g, '');
}

function getCodeblock(content) {
  if (!content.startsWith('<codeblock')) {
    return undefined;
  }
  // The regexes below have a negative lookahead to prevent ReDoS
  // See https://github.com/mui/material-ui/issues/44078
  const storageKey = content.match(
    /^<codeblock (?!<codeblock )[^>]*storageKey=["|'](?!storageKey=["|'])(\S*)["|'].*>/m,
  )?.[1];
  const blocks = [...content.matchAll(/^```(\S*) (\S*)\n(.*?)\n```/gmsu)].map(
    ([, language, tab, code]) => ({ language, tab, code }),
  );

  const blocksData = blocks.filter(
    (block) => block.tab !== undefined && !emptyRegExp.test(block.code),
  );

  return {
    type: 'codeblock',
    data: blocksData,
    storageKey,
  };
}

function getFeatureList(content) {
  if (!content.startsWith('<featureList')) {
    return undefined;
  }
  const lines = content
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2));

  return ['<ul class="feature-list">', ...lines.map((line) => `<li>${line}</li>`), '</ul>'].join(
    '',
  );
}

/**
 * @param {string} markdown
 */
function renderMarkdown(markdown) {
  // Check if the markdown contains an inline list. Unordered lists are block elements and cannot be parsed inline.
  if (/[-*+] `([A-Za-z]+)`/g.test(markdown)) {
    return marked.parse(markdown, markedOptions);
  }
  // Two new lines result in a newline in the table.
  // All other new lines must be eliminated to prevent markdown mayhem.
  return marked
    .parseInline(markdown, markedOptions)
    .replace(/(\r?\n){2}/g, '<br>')
    .replace(/\r?\n/g, ' ');
}

// Help rank mui.com on component searches first.
const noSEOadvantage = [
  'https://m2.material.io/',
  'https://m3.material.io/',
  'https://material.io/',
  'https://themes.getbootstrap.com/',
  'https://pictogrammers.com/',
  'https://www.w3.org/',
  'https://tailwindcss.com/',
  'https://heroicons.com/',
  'https://react-icons.github.io/',
  'https://fontawesome.com/',
  'https://marmelab.com/',
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
 * @param {Record<string, string>} [context.headingHashes] - WILL BE MUTATED
 * @param {TableOfContentsEntry[]} [context.toc] - WILL BE MUTATED
 * @param {string} [context.userLanguage]
 * @param {object} context.options
 */
function createRender(context) {
  const { headingHashes = {}, toc = [], userLanguage = 'en', options } = context;
  const headingHashesFallbackTranslated = {};
  let headingIndex = -1;

  /**
   * @param {string} markdown
   */
  function render(markdown) {
    const renderer = new marked.Renderer();
    renderer.heading = function heading({ tokens, depth: level }) {
      // Main title, no need for an anchor.
      // It adds noises to the URL.
      //
      // Small title, no need for an anchor.
      // It reduces the risk of duplicated id and it's fewer elements in the DOM.
      const headingHtml = this.parser.parseInline(tokens);
      if (level === 1 || level >= 4) {
        return `<h${level}>${headingHtml}</h${level}>`;
      }

      // Remove links to avoid nested links in the TOCs
      let headingText = headingHtml.replace(/<a\b[^>]*>/gi, '').replace(/<\/a>/gi, '');
      // Remove `code` tags
      headingText = headingText.replace(/<code\b[^>]*>/gi, '').replace(/<\/code>/gi, '');

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
          throw new Error(`docs-infra: Missing parent level for: ${headingText}\n`);
        }

        toc[toc.length - 1].children.push({
          text: displayText,
          level,
          hash,
        });
      }

      return [
        headingHtml.includes('<a ')
          ? [
              // Avoid breaking the anchor link button
              `<h${level} id="${hash}">${headingHtml}`,
              `<a href="#${hash}" class="title-link-to-anchor" aria-labelledby="${hash}"><span class="anchor-icon"><svg><use xlink:href="#anchor-link-icon" /></svg></span></a>`,
            ].join('')
          : `<h${level} id="${hash}"><a href="#${hash}" class="title-link-to-anchor">${headingHtml}<span class="anchor-icon"><svg><use xlink:href="#anchor-link-icon" /></svg></span></a>`,
        `<button title="Post a comment" class="comment-link" data-feedback-hash="${hash}">`,
        '<svg><use xlink:href="#comment-link-icon" /></svg>',
        `</button>`,
        `</h${level}>`,
      ].join('');
    };
    renderer.link = function link({ href, title, tokens }) {
      const linkText = this.parser.parseInline(tokens);
      let more = '';

      if (title) {
        more += ` title="${title}"`;
      }

      if (noSEOadvantage.some((domain) => href.includes(domain))) {
        more = ' target="_blank" rel="noopener nofollow"';
      }

      let finalHref = href;

      checkUrlHealth(href, linkText, context);

      if (userLanguage !== 'en' && href.startsWith('/') && !options.ignoreLanguagePages(href)) {
        finalHref = `/${userLanguage}${href}`;
      }

      // This logic turns link like:
      // https://github.com/mui/material-ui/blob/-/packages/mui-joy/src/styles/components.d.ts
      // into a permalink:
      // https://github.com/mui/material-ui/blob/v5.11.15/packages/mui-joy/src/styles/components.d.ts
      if (finalHref.startsWith(`${options.env.SOURCE_CODE_REPO}/blob/-/`)) {
        finalHref = finalHref.replace(
          `${options.env.SOURCE_CODE_REPO}/blob/-/`,
          `${options.env.SOURCE_CODE_REPO}/blob/v${options.env.LIB_VERSION}/`,
        );
      }

      return `<a href="${finalHref}"${more}>${linkText}</a>`;
    };
    renderer.tablecell = function tablecell({ tokens, header, align }) {
      const tag = header ? 'th' : 'td';
      const style = align ? ` style="text-align:${align}"` : '';
      return `<${tag}${style}>${this.parser.parseInline(tokens)}</${tag}>\n`;
    };
    renderer.code = ({ lang, text, escaped }) => {
      // https://github.com/markedjs/marked/blob/30e90e5175700890e6feb1836c57b9404c854466/src/Renderer.js#L15
      const langString = (lang || '').match(/\S*/)[0];
      const title = (lang || '').match(/title="([^"]*)"/)?.[1];
      const out = prism(text, langString);
      if (out != null && out !== text) {
        escaped = true;
        text = out;
      }

      const code = `${text.replace(/\n$/, '')}\n`;

      if (!lang) {
        return `<pre><code>${escaped ? code : escape(code, true)}</code></pre>\n`;
      }

      return `<div class="MuiCode-root">${title ? `<div class="MuiCode-title">${title}</div>` : ''}<pre><code class="language-${escape(lang, true)}">${
        escaped ? code : escape(code, true)
      }</code></pre>${[
        '<button data-ga-event-category="code" data-ga-event-action="copy-click" aria-label="Copy the code" class="MuiCode-copy">',
        '<span class="MuiCode-copy-label">Copy</span>',
        '<span class="MuiCode-copied-label">Copied</span>',
        '<span class="MuiCode-copyKeypress"><span>(or</span> <span class="MuiCode-copyKeypressKey" role="img" aria-label="Ctrl or CMD"></span>C<span>)</span></span></button></div>',
      ].join('')}\n`;
    };

    marked.use({
      extensions: [
        {
          name: 'callout',
          level: 'block',
          start(src) {
            const match = src.match(/:::/);
            return match ? match.index : undefined;
          },
          tokenizer(src) {
            const rule =
              /^ {0,3}(:{3,}(?=[^:\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~:]* *(?=\n|$)|$)/;
            const match = rule.exec(src);
            if (match) {
              const token = {
                type: 'callout',
                raw: match[0],
                text: match[3].trim(),
                severity: match[2],
                tokens: [],
              };
              this.lexer.blockTokens(token.text, token.tokens);
              return token;
            }
            return undefined;
          },
          renderer(token) {
            if (!['info', 'success', 'warning', 'error'].includes(token.severity)) {
              throw new Error(`docs-infra: Callout :::${token.severity} is not supported`);
            }

            return `<aside class="MuiCallout-root MuiCallout-${token.severity}">${[
              '<div class="MuiCallout-icon-container">',
              '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">',
              `<use class="MuiCode-copied-icon" xlink:href="#${token.severity}-icon" />`,
              '</svg>',
              '</div>',
            ].join(
              '\n',
            )}<div class="MuiCallout-content">${this.parser.parse(token.tokens)}</div></aside>`;
          },
        },
      ],
    });

    return marked(markdown, { ...markedOptions, renderer });
  }

  return render;
}

export {
  createRender,
  getContents,
  getDescription,
  getCodeblock,
  getFeatureList,
  getHeaders,
  getTitle,
  renderMarkdown,
};
