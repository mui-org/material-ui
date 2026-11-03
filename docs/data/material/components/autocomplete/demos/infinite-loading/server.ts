import type { Movie } from './movies';
import movies from './movies';

const PAGE_SIZE = 20;
const FETCH_DELAY_MS = 400;

/** Page of movies returned by the mock paginated search endpoint. */
export interface Movies {
  items: Movie[];
  nextPage: number | null;
}

export function normalizeMovieQuery(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function getMovieYear(movie: Movie): string {
  return movie.releaseDate.slice(0, 4);
}

export function getMovieLabel(movie: Movie): string {
  return `${movie.title} (${getMovieYear(movie)})`;
}

/**
 * Checks whether a movie matches the normalized search query.
 *
 * @param movie - Movie to compare against the query.
 * @param query - Normalized query returned by `normalizeMovieQuery`.
 * @returns `true` when the title, title with year, or display label contains the query.
 */
function matchesMovie(movie: Movie, query: string): boolean {
  const title = normalizeMovieQuery(movie.title);
  const titleWithYear = normalizeMovieQuery(`${movie.title} ${getMovieYear(movie)}`);
  const label = normalizeMovieQuery(getMovieLabel(movie));

  return title.includes(query) || titleWithYear.includes(query) || label.includes(query);
}

async function waitForDelay(durationMs: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) {
    throw signal.reason;
  }

  await new Promise<void>((resolve, reject) => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleAbort = () => {
      clearTimeout(timeout);
      reject(signal.reason);
    };

    timeout = setTimeout(() => {
      signal.removeEventListener('abort', handleAbort);
      resolve();
    }, durationMs);

    signal.addEventListener('abort', handleAbort, { once: true });
  });
}

/**
 * Fetches one page from the mock paginated movie endpoint.
 *
 * In a real app this would call your API, and the server would handle filtering and pagination.
 *
 * @param query - Normalized search query used to filter movies.
 * @param page - Zero-based page index to fetch.
 * @param signal - Abort signal that lets TanStack Query cancel stale in-flight requests.
 * @returns The requested page of movies and the next page index, or `null` when complete.
 */
export async function fetchMovies(
  query: string,
  page: number,
  signal: AbortSignal,
): Promise<Movies> {
  await waitForDelay(FETCH_DELAY_MS, signal);

  const filtered = query ? movies.filter((movie) => matchesMovie(movie, query)) : movies;
  const start = page * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);
  const nextPage = start + PAGE_SIZE < filtered.length ? page + 1 : null;

  return { items, nextPage };
}
