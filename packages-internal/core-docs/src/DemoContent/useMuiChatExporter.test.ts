import { describe, it, expect } from 'vitest';
import type { VariantCode, VariantSource } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { applyVariantTransform } from './useMuiChatExporter';

// Fake `applyCodeTransform`: marks the source so we can assert it ran, without
// pulling in real hast/jsondiffpatch machinery. The real signature returns a
// `VariantSource`; a string stands in fine for these assertions.
const fakeApply = ((source: VariantSource) => `js:${String(source)}`) as Parameters<
  typeof applyVariantTransform
>[2];

describe('applyVariantTransform', () => {
  it('patches and renames the main file that carries the transform key', () => {
    const variant: VariantCode = {
      source: 'const x: number = 1;',
      fileName: 'Demo.tsx',
      transforms: { js: { fileName: 'Demo.jsx', hasDelta: true } },
    };

    const result = applyVariantTransform(variant, 'js', fakeApply);

    expect(result.source).to.equal('js:const x: number = 1;');
    expect(result.fileName).to.equal('Demo.jsx');
    // The manifest referenced the pre-transform source; it must be dropped.
    expect(result.transforms).to.equal(undefined);
  });

  it('patches and renames extra files, leaving the directory intact', () => {
    const variant: VariantCode = {
      source: 'main',
      fileName: 'Demo.tsx',
      transforms: { js: { fileName: 'Demo.jsx', hasDelta: true } },
      extraFiles: {
        'data/top100Films.ts': {
          source: 'export default [];',
          transforms: { js: { fileName: 'top100Films.js', hasDelta: true } },
        },
      },
    };

    const result = applyVariantTransform(variant, 'js', fakeApply);

    expect(result.extraFiles).to.have.property('data/top100Films.js');
    expect(result.extraFiles).to.not.have.property('data/top100Films.ts');
    const renamed = result.extraFiles!['data/top100Films.js'];
    expect(typeof renamed === 'object' && renamed.source).to.equal('js:export default [];');
  });

  it('passes through files without the transform key and string entries', () => {
    const variant: VariantCode = {
      source: 'main',
      fileName: 'Demo.tsx',
      transforms: { js: { fileName: 'Demo.jsx', hasDelta: true } },
      extraFiles: {
        'theme.css': { source: '.a {}' },
        'README.md': 'just a string',
      },
    };

    const result = applyVariantTransform(variant, 'js', fakeApply);

    const css = result.extraFiles!['theme.css'];
    expect(typeof css === 'object' && css.source).to.equal('.a {}');
    expect(result.extraFiles!['README.md']).to.equal('just a string');
  });

  it('leaves the variant untouched when no file carries the transform key', () => {
    const variant: VariantCode = {
      source: 'const x = 1;',
      fileName: 'Demo.jsx',
      extraFiles: { 'helper.js': { source: 'export const a = 1;' } },
    };

    const result = applyVariantTransform(variant, 'js', fakeApply);

    expect(result.source).to.equal('const x = 1;');
    expect(result.fileName).to.equal('Demo.jsx');
    const helper = result.extraFiles!['helper.js'];
    expect(typeof helper === 'object' && helper.source).to.equal('export const a = 1;');
  });

  it('keeps the original file when the rename would collide with an existing key', () => {
    const variant: VariantCode = {
      source: 'main',
      fileName: 'Demo.tsx',
      transforms: { js: { fileName: 'Demo.jsx', hasDelta: true } },
      extraFiles: {
        'utils.js': { source: 'existing' },
        'utils.ts': {
          source: 'export const a: number = 1;',
          transforms: { js: { fileName: 'utils.js', hasDelta: true } },
        },
      },
    };

    const result = applyVariantTransform(variant, 'js', fakeApply);

    // `utils.js` already exists, so the transformed `utils.ts` keeps its key
    // rather than clobbering it.
    const existing = result.extraFiles!['utils.js'];
    expect(typeof existing === 'object' && existing.source).to.equal('existing');
    expect(result.extraFiles).to.have.property('utils.ts');
  });

  it('does not mutate the repository source while preparing an export', () => {
    const variant: VariantCode = {
      source: 'const value: number = 1;',
      fileName: 'Example.tsx',
      transforms: { js: { fileName: 'Example.jsx', hasDelta: true } },
    };

    applyVariantTransform(variant, 'js', fakeApply);

    expect(variant.source).to.equal('const value: number = 1;');
    expect(variant.fileName).to.equal('Example.tsx');
    expect(variant.transforms).to.have.property('js');
  });

  it('falls back to the original file when a transform fails', () => {
    const variant: VariantCode = {
      source: 'const value: number = 1;',
      fileName: 'Example.tsx',
      transforms: { js: { fileName: 'Example.jsx', hasDelta: true } },
    };
    const failingApply = (() => {
      throw new Error('invalid transform');
    }) as Parameters<typeof applyVariantTransform>[2];

    const result = applyVariantTransform(variant, 'js', failingApply);

    expect(result.source).to.equal(variant.source);
    expect(result.fileName).to.equal(variant.fileName);
  });
});
