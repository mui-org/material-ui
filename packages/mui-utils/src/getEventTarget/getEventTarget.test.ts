import { describe, it, expect } from 'vitest';
import getEventTarget from './getEventTarget';

describe('getEventTarget', () => {
  it('should return the event target for a regular DOM event', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);

    let capturedTarget: EventTarget | null = null;
    button.addEventListener('click', (event) => {
      capturedTarget = getEventTarget(event);
    });
    button.click();

    expect(capturedTarget).to.equal(button);

    document.body.removeChild(button);
  });

  it('should return the actual target inside an open shadow root', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });

    const button = document.createElement('button');
    shadowRoot.appendChild(button);

    let capturedTarget: EventTarget | null = null;
    // Listen on the host (outside the shadow root)
    host.addEventListener('click', (event) => {
      capturedTarget = getEventTarget(event);
    });
    button.click();

    // composedPath()[0] gives us the actual button, not the host
    expect(capturedTarget).to.equal(button);

    document.body.removeChild(host);
  });

  it('should return null for an event with no composedPath and no target', () => {
    const event = new Event('custom');
    // event.target is null before dispatch
    expect(getEventTarget(event)).to.equal(null);
  });
});
