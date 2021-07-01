import { expect } from 'chai';
import * as React from 'react';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import { act } from 'react-dom/test-utils';
import { createMount } from 'test/utils';
import { createTheme } from '@material-ui/core/styles';
import createGenerateClassName from '../createGenerateClassName';
import makeStyles from './makeStyles';
import useTheme from '../useTheme';
import StylesProvider from '../StylesProvider';
import ThemeProvider from '../ThemeProvider';

describe('makeStyles', () => {
  // StrictModeViolation: uses `useSynchronousEffect`
  const mount = createMount({ strict: null });

  /**
   * returns a function that given the props for the styles object will return
   * the css classes
   * @param {object} styles argument for `makeStyles`
   */
  function createGetClasses(styles) {
    const useStyles = makeStyles(styles);
    const output = {};

    function TestComponent(props) {
      output.classes = useStyles(props);
      return <div />;
    }

    return function mountWithProps(props) {
      const wrapper = mount(<TestComponent {...props} />);
      output.wrapper = wrapper;
      return output;
    };
  }

  let generateClassName;

  beforeEach(() => {
    generateClassName = createGenerateClassName();
  });

  it('should accept a classes prop', () => {
    const styles = { root: {} };
    const mountWithProps = createGetClasses(styles);
    const output = mountWithProps();
    const baseClasses = output.classes;
    output.wrapper.setProps({
      classes: { root: 'h1' },
    });
    const extendedClasses = output.classes;
    expect(extendedClasses.root).to.equal(`${baseClasses.root} h1`);
  });

  it('should ignore undefined prop', () => {
    const styles = { root: {} };
    const mountWithProps = createGetClasses(styles);
    const output = mountWithProps();
    const baseClasses = output.classes;
    output.wrapper.setProps({
      classes: { root: undefined },
    });
    const extendedClasses = output.classes;
    expect(extendedClasses.root).to.equal(baseClasses.root);
  });

  describe('warnings', () => {
    const mountWithProps = createGetClasses({ root: {} });

    it('should warn if providing a unknown key', () => {
      const output = mountWithProps();

      expect(() => {
        output.wrapper.setProps({ classes: { bar: 'foo' } });
      }).toErrorDev('Material-UI: The key `bar` provided to the classes prop is not implemented');

      const baseClasses = output.classes;
      const extendedClasses = output.classes;
      expect(extendedClasses).to.deep.equal({ root: baseClasses.root, bar: 'undefined foo' });
    });

    it('should warn if providing a string', () => {
      const output = mountWithProps();

      expect(() => {
        output.wrapper.setProps({ classes: 'foo' });
      }).toErrorDev(['You might want to use the className prop instead']);
    });

    it('should warn if providing a non string', () => {
      const output = mountWithProps();
      const baseClasses = output.classes;

      expect(() => {
        output.wrapper.setProps({ classes: { root: {} } });
      }).toErrorDev('Material-UI: The key `root` provided to the classes prop is not valid');

      const extendedClasses = output.classes;
      expect(extendedClasses).to.deep.equal({ root: `${baseClasses.root} [object Object]` });
    });

    it('should warn if missing theme', () => {
      const styles = (theme) => ({ root: { padding: theme.spacing(2) } });
      const mountWithProps2 = createGetClasses(styles);

      expect(() => {
        expect(() => {
          mountWithProps2({});
        }).to.throw('theme.spacing is not a function');
      }).toErrorDev([
        'Material-UI: The `styles` argument provided is invalid.\nYou are providing a function without a theme in the context.',
        'Material-UI: The `styles` argument provided is invalid.\nYou are providing a function without a theme in the context.',
        'Uncaught [TypeError: theme.spacing is not a function',
        'The above error occurred in the <TestComponent> component',
      ]);
    });

    it('should warn but not throw if providing an invalid styles type', () => {
      let mountWithProps2;

      expect(() => {
        mountWithProps2 = createGetClasses(undefined);
      }).toErrorDev(
        'Material-UI: The `styles` argument provided is invalid.\nYou need to provide a function generating the styles or a styles object.',
      );

      expect(() => {
        mountWithProps2({});
      }).not.to.throw();
    });

    it('should warn if the key is not available', () => {
      const theme = {
        components: {
          Test: {
            styleOverrides: {
              foo: {
                margin: '1px',
              },
            },
          },
        },
      };

      const useStyles = makeStyles({ root: { margin: 5, padding: 3 } }, { name: 'Test' });
      function Test() {
        const classes = useStyles();
        return <div className={classes.root} />;
      }

      expect(() => {
        mount(
          <ThemeProvider theme={theme}>
            <Test />
          </ThemeProvider>,
        );
      }).toWarnDev([
        'Material-UI: You are trying to override a style that does not exist.\n' +
          'Fix the `foo` key of `theme.components.Test.styleOverrides`.',
      ]);
    });
  });

  describe('classes memoization', () => {
    let mountWithProps;

    before(() => {
      const styles = { root: {} };
      mountWithProps = createGetClasses(styles);
    });

    it('should recycle with no classes prop', () => {
      const output = mountWithProps();
      const classes1 = output.classes;
      output.wrapper.update();
      const classes2 = output.classes;
      expect(classes1).to.equal(classes2);
    });

    it('should recycle even when a classes prop is provided', () => {
      const inputClasses = { root: 'foo' };
      const output = mountWithProps({ classes: inputClasses });
      const classes1 = output.classes;
      output.wrapper.setProps({
        classes: inputClasses,
      });
      const classes2 = output.classes;
      expect(classes1).to.equal(classes2);
    });

    it('should invalidate the cache', () => {
      const output = mountWithProps();
      const classes = output.classes;
      output.wrapper.setProps({ classes: { root: 'foo' } });
      const classes1 = output.classes;
      expect(classes1).to.deep.equal({
        root: `${classes.root} foo`,
      });

      output.wrapper.setProps({
        classes: { root: 'bar' },
      });
      const classes2 = output.classes;
      expect(classes1).not.to.equal(classes2);
      expect(classes2).to.deep.equal({
        root: `${classes.root} bar`,
      });
    });
  });

  describe('integration', () => {
    let sheetsRegistry;

    beforeEach(() => {
      sheetsRegistry = new SheetsRegistry();
    });

    it('should run lifecycles with no theme', () => {
      const useStyles = makeStyles({ root: { display: 'flex' } });
      const StyledComponent = () => {
        useStyles();
        return <div />;
      };

      const wrapper = mount(
        <ThemeProvider theme={createTheme()}>
          <StylesProvider
            sheetsRegistry={sheetsRegistry}
            sheetsCache={new Map()}
            generateClassName={generateClassName}
          >
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });
      wrapper.update();
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });
      wrapper.setProps({ theme: createTheme() });
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-2' });

      wrapper.unmount();
      expect(sheetsRegistry.registry.length).to.equal(0);
    });

    it('should work when depending on a theme', () => {
      const useStyles = makeStyles((theme) => ({ root: { padding: theme.spacing(1) } }), {
        name: 'MuiTextField',
      });
      const StyledComponent = () => {
        useStyles();
        return <div />;
      };

      const wrapper = mount(
        <ThemeProvider theme={createTheme()}>
          <StylesProvider
            sheetsRegistry={sheetsRegistry}
            sheetsCache={new Map()}
            generateClassName={generateClassName}
          >
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'MuiTextField-root' });

      wrapper.setProps({ theme: createTheme({ foo: 'bar' }) });
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'MuiTextField-root' });
    });

    describe('styleOverrides', () => {
      it('should support the styleOverrides key inside components', () => {
        const useStyles = makeStyles(
          {
            root: {
              padding: 8,
              margin: [1, 3],
            },
          },
          {
            name: 'MuiTextField',
          },
        );
        const StyledComponent = () => {
          useStyles();
          return <div />;
        };

        mount(
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiTextField: {
                  styleOverrides: {
                    root: {
                      padding: 9,
                      margin: [2, 2, 3],
                    },
                  },
                },
              },
            })}
          >
            <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
              <StyledComponent />
            </StylesProvider>
          </ThemeProvider>,
        );
        expect(sheetsRegistry.registry.length).to.equal(1);
        expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({
          root: { padding: 9, margin: [2, 2, 3] },
        });
      });

      it('can be used to remove styles', () => {
        const theme = {
          components: {
            Test: {
              styleOverrides: {
                root: {
                  margin: null,
                },
              },
            },
          },
        };

        const useStyles = makeStyles({ root: { margin: 5, padding: 3 } }, { name: 'Test' });
        function Test() {
          const classes = useStyles();
          return <div className={classes.root} />;
        }

        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
              <Test />
            </StylesProvider>
          </ThemeProvider>,
        );

        const div = wrapper.find('div').instance();
        expect(sheetsRegistry.registry.length).to.equal(1);
        expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({
          root: { margin: null, padding: 3 },
        });
      });
    });

    it('should handle dynamic props', () => {
      const useStyles = makeStyles({
        root: (props) => ({ margin: 8, padding: props.padding || 8 }),
      });
      const StyledComponent = (props) => {
        const classes = useStyles(props);
        return <div className={classes.root} />;
      };

      const Test = (props) => (
        <StylesProvider
          sheetsRegistry={sheetsRegistry}
          sheetsCache={new Map()}
          generateClassName={generateClassName}
        >
          <StyledComponent {...props} />
        </StylesProvider>
      );

      const wrapper = mount(<Test />);
      expect(sheetsRegistry.registry.length).to.equal(2);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });
      expect(sheetsRegistry.registry[1].classes).to.deep.equal({ root: 'makeStyles-root-2' });
      expect(sheetsRegistry.registry[1].rules.map.root.style).to.deep.equal({
        margin: '8px',
        padding: '8px',
      });

      wrapper.setProps({ padding: 4 });
      expect(sheetsRegistry.registry.length).to.equal(2);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });
      expect(sheetsRegistry.registry[1].classes).to.deep.equal({ root: 'makeStyles-root-2' });
      expect(sheetsRegistry.registry[1].rules.map.root.style).to.deep.equal({
        margin: '8px',
        padding: '4px',
      });
    });
  });

  describe('options: disableGeneration', () => {
    it('should not generate the styles', () => {
      const sheetsRegistry = new SheetsRegistry();
      const Empty = () => <div />;
      const useStyles = makeStyles({ root: { padding: 8 } });
      const StyledComponent = () => {
        const classes = useStyles();
        return <Empty classes={classes} />;
      };

      const wrapper = mount(
        <StylesProvider sheetsRegistry={sheetsRegistry} disableGeneration sheetsCache={new Map()}>
          <StyledComponent />
        </StylesProvider>,
      );
      expect(sheetsRegistry.registry.length).to.equal(0);
      expect(wrapper.find(Empty).props().classes).to.deep.equal({});
      wrapper.unmount();
      expect(sheetsRegistry.registry.length).to.equal(0);
    });
  });

  describe('react-hot-loader', () => {
    it('should take the new stylesCreator into account', () => {
      const useStyles1 = makeStyles({ root: { padding: 8 } });
      const useStyles2 = makeStyles({ root: { padding: 4 } });

      let hmr = false;

      const StyledComponent = () => {
        // Simulate react-hot-loader behavior
        /* eslint-disable react-hooks/rules-of-hooks */
        if (hmr) {
          useStyles2();
        } else {
          useStyles1();
        }
        /* eslint-enable react-hooks/rules-of-hooks */

        return <div />;
      };

      const sheetsRegistry = new SheetsRegistry();
      const wrapper = mount(
        <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
          <StyledComponent />
        </StylesProvider>,
      );
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({
        root: { padding: 8 },
      });

      hmr = true;
      wrapper.setProps({});
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({
        root: { padding: 4 },
      });
    });
  });

  describe('classname quality', () => {
    let sheetsRegistry;

    beforeEach(() => {
      sheetsRegistry = new SheetsRegistry();
    });

    it('should use the displayName', () => {
      const useStyles1 = makeStyles({ root: { padding: 8 } });
      const StyledComponent1 = () => {
        useStyles1();
        return <div />;
      };

      const useStyles2 = makeStyles({ root: { padding: 8 } }, { name: 'Fooo' });
      const StyledComponent2 = () => {
        useStyles2();
        return <div />;
      };

      mount(
        <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
          <StyledComponent1 />
          <StyledComponent2 />
        </StylesProvider>,
      );
      expect(sheetsRegistry.registry[0].options.classNamePrefix).to.equal('makeStyles');
      expect(sheetsRegistry.registry[0].options.name).to.equal(undefined);
      expect(sheetsRegistry.registry[1].options.classNamePrefix).to.equal('Fooo');
      expect(sheetsRegistry.registry[1].options.name).to.equal('Fooo');
    });
  });

  describe('stress test', () => {
    let StressTest;

    before(() => {
      const useStyles = makeStyles((theme) => ({
        root: (props) => ({
          backgroundColor: props.backgroundColor,
          color: theme.color,
        }),
      }));

      const Component = React.memo((props) => {
        const classes = useStyles(props);
        const theme = useTheme();

        const rendered = React.useRef(1);
        React.useEffect(() => {
          rendered.current += 1;
        });

        return (
          <div className={classes.root}>
            rendered {rendered.current} times
            <br />
            backgroundColor: {props.backgroundColor}
            <br />
            color: {theme.color}
          </div>
        );
      });

      Component.propTypes = {
        backgroundColor: PropTypes.string.isRequired,
      };

      StressTest = () => {
        const [backgroundColor, setBackgroundColor] = React.useState('black');
        const handleBackgroundColorChange = (event) => {
          setBackgroundColor(event.target.value);
        };

        const [color, setColor] = React.useState('white');
        const handleColorChange = (event) => {
          setColor(event.target.value);
        };

        const theme = React.useMemo(() => ({ color }), [color]);

        return (
          <ThemeProvider theme={theme}>
            <fieldset>
              <div>Color in theme, background-color in props</div>
              <label htmlFor="background-color">background-color</label>
              <input
                id="background-color"
                onChange={handleBackgroundColorChange}
                value={backgroundColor}
              />
              <label htmlFor="color">color</label>
              <input id="color" onChange={handleColorChange} value={color} />
            </fieldset>
            <Component backgroundColor={backgroundColor} />
          </ThemeProvider>
        );
      };
    });

    it('should update like expected', () => {
      const sheetsRegistry = new SheetsRegistry();

      const wrapper = mount(
        <StylesProvider
          sheetsRegistry={sheetsRegistry}
          sheetsCache={new Map()}
          generateClassName={generateClassName}
        >
          <StressTest />
        </StylesProvider>,
      );
      expect(sheetsRegistry.registry.length).to.equal(2);
      expect(sheetsRegistry.toString()).to.equal(`.makeStyles-root-2 {
  color: white;
  background-color: black;
}`);

      act(() => {
        wrapper.find('#color').simulate('change', { target: { value: 'blue' } });
      });
      expect(sheetsRegistry.toString()).to.equal(
        `.makeStyles-root-4 {
  color: blue;
  background-color: black;
}`,
      );
      act(() => {
        wrapper.find('#background-color').simulate('change', { target: { value: 'green' } });
      });
      expect(sheetsRegistry.toString()).to.equal(
        `.makeStyles-root-4 {
  color: blue;
  background-color: green;
}`,
      );
    });
  });
});
