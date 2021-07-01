import { expect } from 'chai';
import defaultTheme from '@material-ui/core/styles/defaultTheme';
import adaptV4Theme from './adaptV4Theme';

describe('adaptV4Theme', () => {
  describe('theme.components', () => {
    it("moves props to components' defaultProps", () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(
        theme.props.MuiButton,
      );
    });

    it("moves overrides to components' styleOverrides", () => {
      const theme = {
        overrides: {
          MuiTable: {
            root: {
              background: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.components.MuiTable.styleOverrides).to.deep.equal(
        theme.overrides.MuiTable,
      );
    });

    it('moves props, and overrides to components', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
        },
        overrides: {
          MuiTable: {
            root: {
              background: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(
        theme.props.MuiButton,
      );
      expect(transformedTheme.components.MuiTable.styleOverrides).to.deep.equal(
        theme.overrides.MuiTable,
      );
    });

    it('merges props and overrides to components', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
        },
        overrides: {
          MuiButton: {
            root: {
              background: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(
        theme.props.MuiButton,
      );
      expect(transformedTheme.components.MuiButton.styleOverrides).to.deep.equal(
        theme.overrides.MuiButton,
      );
    });

    it('merges props and overrides from different components in appropriate key', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
          MuiFab: {
            color: 'primary',
          },
        },
        overrides: {
          MuiButton: {
            root: {
              background: 'red',
            },
          },
          MuiFab: {
            root: {
              color: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(
        theme.props.MuiButton,
      );
      expect(transformedTheme.components.MuiButton.styleOverrides).to.deep.equal(
        theme.overrides.MuiButton,
      );

      expect(transformedTheme.components.MuiFab.defaultProps).to.deep.equal(theme.props.MuiFab);
      expect(transformedTheme.components.MuiFab.styleOverrides).to.deep.equal(
        theme.overrides.MuiFab,
      );
    });

    it('merges partially migrated props and overrides from different components in appropriate key', () => {
      const theme = {
        defaultProps: {
          MuiButton: {
            disabled: true,
          },
          MuiFab: {
            color: 'primary',
          },
        },
        styleOverrides: {
          MuiButton: {
            root: {
              background: 'red',
            },
          },
          MuiFab: {
            root: {
              color: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.components.MuiButton.defaultProps).to.deep.equal(
        theme.defaultProps.MuiButton,
      );
      expect(transformedTheme.components.MuiButton.styleOverrides).to.deep.equal(
        theme.styleOverrides.MuiButton,
      );

      expect(transformedTheme.components.MuiFab.defaultProps).to.deep.equal(
        theme.defaultProps.MuiFab,
      );
      expect(transformedTheme.components.MuiFab.styleOverrides).to.deep.equal(
        theme.styleOverrides.MuiFab,
      );
    });
  });

  describe('theme.mixins.gutters()', () => {
    it('is added to the theme', () => {
      const defaultSpacing = 8;
      const theme = {};

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.mixins.gutters()).to.deep.equal({
        paddingLeft: defaultSpacing * 2,
        paddingRight: defaultSpacing * 2,
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          paddingLeft: defaultSpacing * 3,
          paddingRight: defaultSpacing * 3,
        },
      });
    });

    it('respects theme spacing', () => {
      const spacing = 100;
      const theme = { spacing };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.mixins.gutters()).to.deep.equal({
        paddingLeft: spacing * 2,
        paddingRight: spacing * 2,
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          paddingLeft: spacing * 3,
          paddingRight: spacing * 3,
        },
      });
    });

    it('does not remove the mixins defined in the input theme', () => {
      const defaultSpacing = 8;
      const theme = {
        mixins: {
          test: { display: 'block' },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.mixins.test).to.deep.equal({
        display: 'block',
      });

      expect(transformedTheme.mixins.gutters()).to.deep.equal({
        paddingLeft: defaultSpacing * 2,
        paddingRight: defaultSpacing * 2,
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          paddingLeft: defaultSpacing * 3,
          paddingRight: defaultSpacing * 3,
        },
      });
    });
  });

  describe('theme.palette.text.hint', () => {
    it('is added to the theme', () => {
      const theme = {};

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.palette.text.hint).to.equal('rgba(0, 0, 0, 0.38)');
    });

    it('is added to a dark theme using the old palette.type value', () => {
      const theme = { palette: { type: 'dark' } };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.palette.text.hint).to.equal('rgba(255, 255, 255, 0.5)');
    });

    it('is added to a dark theme', () => {
      const theme = { palette: { mode: 'dark' } };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.palette.text.hint).to.equal('rgba(255, 255, 255, 0.5)');
    });
  });

  describe('theme.palette.mode', () => {
    it('converts theme.palette.type to theme.palette.mode', () => {
      const theme = { palette: { type: 'dark' } };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.palette.mode).to.equal('dark');
    });
  });

  describe('theme.spacing', () => {
    it('does not add units to returned value for a single argument', () => {
      const theme = {};

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).toWarnDev(['adaptV4Theme() is deprecated']);

      expect(transformedTheme.spacing()).to.equal(8);
      expect(transformedTheme.spacing(2)).to.equal(16);
    });
  });
});
