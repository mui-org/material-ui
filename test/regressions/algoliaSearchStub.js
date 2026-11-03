import response from './algoliaSearchResponse.json' with { type: 'json' };

// A recorded `/1/indexes/*/queries` response, replayed so the results screen is
// deterministic and offline. See `README.md` for the curl command to refresh it.
const [result] = response.results;

/**
 * The first hits, shaped the way DocSearch persists a visited result: the hit
 * without its highlight and snippet, plus the fields `AppSearch`'s
 * `transformItems` adds. Seeding these gives the start screen a hit list.
 */
export const RECENT_SEARCHES = result.hits.slice(0, 2).map((hit) => {
  // DocSearch drops the highlight and snippet metadata before it stores a hit.
  const stored = Object.fromEntries(
    Object.entries(hit).filter(([field]) => !field.startsWith('_')),
  );
  const { pathname, hash } = new URL(hit.url);
  return {
    ...stored,
    pathname: `${pathname}${hash}`,
    as: `${pathname}${hash}`,
    userLanguage: 'en',
  };
});

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'GET,POST,OPTIONS',
};

const isAlgolia = (url) =>
  url.hostname.endsWith('.algolia.net') || url.hostname.endsWith('.algolianet.com');

/**
 * Answer the search request the modal fires, so the results screen renders the
 * same hits on every run.
 *
 * @param {import('@playwright/test').Page} page
 */
export async function stubAlgoliaSearch(page) {
  await page.route(isAlgolia, (route) =>
    route.fulfill(
      route.request().method() === 'OPTIONS'
        ? { status: 204, headers: CORS }
        : {
            status: 200,
            headers: { ...CORS, 'content-type': 'application/json' },
            body: JSON.stringify(response),
          },
    ),
  );
}

/** @param {import('@playwright/test').Page} page */
export async function unstubAlgoliaSearch(page) {
  await page.unroute(isAlgolia);
}
