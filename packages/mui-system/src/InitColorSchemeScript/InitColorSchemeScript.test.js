/* eslint-disable no-eval */
import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import InitColorSchemeScript from '@mui/system/InitColorSchemeScript';
import {
  DEFAULT_ATTRIBUTE,
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './InitColorSchemeScript';

describe('InitColorSchemeScript', () => {
  // `InitColorSchemeScript` is only ever rendered on the server (Next.js `_document` or the App
  // Router root layout), so render it to a string here.
  const { render, renderToString } = createRenderer();
  let originalMatchmedia;
  let storage = {};
  const createMatchMedia = (matches) => () => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  });

  beforeEach(() => {
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (key) => storage[key],
      },
      configurable: true,
    });

    // clear the localstorage
    storage = {};
    document.documentElement.removeAttribute(DEFAULT_ATTRIBUTE);
    window.matchMedia = createMatchMedia(false);
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('should set `light` color scheme to body', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';

    const { container } = renderToString(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('foo');
  });

  it('should set `light` color scheme with class', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    document.documentElement.classList.remove(...document.documentElement.classList);

    const { container } = renderToString(<InitColorSchemeScript attribute="class" />);
    expect(container.firstChild.textContent.replace(/\s/g, '')).not.to.include(
      "setAttribute('.%s',colorScheme)",
    );
    eval(container.firstChild.textContent);
    expect(document.documentElement.classList.value).to.equal('foo');
    document.documentElement.classList.remove('foo'); // cleanup
  });

  it('should set `light` color scheme with data', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';

    const { container } = renderToString(<InitColorSchemeScript attribute="data" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-foo')).to.equal('');
  });

  it('should set custom color scheme to body with custom attribute', () => {
    storage['mui-foo-mode'] = 'light';
    storage[`mui-bar-color-scheme-light`] = 'flash';

    const { container } = renderToString(
      <InitColorSchemeScript
        modeStorageKey="mui-foo-mode"
        colorSchemeStorageKey="mui-bar-color-scheme"
        attribute="data-mui-baz-scheme"
      />,
    );
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mui-baz-scheme')).to.equal('flash');
  });

  it('should switch between light and dark with class attribute', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    let { container } = renderToString(<InitColorSchemeScript attribute=".mode-%s" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.classList.value).to.equal('mode-foo');

    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    ({ container } = renderToString(<InitColorSchemeScript attribute=".mode-%s" />));
    eval(container.firstChild.textContent);
    expect(document.documentElement.classList.value).to.equal('mode-bar');

    document.documentElement.classList.remove('mode-bar'); // cleanup
  });

  it('should switch between light and dark with data-%s attribute', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    let { container } = renderToString(<InitColorSchemeScript attribute="[data-mode-%s]" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode-foo')).to.equal('');
    expect(document.documentElement.getAttribute('data-mode-bar')).to.equal(null);

    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    ({ container } = renderToString(<InitColorSchemeScript attribute="[data-mode-%s]" />));
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode-bar')).to.equal('');
    expect(document.documentElement.getAttribute('data-mode-foo')).to.equal(null);
  });

  it('should switch between light and dark with data="%s" attribute', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    let { container } = renderToString(<InitColorSchemeScript attribute="[data-mode='%s']" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode')).to.equal('foo');

    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    ({ container } = renderToString(<InitColorSchemeScript attribute="[data-mode='%s']" />));
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode')).to.equal('bar');
  });

  it('should keep an `=` inside a bracketed attribute value', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    let { container } = renderToString(<InitColorSchemeScript attribute="[data-mode='a=b']" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode')).to.equal('a=b');

    ({ container } = renderToString(<InitColorSchemeScript attribute="[data-mode='v=%s']" />));
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode')).to.equal('v=bar');

    document.documentElement.removeAttribute('data-mode'); // cleanup
  });

  it('should set `dark` color scheme to body', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    const { container } = renderToString(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('bar');
  });

  it('should set dark color scheme to body, given prefers-color-scheme is `dark`', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'system';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'dim';
    window.matchMedia = createMatchMedia(true);

    const { container } = renderToString(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('dim');
  });

  it('should set light color scheme to body, given prefers-color-scheme is NOT `dark`', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'system';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'bright';
    window.matchMedia = createMatchMedia(false);

    const { container } = renderToString(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('bright');
  });

  describe('system preference', () => {
    it('should set dark color scheme to body, given prefers-color-scheme is `dark`', () => {
      window.matchMedia = createMatchMedia(true);

      const { container } = renderToString(
        <InitColorSchemeScript defaultDarkColorScheme="trueDark" />,
      );
      eval(container.firstChild.textContent);
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('trueDark');
    });

    it('should set light color scheme to body, given prefers-color-scheme is NOT `dark`', () => {
      window.matchMedia = createMatchMedia(false);

      const { container } = renderToString(
        <InitColorSchemeScript defaultLightColorScheme="yellow" />,
      );
      eval(container.firstChild.textContent);
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('yellow');
    });
  });

  it('should resolve the %s placeholder at build time, not with a runtime replace', () => {
    // The generated script uses string concatenation (`"mode-" + colorScheme`); no `%s` template
    // or `.replace('%s', …)` call should survive into the browser.
    ['class', 'data', '.mode-%s', '[data-mode-%s]', "[data-mode='%s']"].forEach((attribute) => {
      const { container } = renderToString(<InitColorSchemeScript attribute={attribute} />);
      const script = container.firstChild.textContent;
      expect(script).not.to.include("replace('%s'");
      expect(script).not.to.include('%s');
    });
  });

  it('should serialize the attribute so it cannot break out of the script', () => {
    const payload = `x');globalThis.muiScriptInjection = true;//</script><script>globalThis.muiScriptInjection = true</script>`;
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    delete globalThis.muiScriptInjection;

    const { container } = renderToString(<InitColorSchemeScript attribute={payload} />);
    expect(container.querySelectorAll('script')).to.have.length(1);
    eval(container.firstChild.textContent);
    expect(globalThis.muiScriptInjection).to.equal(undefined);
  });

  // colorSchemeNode is emitted as a raw expression (see the prop docs), so it is not covered here.
  it('should serialize storage keys and default scheme names before embedding them in the script', () => {
    const payload = `';globalThis.muiScriptInjection = true;//</script><script>globalThis.muiScriptInjection = true</script>`;
    const configurations = [
      { modeStorageKey: payload },
      { colorSchemeStorageKey: payload },
      { defaultMode: payload },
      { defaultLightColorScheme: payload },
      { defaultDarkColorScheme: payload },
    ];

    configurations.forEach((configuration) => {
      delete globalThis.muiScriptInjection;
      const { container } = renderToString(<InitColorSchemeScript {...configuration} />);

      expect(container.querySelectorAll('script')).to.have.length(1);
      eval(container.firstChild.textContent);
      expect(globalThis.muiScriptInjection).to.equal(undefined);
    });
  });

  it('should read back serialized keys and default values with special characters', () => {
    // Serialization must round-trip, not just neutralize: a storage key or default scheme name
    // with `<`, a quote, and a line separator has to resolve to the exact same string at runtime.
    // A mangled key would miss the mode lookup (applying the wrong scheme) and a mangled value
    // would land altered - both fail this assertion.
    const modeStorageKey = "a<b'c\u2028d";
    const darkScheme = "x<y'z\u2029";
    storage[modeStorageKey] = 'dark';

    const { container } = renderToString(
      <InitColorSchemeScript modeStorageKey={modeStorageKey} defaultDarkColorScheme={darkScheme} />,
    );
    eval(container.firstChild.textContent);

    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal(darkScheme);
  });

  // Client renders must stay script-free (#48595).
  it('should not render the script on the client', () => {
    const { container } = render(<InitColorSchemeScript />);
    expect(container.querySelector('script')).to.equal(null);
  });

  // Hydration path (the bug in #48595): the script is server-rendered, hydrated without a mismatch
  // warning (vitest-fail-on-console turns the warning into a failure), then dropped on the
  // post-hydration commit when the client snapshot takes over.
  it('should emit the script on server render and drop it after hydration', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';

    const view = renderToString(<InitColorSchemeScript />);
    expect(view.container.querySelector('script')).not.to.equal(null);

    const { container } = view.hydrate();
    expect(container.querySelector('script')).to.equal(null);
  });
});
