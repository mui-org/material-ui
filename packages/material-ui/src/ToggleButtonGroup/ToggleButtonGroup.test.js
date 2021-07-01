import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, createClientRender } from 'test/utils';
import ToggleButtonGroup, {
  toggleButtonGroupClasses as classes,
} from '@material-ui/core/ToggleButtonGroup';
import ToggleButton from '@material-ui/core/ToggleButton';

describe('<ToggleButtonGroup />', () => {
  const render = createClientRender();

  describeConformanceV5(<ToggleButtonGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiToggleButtonGroup',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
    testVariantProps: { size: 'small' },
    testStateOverrides: { prop: 'orientation', value: 'vertical', styleKey: 'vertical' },
  }));

  it('renders a `group`', () => {
    const { queryByRole } = render(<ToggleButtonGroup aria-label="my group" />);

    expect(queryByRole('group', { name: 'my group' })).not.to.equal(null);
  });

  it('can render group orientation vertically', () => {
    const { getByRole } = render(
      <ToggleButtonGroup orientation="vertical">
        <ToggleButton value="one">1</ToggleButton>
      </ToggleButtonGroup>,
    );
    expect(getByRole('group')).to.have.class('MuiToggleButtonGroup-vertical');
    expect(getByRole('button')).to.have.class('MuiToggleButtonGroup-groupedVertical');
  });

  describe('exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const { getByRole } = render(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(getByRole('button')).to.have.attribute('aria-pressed', 'true');
    });

    it('should not render a selected ToggleButton when its value is not selected', () => {
      const { getAllByRole } = render(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(getAllByRole('button')[1]).to.have.attribute('aria-pressed', 'false');
    });
  });

  describe('non exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const { getAllByRole } = render(
        <ToggleButtonGroup value={['one']}>
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      const buttons = getAllByRole('button');
      expect(buttons[0]).to.have.attribute('aria-pressed', 'true');
      expect(buttons[1]).to.have.attribute('aria-pressed', 'false');
    });
  });

  describe('prop: onChange', () => {
    describe('exclusive', () => {
      it('passed value should be null when current value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value="one" exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal(null);
      });

      it('should be a single value when value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('one');
      });

      it('should be a single value when a new value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup exclusive value="one" onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('two');
      });
    });

    describe('non exclusive', () => {
      it('should be an empty array when current value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.deep.equal([]);
      });

      it('should be an array with a single value when value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one']);
      });

      it('should be an array with a single value when a secondary value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one', 'two']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['two']);
      });

      it('should be an array of all selected values when a second value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one', 'two']);
      });
    });
  });
});
