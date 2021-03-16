import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createClientRender,
  createMount,
  describeConformanceV5,
  createServerRender,
} from 'test/utils';
import ButtonBase from '../ButtonBase';
import ToggleButton from './ToggleButton';
import classes from './toggleButtonClasses';

describe('<ToggleButton />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<ToggleButton value="X">Hello, World!</ToggleButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    mount,
    muiName: 'MuiToggleButton',
    testVariantProps: { variant: 'foo' },
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    testStateOverrides: { prop: 'size', value: 'large', styleKey: 'sizeLarge' },
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'div',
    skip: ['componentProp', 'componentsProp'],
  }));

  it('adds the `selected` class to the root element if selected={true}', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" selected value="hello">
        Hello World
      </ToggleButton>,
    );

    expect(getByTestId('root')).to.have.class(classes.selected);
  });

  describe('prop: color', () => {
    it('adds the `selectedDefault` class if color="default" and selected={true}', () => {
      const { getByTestId } = render(
        <ToggleButton data-testid="default" color="default" selected value="hello">
          Hello World
        </ToggleButton>,
      );

      expect(getByTestId('default')).to.have.class(classes.default);
    });
    it('adds the `selectedPrimary` class if color="primary" and selected={true}', () => {
      const { getByTestId } = render(
        <ToggleButton data-testid="primary" color="primary" selected value="hello">
          Hello World
        </ToggleButton>,
      );

      expect(getByTestId('primary')).to.have.class(classes.primary);
    });
    it('adds the `selectedSecondary` class if color="secondary" and selected={true}', () => {
      const { getByTestId } = render(
        <ToggleButton data-testid="secondary" color="secondary" selected value="hello">
          Hello World
        </ToggleButton>,
      );

      expect(getByTestId('secondary')).to.have.class(classes.secondary);
    });
  });


  it('should render a disabled button if `disabled={true}`', () => {
    const { getByRole } = render(
      <ToggleButton disabled value="hello">
        Hello World
      </ToggleButton>,
    );

    expect(getByRole('button')).to.have.property('disabled', true);
  });

  it('can render a small button', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" size="small" value="hello">
        Hello World
      </ToggleButton>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" size="large" value="hello">
        Hello World
      </ToggleButton>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });

  describe('prop: onChange', () => {
    it('should be called when clicked', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <ToggleButton value="1" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );

      getByRole('button').click();

      expect(handleChange.callCount).to.equal(1);
    });

    it('should be called with the button value', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <ToggleButton value="1" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );

      getByRole('button').click();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('1');
    });

    it('should not be called if the click is prevented', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <ToggleButton
          value="one"
          onChange={handleChange}
          onClick={(event) => event.preventDefault()}
        >
          Hello
        </ToggleButton>,
      );

      getByRole('button').click();

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('server-side', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    const serverRender = createServerRender({ expectUseLayoutEffectWarning: true });

    it('should server-side render', () => {
      const markup = serverRender(<ToggleButton value="hello">Hello World</ToggleButton>);
      expect(markup.text()).to.equal('Hello World');
    });
  });
});
