function makeUnique(hash, unique, i = 1) {
  const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

  if (!unique[uniqueHash]) {
    unique[uniqueHash] = true;
    return uniqueHash;
  }

  return makeUnique(hash, unique, i + 1);
}

/**
 * @param {string} text - HTML from e.g. parseMarkdown#render
 * @param {Record<string, boolean>} [unique] - Ensures that each output is unique in `unique`
 * @returns {string} that is safe to use in fragment links
 */
function textToHash(text, unique = {}) {
  return makeUnique(
    encodeURI(
      text
        .toLowerCase()
        .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, '')
        .replace(/[!@#$%^&*()=_+[\]{}`~;:'"|,.<>/?\s]+/g, '-')
        .replace(
          /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\uFE0F?/g,
          '',
        ) // remove emojis
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
    ),
    unique,
  );
}

module.exports = textToHash;
