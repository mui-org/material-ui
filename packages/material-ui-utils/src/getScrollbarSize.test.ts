import { expect } from 'chai';
import getScrollbarSize from './getScrollbarSize';

describe('getScrollbarSize', () => {
  let styleElement: HTMLElement;
  let divElement: HTMLElement;

  beforeEach(() => {
    styleElement = document.createElement('style');
    divElement = document.createElement('div');
  });

  afterEach(() => {
    styleElement.parentElement?.removeChild(styleElement);
    divElement.parentElement?.removeChild(divElement);
  });

  it('should return correct value when using a custom scrollbar', function test() {
    if (/jsdom/.test(window.navigator.userAgent) || !/WebKit/.test(window.navigator.userAgent)) {
      this.skip();
    }

    styleElement.textContent = `
      ::-webkit-scrollbar {
        width: 5px;
      }
    `;
    document.head.appendChild(styleElement);
    divElement.style.height = '2000px';
    document.body.appendChild(divElement);
    expect(getScrollbarSize(document)).to.equal(5);
  });
});
