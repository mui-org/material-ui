interface FixtureRoute {
  path: string;
  suite: string;
  name: string;
}

/**
 * Every fixture maps to the route `/<suite>/<name>` and the screenshot
 * `<suite>/<name>.png`. Two source files resolving to the same pair (e.g.
 * `Blog.js` and `Blog.tsx` under one template) would silently shadow each
 * other, so fail the bundle instead.
 */
export default function assertUniqueFixtures<T extends FixtureRoute>(fixtures: T[]): T[] {
  const seen = new Map<string, string>();

  for (const fixture of fixtures) {
    const route = `/${fixture.suite}/${fixture.name}`;
    const previous = seen.get(route);
    if (previous !== undefined) {
      throw new Error(`Duplicate fixture route ${route}: ${previous} and ${fixture.path}`);
    }
    seen.set(route, fixture.path);
  }

  return fixtures;
}
