import { describe, it, expect } from 'vitest';
import sinon from 'sinon';
import createSpacing from '../createTheme/createSpacing';
import createBreakpoints from '../createBreakpoints/createBreakpoints';
import {
  generateGridStyles,
  generateGridSizeStyles,
  generateGridColumnsStyles,
  generateGridRowSpacingStyles,
  generateGridColumnSpacingStyles,
  generateGridOffsetStyles,
  generateSizeClassNames,
  generateSpacingClassNames,
  generateDirectionClasses,
} from './gridGenerator';

const spacing = createSpacing();
const breakpoints = createBreakpoints({});

describe('grid generator', () => {
  describe('generateGridStyles', () => {
    it('root container', () => {
      const result = generateGridStyles({ ownerState: { container: true, unstable_level: 0 } });
      expect(result).to.deep.equal({
        minWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--Grid-rowSpacing) var(--Grid-columnSpacing)',
      });
    });

    it('nested container level 1', () => {
      const result = generateGridStyles({ ownerState: { container: true, unstable_level: 1 } });
      sinon.assert.match(result, {
        gap: `var(--Grid-rowSpacing) var(--Grid-columnSpacing)`,
      });
    });

    it('nested container level 2', () => {
      const result = generateGridStyles({ ownerState: { container: true, unstable_level: 2 } });
      sinon.assert.match(result, {
        gap: `var(--Grid-rowSpacing) var(--Grid-columnSpacing)`,
      });
    });

    it('item', () => {
      const result = generateGridStyles({ ownerState: { container: false, unstable_level: 1 } });
      expect(result).to.deep.equal({
        minWidth: 0,
        boxSizing: 'border-box',
      });
    });
  });

  describe('generateGridSizeStyles', () => {
    it('works with supported format', () => {
      expect(
        generateGridSizeStyles({
          theme: { breakpoints },
          ownerState: {
            size: {
              xs: 'auto',
              sm: 6,
              md: 'grow',
              lg: 4,
              xl: 'auto',
            },
            // should not consider other props
            rowSpacing: 1,
            columnSpacing: { xs: 1, sm: 2 },
          },
        }),
      ).to.deep.equal({
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: 'none',
        width: 'auto',
        '@media (min-width:600px)': {
          flexBasis: 'auto',
          flexGrow: 0,
          width: `calc(100% * 6 / var(--Grid-parent-columns) - (var(--Grid-parent-columns) - 6) * (var(--Grid-parent-columnSpacing) / var(--Grid-parent-columns)))`,
        },
        '@media (min-width:900px)': {
          flexBasis: 0,
          flexGrow: 1,
          maxWidth: '100%',
        },
        '@media (min-width:1200px)': {
          flexBasis: 'auto',
          flexGrow: 0,
          width: `calc(100% * 4 / var(--Grid-parent-columns) - (var(--Grid-parent-columns) - 4) * (var(--Grid-parent-columnSpacing) / var(--Grid-parent-columns)))`,
        },
        '@media (min-width:1536px)': {
          flexBasis: 'auto',
          flexGrow: 0,
          flexShrink: 0,
          maxWidth: 'none',
          width: 'auto',
        },
      });
    });
  });

  describe('generateGridColumnsStyles', () => {
    it('supports number', () => {
      expect(
        generateGridColumnsStyles({
          theme: { breakpoints },
          ownerState: { container: true, columns: 16 },
        }),
      ).to.deep.equal({
        '--Grid-columns': 16,
        '> *': {
          '--Grid-parent-columns': 16,
        },
      });
    });

    it('supports responsive', () => {
      expect(
        generateGridColumnsStyles({
          theme: { breakpoints },
          ownerState: { container: true, columns: { xs: 6, sm: 8, md: 12, lg: 16 } },
        }),
      ).to.deep.equal({
        '--Grid-columns': 6,
        '> *': {
          '--Grid-parent-columns': 6,
        },
        '@media (min-width:600px)': {
          '--Grid-columns': 8,
          '> *': {
            '--Grid-parent-columns': 8,
          },
        },
        '@media (min-width:900px)': {
          '--Grid-columns': 12,
          '> *': {
            '--Grid-parent-columns': 12,
          },
        },
        '@media (min-width:1200px)': {
          '--Grid-columns': 16,
          '> *': {
            '--Grid-parent-columns': 16,
          },
        },
      });
    });

    it('has default of 12 if the smallest breakpoint is not specified', () => {
      expect(
        generateGridColumnsStyles({
          theme: { breakpoints },
          ownerState: { container: true, columns: { lg: 16 } },
        }),
      ).to.deep.equal({
        '--Grid-columns': 12,
        '@media (min-width:1200px)': {
          '--Grid-columns': 16,
          '> *': {
            '--Grid-parent-columns': 16,
          },
        },
      });
    });
  });

  describe('generateGridRowSpacingStyles', () => {
    it('supports number', () => {
      expect(
        generateGridRowSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, rowSpacing: 2 },
        }),
      ).to.deep.equal({
        '--Grid-rowSpacing': '16px',
        '> *': {
          '--Grid-parent-rowSpacing': '16px',
        },
      });
    });

    it('supports string', () => {
      expect(
        generateGridRowSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, rowSpacing: '1rem' },
        }),
      ).to.deep.equal({
        '--Grid-rowSpacing': '1rem',
        '> *': {
          '--Grid-parent-rowSpacing': '1rem',
        },
      });
    });

    it('supports responsive', () => {
      expect(
        generateGridRowSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, rowSpacing: { xs: 2, md: 3, xl: 0 } },
        }),
      ).to.deep.equal({
        '--Grid-rowSpacing': '16px',
        '> *': {
          '--Grid-parent-rowSpacing': '16px',
        },
        '@media (min-width:900px)': {
          '--Grid-rowSpacing': '24px',
          '> *': {
            '--Grid-parent-rowSpacing': '24px',
          },
        },
        '@media (min-width:1536px)': {
          '--Grid-rowSpacing': '0px',
          '> *': {
            '--Grid-parent-rowSpacing': '0px',
          },
        },
      });

      expect(
        generateGridRowSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, rowSpacing: { xs: 0, md: 2, xl: 0 } },
        }),
      ).to.deep.equal({
        '--Grid-rowSpacing': '0px',
        '> *': {
          '--Grid-parent-rowSpacing': '0px',
        },
        '@media (min-width:900px)': {
          '--Grid-rowSpacing': '16px',
          '> *': {
            '--Grid-parent-rowSpacing': '16px',
          },
        },
        '@media (min-width:1536px)': {
          '--Grid-rowSpacing': '0px',
          '> *': {
            '--Grid-parent-rowSpacing': '0px',
          },
        },
      });
    });
  });

  describe('generateGridColumnSpacingStyles', () => {
    it('supports number', () => {
      expect(
        generateGridColumnSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, columnSpacing: 2 },
        }),
      ).to.deep.equal({
        '--Grid-columnSpacing': '16px',
        '> *': {
          '--Grid-parent-columnSpacing': '16px',
        },
      });
    });

    it('supports string', () => {
      expect(
        generateGridColumnSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, columnSpacing: '1rem' },
        }),
      ).to.deep.equal({
        '--Grid-columnSpacing': '1rem',
        '> *': {
          '--Grid-parent-columnSpacing': '1rem',
        },
      });
    });

    it('supports responsive', () => {
      expect(
        generateGridColumnSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, columnSpacing: { xs: 2, md: 3, xl: 0 } },
        }),
      ).to.deep.equal({
        '--Grid-columnSpacing': '16px',
        '> *': {
          '--Grid-parent-columnSpacing': '16px',
        },
        '@media (min-width:900px)': {
          '--Grid-columnSpacing': '24px',
          '> *': {
            '--Grid-parent-columnSpacing': '24px',
          },
        },
        '@media (min-width:1536px)': {
          '--Grid-columnSpacing': '0px',
          '> *': {
            '--Grid-parent-columnSpacing': '0px',
          },
        },
      });

      expect(
        generateGridColumnSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, columnSpacing: { xs: 0, md: 2, xl: 0 } },
        }),
      ).to.deep.equal({
        '--Grid-columnSpacing': '0px',
        '> *': {
          '--Grid-parent-columnSpacing': '0px',
        },
        '@media (min-width:900px)': {
          '--Grid-columnSpacing': '16px',
          '> *': {
            '--Grid-parent-columnSpacing': '16px',
          },
        },
        '@media (min-width:1536px)': {
          '--Grid-columnSpacing': '0px',
          '> *': {
            '--Grid-parent-columnSpacing': '0px',
          },
        },
      });
    });
  });

  describe('generateGridOffsetStyles', () => {
    it('supports responsive object', () => {
      expect(
        generateGridOffsetStyles({
          theme: { breakpoints, spacing },
          ownerState: { offset: { xs: 0, md: 5, lg: 'auto' } },
        }),
      ).to.deep.equal({
        marginLeft: '0px',
        '@media (min-width:900px)': {
          marginLeft: `calc(100% * 5 / var(--Grid-parent-columns) + var(--Grid-parent-columnSpacing) * 5 / var(--Grid-parent-columns))`,
        },
        '@media (min-width:1200px)': {
          marginLeft: `auto`,
        },
      });
    });
  });

  describe('class names', () => {
    it('should generate correct grid size class names', () => {
      expect(
        generateSizeClassNames({
          xs: 'auto',
          sm: 4,
          md: false,
          lg: undefined,
          xl: true,
        }),
      ).to.deep.equal(['grid-xs-auto', 'grid-sm-4', 'grid-xl-true']);
    });

    it('should generate correct spacing class names', () => {
      expect(generateSpacingClassNames()).to.deep.equal([]);
      expect(generateSpacingClassNames([0, 1])).to.deep.equal([]);

      expect(generateSpacingClassNames(2)).to.deep.equal(['spacing-xs-2']);
      expect(
        generateSpacingClassNames({
          xs: 0,
          sm: 2,
          lg: 4,
          xl: '1rem', // should not appear in class name
        }),
      ).to.deep.equal(['spacing-sm-2', 'spacing-lg-4']);
    });

    it('should work with any breakpoint', () => {
      expect(
        generateSizeClassNames({
          mobile: 'auto',
          tablet: 4,
        }),
      ).to.deep.equal(['grid-mobile-auto', 'grid-tablet-4']);

      expect(generateSpacingClassNames(2, 'mobile')).to.deep.equal(['spacing-mobile-2']);

      expect(
        generateSpacingClassNames({
          mobile: 3,
          tablet: 4,
        }),
      ).to.deep.equal(['spacing-mobile-3', 'spacing-tablet-4']);
    });
  });

  describe('generateDirectionClasses', () => {
    it('should generate correct direction class names', () => {
      expect(generateDirectionClasses()).to.deep.equal([]);
      expect(generateDirectionClasses('row')).to.deep.equal(['direction-xs-row']);
      expect(generateDirectionClasses('column')).to.deep.equal(['direction-xs-column']);
      expect(
        generateDirectionClasses({
          xs: 'row',
          sm: 'column',
          md: 'row',
        }),
      ).to.deep.equal(['direction-xs-row', 'direction-sm-column', 'direction-md-row']);
    });
  });
});
