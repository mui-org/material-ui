import { describe, it, expect } from 'vitest';
import { stub } from 'sinon';
import getActiveElement from './getActiveElement';

describe('getActiveElement', () => {
  it('should return the active element from document', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();

    const activeElement = getActiveElement(document);
    expect(activeElement).to.equal(button);

    document.body.removeChild(button);
  });

  it('should return null when no element has focus', () => {
    const activeElementStub = stub(document, 'activeElement').get(() => null);

    const activeElement = getActiveElement(document);
    expect(activeElement).to.equal(null);

    activeElementStub.restore();
  });

  it('should traverse shadow roots to find the actual focused element', () => {
    // Create a shadow host
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });

    // Create an element inside the shadow root
    const button = document.createElement('button');
    shadowRoot.appendChild(button);
    button.focus();

    // document.activeElement should point to the host
    expect(document.activeElement).to.equal(host);

    // getActiveElement should traverse into the shadow root
    const activeElement = getActiveElement(document);
    expect(activeElement).to.equal(button);

    document.body.removeChild(host);
  });

  it('should handle nested shadow roots', () => {
    // Create outer shadow host
    const outerHost = document.createElement('div');
    document.body.appendChild(outerHost);
    const outerShadowRoot = outerHost.attachShadow({ mode: 'open' });

    // Create inner shadow host inside outer shadow root
    const innerHost = document.createElement('div');
    outerShadowRoot.appendChild(innerHost);
    const innerShadowRoot = innerHost.attachShadow({ mode: 'open' });

    // Create a button inside the inner shadow root
    const button = document.createElement('button');
    innerShadowRoot.appendChild(button);
    button.focus();

    // document.activeElement should point to the outer host
    expect(document.activeElement).to.equal(outerHost);

    // getActiveElement should traverse through both shadow roots
    const activeElement = getActiveElement(document);
    expect(activeElement).to.equal(button);

    document.body.removeChild(outerHost);
  });

  it('should return the element inside shadow root when it has focus', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });

    const button = document.createElement('button');
    shadowRoot.appendChild(button);
    button.focus();

    const activeElement = getActiveElement(document);
    expect(activeElement).to.equal(button);

    document.body.removeChild(host);
  });

  it('should work when starting from a shadow root', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });

    const button = document.createElement('button');
    shadowRoot.appendChild(button);
    button.focus();

    // When called with the shadow root directly
    const activeElement = getActiveElement(shadowRoot);
    expect(activeElement).to.equal(button);

    document.body.removeChild(host);
  });

  it('should handle shadow root with null activeElement', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });

    const activeElementStub = stub(shadowRoot, 'activeElement').get(() => null);

    const activeElement = getActiveElement(shadowRoot);
    expect(activeElement).to.equal(null);

    activeElementStub.restore();
    document.body.removeChild(host);
  });
});
