// Identity of the search fixture the `AppSearch/SearchModal*` routes use.
// Kept free of the recorded response so `vite.config.mts` can import it.
export const INDEX_NAME = 'material-ui-regressions';

// Chosen because its top hits cover everything the screenshots check: several
// sections, a parent with children for the tree connector, and a content hit
// whose snippet is long enough to wrap below 768px.
export const QUERY = 'container query';

export const recentSearchesKey = `__DOCSEARCH_RECENT_SEARCHES__${INDEX_NAME}`;
export const favoriteSearchesKey = `__DOCSEARCH_FAVORITE_SEARCHES__${INDEX_NAME}`;
