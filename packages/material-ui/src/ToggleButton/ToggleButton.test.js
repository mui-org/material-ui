import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, describeConformanceV5, createServerRender } from 'test/utils';
import ToggleButton, { toggleButtonClasses as classes } from '@material-ui/core/ToggleButton';
import ButtonBase from '@material-ui/core/ButtonBase';

describe('<ToggleButton />', () => {
  const render = createClientRender();

  describeConformanceV5(<ToggleButton value="X">Hello, World!</ToggleButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
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
    it('adds the class if color="primary"', () => {
      const { getByTestId } = render(
        <ToggleButton data-testid="root" color="primary" value="hello">
          Hello World
        </ToggleButton>,
      );

      expect(getByTestId('root')).to.have.class(classes.primary);
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
      const container = serverRender(<ToggleButton value="hello">Hello World</ToggleButton>);
      expect(container.firstChild).to.have.text('Hello World');
    });
  });
});
