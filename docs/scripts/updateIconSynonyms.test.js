import { describe, expect, it } from 'vitest';
import synonyms from '../data/material/components/material-icons/demos/search-icons/synonyms';

// The script runs `fetch` on import, so assert on its source instead.
const source = Object.values(
  import.meta.glob('./updateIconSynonyms.js', { query: '?raw', import: 'default', eager: true }),
)[0];

const SYNONYMS_PATH = 'docs/data/material/components/material-icons/demos/search-icons/synonyms';

describe('updateIconSynonyms', () => {
  it('reads the relocated synonyms file', () => {
    const [, specifier] = source.match(/import synonyms from '([^']+)'/);

    expect(specifier).to.equal(SYNONYMS_PATH);
    expect(Object.keys(synonyms).length).to.be.greaterThan(0);
  });

  it('writes to the relocated synonyms file', () => {
    const [, relative] = source.match(/SYNONYMS_FILE = path\.join\(\s*__dirname,\s*'([^']+)'/);

    expect(`docs/scripts/${relative}`.replace('scripts/../', '')).to.equal(`${SYNONYMS_PATH}.js`);
  });
});
