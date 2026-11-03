import { describe, it, expect } from 'vitest';
import styled from './index';

describe('styled', () => {
  it('should help debug wrong args', () => {
    expect(() => {
      styled('span')();
    }).toErrorDev('MUI: Seems like you called `styled("span")()` without a `style` argument');

    expect(() => {
      styled('span')(undefined, { color: 'red' });
    }).toErrorDev('MUI: the styled("span")(...args) API requires all its args to be defined');
  });
});
