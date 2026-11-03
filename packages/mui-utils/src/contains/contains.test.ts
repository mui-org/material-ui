import { describe, it, expect } from 'vitest';
import contains from './contains';

describe('contains', () => {
  it('should return false when parent is null', () => {
    const child = document.createElement('div');
    expect(contains(null, child)).to.equal(false);
  });

  it('should return false when child is null', () => {
    const parent = document.createElement('div');
    expect(contains(parent, null)).to.equal(false);
  });

  it('should return true for direct parent-child relationship', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(contains(parent, child)).to.equal(true);

    document.body.removeChild(parent);
  });

  it('should return true for deeply nested descendants', () => {
    const parent = document.createElement('div');
    const middle = document.createElement('div');
    const child = document.createElement('span');
    parent.appendChild(middle);
    middle.appendChild(child);
    document.body.appendChild(parent);

    expect(contains(parent, child)).to.equal(true);

    document.body.removeChild(parent);
  });

  it('should return false when elements are not related', () => {
    const a = document.createElement('div');
    const b = document.createElement('div');
    document.body.appendChild(a);
    document.body.appendChild(b);

    expect(contains(a, b)).to.equal(false);

    document.body.removeChild(a);
    document.body.removeChild(b);
  });

  it('should return true when child is inside an open shadow root of a descendant', () => {
    const parent = document.createElement('div');
    const host = document.createElement('div');
    parent.appendChild(host);
    document.body.appendChild(parent);

    const shadowRoot = host.attachShadow({ mode: 'open' });
    const child = document.createElement('button');
    shadowRoot.appendChild(child);

    // Native contains returns false across shadow boundaries
    expect(parent.contains(child)).to.equal(false);
    // Our contains traverses shadow roots
    expect(contains(parent, child)).to.equal(true);

    document.body.removeChild(parent);
  });

  it('should return true when child is inside a closed shadow root of a descendant', () => {
    const parent = document.createElement('div');
    const host = document.createElement('div');
    parent.appendChild(host);
    document.body.appendChild(parent);

    const shadowRoot = host.attachShadow({ mode: 'closed' });
    const child = document.createElement('button');
    shadowRoot.appendChild(child);

    // Native contains returns false across shadow boundaries
    expect(parent.contains(child)).to.equal(false);
    // Our contains traverses shadow roots
    expect(contains(parent, child)).to.equal(true);

    document.body.removeChild(parent);
  });

  it('should return true when child is inside nested shadow roots', () => {
    const parent = document.createElement('div');
    const outerHost = document.createElement('div');
    parent.appendChild(outerHost);
    document.body.appendChild(parent);

    const outerShadow = outerHost.attachShadow({ mode: 'open' });
    const innerHost = document.createElement('div');
    outerShadow.appendChild(innerHost);

    const innerShadow = innerHost.attachShadow({ mode: 'open' });
    const child = document.createElement('button');
    innerShadow.appendChild(child);

    expect(contains(parent, child)).to.equal(true);

    document.body.removeChild(parent);
  });

  it('should return true when parent and child are the same element', () => {
    const element = document.createElement('div');
    expect(contains(element, element)).to.equal(true);
  });
});
