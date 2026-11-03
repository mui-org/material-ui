import { describe, it, expect } from 'vitest';
import createBreakpoints from './createBreakpoints';

describe('createBreakpoints', () => {
  const breakpoints = createBreakpoints({});
  const customBreakpoints = createBreakpoints({
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  });

  it('should sort the values', () => {
    const orderedValues = createBreakpoints({
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
      },
    });

    const unorderedValues = createBreakpoints({
      values: {
        tablet: 640,
        mobile: 0,
        laptop: 1024,
        desktop: 1280,
      },
    });

    expect(unorderedValues.keys).to.deep.equal(orderedValues.keys);
    expect(unorderedValues.values).to.deep.equal(orderedValues.values);
  });

  describe('up', () => {
    it('should work for xs', () => {
      expect(breakpoints.up('xs')).to.equal('@media (min-width:0px)');
    });

    it('should work for md', () => {
      expect(breakpoints.up('md')).to.equal('@media (min-width:900px)');
    });

    it('should work for custom breakpoints', () => {
      expect(customBreakpoints.up('laptop')).to.equal('@media (min-width:1024px)');
    });
  });

  describe('down', () => {
    it('should work', () => {
      expect(breakpoints.down('sm')).to.equal('@media (max-width:599.95px)');
    });

    it('should work for md', () => {
      expect(breakpoints.down('md')).to.equal('@media (max-width:899.95px)');
    });

    it('should work for xs', () => {
      expect(breakpoints.down('xs')).to.equal('@media (max-width:-0.05px)');
    });

    it('should accept a number', () => {
      expect(breakpoints.down(600)).to.equal('@media (max-width:599.95px)');
    });

    it('should work for xl', () => {
      expect(breakpoints.down('xl')).to.equal('@media (max-width:1535.95px)');
    });

    it('should work for custom breakpoints', () => {
      expect(customBreakpoints.down('laptop')).to.equal('@media (max-width:1023.95px)');
    });

    it('should work for the largest of custom breakpoints', () => {
      expect(customBreakpoints.down('desktop')).to.equal('@media (max-width:1279.95px)');
    });
  });

  describe('between', () => {
    it('should work', () => {
      expect(breakpoints.between('sm', 'md')).to.equal(
        '@media (min-width:600px) and (max-width:899.95px)',
      );
    });

    it('should accept numbers', () => {
      expect(breakpoints.between(600, 800)).to.equal(
        '@media (min-width:600px) and (max-width:799.95px)',
      );
    });

    it('should work on largest breakpoints', () => {
      expect(breakpoints.between('lg', 'xl')).to.equal(
        '@media (min-width:1200px) and (max-width:1535.95px)',
      );
    });

    it('should work for custom breakpoints', () => {
      expect(customBreakpoints.between('tablet', 'laptop')).to.equal(
        '@media (min-width:640px) and (max-width:1023.95px)',
      );
    });
  });

  describe('only', () => {
    it('should work', () => {
      expect(breakpoints.only('md')).to.equal('@media (min-width:900px) and (max-width:1199.95px)');
    });

    it('on xl should call up', () => {
      expect(breakpoints.only('xl')).to.equal('@media (min-width:1536px)');
    });

    it('should work for custom breakpoints', () => {
      expect(customBreakpoints.only('tablet')).to.equal(
        '@media (min-width:640px) and (max-width:1023.95px)',
      );
    });
  });

  describe('not', () => {
    it('should work', () => {
      expect(breakpoints.not('md')).to.equal(
        '@media not all and (min-width:900px) and (max-width:1199.95px)',
      );
    });

    it('should invert up for xl', () => {
      expect(breakpoints.not('xl')).to.equal('@media (max-width:1535.95px)');
    });

    it('should invert down for xs', () => {
      expect(breakpoints.not('xs')).to.equal('@media (min-width:600px)');
    });

    it('should work for custom breakpoints', () => {
      expect(customBreakpoints.not('tablet')).to.equal(
        '@media not all and (min-width:640px) and (max-width:1023.95px)',
      );
    });
  });
});
