import type { VersionEntry } from '../DocsProvider';
import { mapTranslations } from '../i18n';
import type { RequireContext } from '../i18n';

interface AppContext {
  ctx: {
    query: { userLanguage?: string };
  };
  Component: {
    getInitialProps?: (ctx: AppContext['ctx']) => Promise<Record<string, unknown>>;
  };
}

/**
 * Factory to create MyApp.getInitialProps.
 * Follows the same pattern as `@mui/internal-core-docs/Document`'s `createGetInitialProps`.
 *
 * @param options.translationsContext - A webpack require.context pointing at translation JSON files.
 *   e.g. `require.context('docs/translations', false, /\.\/translations.*\.json$/)`
 */

export function createGetInitialProps(options: {
  translationsContext: RequireContext;
  versions: VersionEntry[];
}) {
  async function getInitialPropsApp({ ctx, Component }: AppContext) {
    let pageProps: Record<string, unknown> = {};

    const translations = mapTranslations(options.translationsContext);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        userLanguage: ctx.query.userLanguage || 'en',
        translations,
        versions: options.versions,
        ...pageProps,
      },
    };
  }

  return getInitialPropsApp;
}
