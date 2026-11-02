// The browser ends a `<style>` element at the first `</style>` it sees, even one sitting inside a
// CSS value, and reads whatever follows as HTML. `\3c` is the CSS escape for `<`, so the rule keeps
// its meaning but the text can no longer close the element.
export default function escapeHtmlInCss(css: string) {
  return css.replace(/<(?=\/?style\b)/gi, '\\3c ');
}
