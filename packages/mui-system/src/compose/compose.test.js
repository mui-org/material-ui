import { describe, it, expect } from 'vitest';
import compose from './compose';
import style from '../style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

describe('compose', () => {
  it('should compose', () => {
    const palette = compose(textColor, bgcolor);

    expect(palette.filterProps.length).to.equal(2);
    expect(
      palette({
        color: 'red',
        bgcolor: 'gree',
      }),
    ).to.deep.equal({
      backgroundColor: 'gree',
      color: 'red',
    });
  });
});
