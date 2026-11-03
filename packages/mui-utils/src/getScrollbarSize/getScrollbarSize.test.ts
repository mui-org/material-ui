import { describe, beforeEach, afterEach, expect, it } from 'vitest';
import { isJsdom } from '@mui/internal-test-utils/env';
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

  it.skipIf(isJsdom() || !/WebKit/.test(window.navigator.userAgent))(
    'should return correct value when using a custom scrollbar',
    function test() {
      styleElement.textContent = `
      ::-webkit-scrollbar {
        width: 5px;
      }
    `;
      document.head.appendChild(styleElement);
      divElement.style.height = '2000px';
      document.body.appendChild(divElement);
      expect(getScrollbarSize(window)).to.equal(5);
    },
  );
});
