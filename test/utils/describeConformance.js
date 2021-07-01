/* eslint-env mocha */
import { expect } from 'chai';
import * as React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import createMount from './createMount';
import findOutermostIntrinsic from './findOutermostIntrinsic';

/**
 * @param {object} node
 * @returns
 */
function assertDOMNode(node) {
  // duck typing a DOM node
  expect(typeof node.nodeName).to.equal('string');
}

/**
 * Utility method to make assertions about the ref on an element
 * @param {React.ReactElement} element - The element should have a component wrapped
 *                                       in withStyles as the root
 * @param {(node: React.ReactNode) => import('enzyme').ReactWrapper} mount - Should be returnvalue of createMount
 * @param {(instance: unknown, wrapper: import('enzyme').ReactWrapper) => void} onRef - Asserts that the ref is a DOM node by default
 */
function testRef(element, mount, onRef = assertDOMNode) {
  const ref = React.createRef();
  const wrapper = mount(<React.Fragment>{React.cloneElement(element, { ref })}</React.Fragment>);
  onRef(ref.current, wrapper);
}

/**
 * Glossary
 * - root component:
 *   - renders the outermost host component
 *   - has the `root` class if the component has one
 *   - excess props are spread to this component
 *   - has the type of `inheritComponent`
 */

/**
 * Returns the component with the same constructor as `component` that renders
 * the outermost host
 * @param {import('enzyme').ReactWrapper} wrapper
 * @param {object} options
 * @param {import('react').ElementType} options.component
 */
export function findRootComponent(wrapper, { component }) {
  const outermostHostElement = findOutermostIntrinsic(wrapper).getElement();

  return wrapper.find(component).filterWhere((componentWrapper) => {
    return componentWrapper.contains(outermostHostElement);
  });
}

function randomStringValue() {
  return `s${Math.random().toString(36).slice(2)}`;
}

/**
 * Material-UI components have a `className` prop. The `className` is applied to
 * the root component.
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testClassName(element, getOptions) {
  it('applies the className to the root component', () => {
    const { mount } = getOptions();
    const className = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { className }));

    expect(findOutermostIntrinsic(wrapper).instance()).to.have.class(className);
  });
}

/**
 * Material-UI components have a `component` prop that allows rendering a different
 * Component from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testComponentProp(element, getOptions) {
  describe('prop: component', () => {
    it('can render another root component with the `component` prop', () => {
      const { mount, testComponentPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { component }));

      expect(findRootComponent(wrapper, { component }).exists()).to.equal(true);
    });
  });
}

/**
 * Material-UI components can spread additional props to a documented component.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testPropsSpread(element, getOptions) {
  it(`spreads props to the root component`, () => {
    // type def in ConformanceOptions
    const { inheritComponent, mount } = getOptions();
    if (inheritComponent === undefined) {
      throw new TypeError(
        'Unable to test props spread without `inheritComponent`. Either skip the test or pass a React element type.',
      );
    }

    const testProp = 'data-test-props-spread';
    const value = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { [testProp]: value }));
    const root = findRootComponent(wrapper, { component: inheritComponent });

    expect(root.props()).to.have.property(testProp, value);
  });
}

/**
 * Tests that the `ref` of a component will return the correct instance
 *
 * This is determined by a given constructor i.e. a React.Component or HTMLElement for
 * components that forward their ref and attach it to a host component.
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function describeRef(element, getOptions) {
  describe('ref', () => {
    it(`attaches the ref`, () => {
      // type def in ConformanceOptions
      const { inheritComponent, mount, refInstanceof } = getOptions();

      testRef(element, mount, (instance, wrapper) => {
        expect(instance).to.be.instanceof(refInstanceof);

        if (inheritComponent !== undefined && instance.nodeType === 1) {
          const rootHost = findOutermostIntrinsic(wrapper);
          expect(instance).to.equal(rootHost.instance());
        }
      });
    });
  });
}

/**
 * Tests that the root component has the root class
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testRootClass(element, getOptions) {
  it('applies the root class to the root component if it has this class', () => {
    const { classes, render } = getOptions();
    if (classes.root == null) {
      return;
    }

    const className = randomStringValue();
    const { container, setProps } = render(React.cloneElement(element, { className }));

    // we established that the root component renders the outermost host previously. We immediately
    // jump to the host component because some components pass the `root` class
    // to the `classes` prop of the root component.
    // https://github.com/mui-org/material-ui/blob/f9896bcd129a1209153106296b3d2487547ba205/packages/material-ui/src/OutlinedInput/OutlinedInput.js#L101
    expect(container.firstChild).to.have.class(className);
    expect(container.firstChild).to.have.class(classes.root);
    expect(document.querySelectorAll(`.${classes.root}`).length).to.equal(1);

    // Test that classes prop works
    setProps({ classes: { ...classes, root: `${classes.root} ${className}` } });
    expect(container.firstChild).to.have.class(className);
    expect(container.firstChild).not.to.have.attribute('classes');
  });
}

/**
 * Tests that the component can be rendered with react-test-renderer.
 * This is important for snapshot testing with Jest (even if we don't encourage it).
 * @param {React.ReactElement} element
 */
export function testReactTestRenderer(element) {
  it('should render without errors in ReactTestRenderer', () => {
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(element, {
        createNodeMock: (node) => {
          return document.createElement(node.type);
        },
      });
    });
  });
}

const fullSuite = {
  componentProp: testComponentProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer,
};

/**
 * @typedef {Object} ConformanceOptions
 * @property {() => void} [after]
 * @property {Record<string, string>} classes - `classes` of the component provided by `@material-ui/styles`
 * @property {import('react').ElementType} [inheritComponent] - The element type that receives spread props or `undefined` if props are not spread.
 * @property {Array<keyof typeof fullSuite>} [only] - If specified only run the tests listed
 * @property {any} refInstanceof - `ref` will be an instanceof this constructor.
 * @property {Array<keyof typeof fullSuite>} [skip] - Skip the specified tests
 * @property {string} [testComponentPropWith] - The host component that should be rendered instead.
 * @property {(mount: (node: React.ReactNode) => import('enzyme').ReactWrapper) => (node: React.ReactNode) => import('enzyme').ReactWrapper} [wrapMount] - You can use this option to mount the component with enzyme in a WrapperComponent. Make sure the returned node corresponds to the input node and not the wrapper component.
 */

/**
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 */
export default function describeConformance(minimalElement, getOptions) {
  describe('Material-UI component API', () => {
    const {
      after: runAfterHook = () => {},
      only = Object.keys(fullSuite),
      skip = [],
      wrapMount = (mount) => mount,
    } = getOptions();

    const baseMount = createMount();
    const mount = wrapMount(baseMount);

    after(runAfterHook);

    function getTestOptions() {
      return {
        ...getOptions(),
        mount,
      };
    }

    Object.keys(fullSuite)
      .filter((testKey) => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1)
      .forEach((testKey) => {
        const test = fullSuite[testKey];
        test(minimalElement, getTestOptions);
      });
  });
}
