import { describe, it, expect } from 'vitest';
import escapeHtmlInCss from './escapeHtmlInCss';

describe('escapeHtmlInCss', () => {
  it('escapes the end tag that would close the style element', () => {
    expect(escapeHtmlInCss('.a{content:"</style>"}')).to.equal('.a{content:"\\3c /style>"}');
  });

  it('escapes every end tag, not only the first', () => {
    expect(escapeHtmlInCss('.a{content:"</style></style>"}')).to.equal(
      '.a{content:"\\3c /style>\\3c /style>"}',
    );
  });

  it('escapes the end tag whatever terminates it', () => {
    // A browser ends the element on `</style` followed by whitespace, `/` or `>`.
    expect(escapeHtmlInCss('.a{content:"</style\n>"}')).to.equal('.a{content:"\\3c /style\n>"}');
    expect(escapeHtmlInCss('.a{content:"</style\t>"}')).to.equal('.a{content:"\\3c /style\t>"}');
    expect(escapeHtmlInCss('.a{content:"</style/>"}')).to.equal('.a{content:"\\3c /style/>"}');
    expect(escapeHtmlInCss('.a{content:"</style')).to.equal('.a{content:"\\3c /style');
  });

  it('escapes the end tag whatever its case', () => {
    expect(escapeHtmlInCss('.a{content:"</STYLE>"}')).to.equal('.a{content:"\\3c /STYLE>"}');
    expect(escapeHtmlInCss('.a{content:"</StYlE>"}')).to.equal('.a{content:"\\3c /StYlE>"}');
  });

  it('escapes the start tag as well', () => {
    expect(escapeHtmlInCss('.a{content:"<style>"}')).to.equal('.a{content:"\\3c style>"}');
  });

  it('leaves a tag name that merely starts with style alone', () => {
    expect(escapeHtmlInCss('.a{content:"</styles>"}')).to.equal('.a{content:"</styles>"}');
  });

  it('leaves other end tags alone', () => {
    expect(escapeHtmlInCss('.a{content:"</script>"}')).to.equal('.a{content:"</script>"}');
  });

  it('leaves a space after the slash alone', () => {
    expect(escapeHtmlInCss('.a{content:"</ style>"}')).to.equal('.a{content:"</ style>"}');
  });

  it('leaves the CSS comment open token alone', () => {
    // `<!--` is a CDO token that a stylesheet ignores at the top level. Escaping it turns it into
    // an ident, which makes the parser consume the rule that follows.
    expect(escapeHtmlInCss('<!-- .a{color:red} -->')).to.equal('<!-- .a{color:red} -->');
  });

  it('leaves comparisons in media queries alone', () => {
    expect(escapeHtmlInCss('@media (width < 600px){.a{color:red}}')).to.equal(
      '@media (width < 600px){.a{color:red}}',
    );
  });

  it('returns CSS that holds no angle bracket unchanged', () => {
    expect(escapeHtmlInCss('.a{color:red}')).to.equal('.a{color:red}');
    expect(escapeHtmlInCss('')).to.equal('');
  });

  it('is idempotent', () => {
    const escaped = escapeHtmlInCss('.a{content:"</style><div>"}');
    expect(escaped).to.equal('.a{content:"\\3c /style><div>"}');
    expect(escapeHtmlInCss(escaped)).to.equal(escaped);
  });
});
