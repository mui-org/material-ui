import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import ToggleButtonGroup, {
  toggleButtonGroupClasses as classes,
} from '@mui/material/ToggleButtonGroup';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import describeConformance from '../../test/describeConformance';

describe('<ToggleButtonGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<ToggleButtonGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiToggleButtonGroup',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    testVariantProps: { size: 'small' },
    testStateOverrides: { prop: 'orientation', value: 'vertical', styleKey: 'vertical' },
  }));

  it('renders a `group`', () => {
    render(<ToggleButtonGroup aria-label="my group" />);

    expect(screen.queryByRole('group', { name: 'my group' })).not.to.equal(null);
  });

  it('can render group orientation vertically', () => {
    render(
      <ToggleButtonGroup orientation="vertical">
        <ToggleButton value="one">1</ToggleButton>
      </ToggleButtonGroup>,
    );

    expect(screen.getByRole('group')).to.have.class('MuiToggleButtonGroup-vertical');
    expect(screen.getByRole('button')).to.have.class('MuiToggleButtonGroup-grouped');
  });

  it('should have horizontal class', () => {
    render(
      <ToggleButtonGroup>
        <ToggleButton value="one">1</ToggleButton>
      </ToggleButtonGroup>,
    );

    expect(screen.getByRole('group')).to.have.class(classes.horizontal);
  });

  it('should disable all ToggleButton if disabled prop is passed', () => {
    render(
      <ToggleButtonGroup disabled>
        <ToggleButton value="one">1</ToggleButton>
        <ToggleButton value="two">2</ToggleButton>
      </ToggleButtonGroup>,
    );
    const [firstButton, secondButton] = screen.getAllByRole('button');
    expect(firstButton).to.have.property('disabled', true);
    expect(secondButton).to.have.property('disabled', true);
  });

  describe('keyboard navigation', () => {
    it('should have one tab stop and skip disabled buttons', () => {
      render(
        <ToggleButtonGroup>
          <ToggleButton value="one" disabled>
            One
          </ToggleButton>
          <ToggleButton value="two">Two</ToggleButton>
          <ToggleButton value="three">Three</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(screen.getAllByRole('button').map((button) => button.tabIndex)).to.deep.equal([
        -1, 0, -1,
      ]);
    });

    it('should navigate horizontally and wrap focus', async () => {
      const { user } = render(
        <ToggleButtonGroup>
          <ToggleButton value="one">One</ToggleButton>
          <ToggleButton value="two" disabled>
            Two
          </ToggleButton>
          <ToggleButton value="three">Three</ToggleButton>
        </ToggleButtonGroup>,
      );
      const [firstButton, , thirdButton] = screen.getAllByRole('button');

      await user.tab();
      expect(firstButton).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(thirdButton).toHaveFocus();
      expect(thirdButton).to.have.property('tabIndex', 0);
      expect(firstButton).to.have.property('tabIndex', -1);

      await user.keyboard('{ArrowRight}');
      expect(firstButton).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(thirdButton).toHaveFocus();
    });

    it('should swap direction when RTL is applied', async () => {
      const rtlTheme = createTheme({ direction: 'rtl' });
      const { user } = render(
        <ThemeProvider theme={rtlTheme}>
          <ToggleButtonGroup>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
            <ToggleButton value="three">Three</ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider>,
      );
      const [firstButton, secondButton, thirdButton] = screen.getAllByRole('button');

      await user.tab();
      expect(firstButton).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(secondButton).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(thirdButton).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(secondButton).toHaveFocus();
    });

    it('should navigate vertically and support Home and End', async () => {
      const { user } = render(
        <ToggleButtonGroup orientation="vertical">
          <ToggleButton value="one">One</ToggleButton>
          <ToggleButton value="two">Two</ToggleButton>
          <ToggleButton value="three">Three</ToggleButton>
        </ToggleButtonGroup>,
      );
      const [firstButton, secondButton, thirdButton] = screen.getAllByRole('button');

      await user.tab();
      await user.keyboard('{ArrowDown}');
      expect(secondButton).toHaveFocus();

      await user.keyboard('{End}');
      expect(thirdButton).toHaveFocus();

      await user.keyboard('{Home}');
      expect(firstButton).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(thirdButton).toHaveFocus();
    });

    it('should move focus without changing the selected value', async () => {
      const handleChange = spy();
      const { user } = render(
        <ToggleButtonGroup exclusive value="one" onChange={handleChange}>
          <ToggleButton value="one">One</ToggleButton>
          <ToggleButton value="two">Two</ToggleButton>
        </ToggleButtonGroup>,
      );

      await user.tab();
      await user.keyboard('{ArrowRight}');

      expect(screen.getAllByRole('button')[1]).toHaveFocus();
      expect(handleChange.callCount).to.equal(0);
    });

    it('should support wrapped ToggleButton children', async () => {
      const { user } = render(
        <ToggleButtonGroup>
          <Tooltip title="One">
            <ToggleButton value="one">One</ToggleButton>
          </Tooltip>
          <Tooltip title="Two">
            <ToggleButton value="two">Two</ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>,
      );
      const [firstButton, secondButton] = screen.getAllByRole('button');

      await user.tab();
      expect(firstButton).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(secondButton).toHaveFocus();
    });

    it('should call root event handlers without disabling roving focus', async () => {
      const handleFocus = spy();
      const handleKeyDown = spy();
      const { user } = render(
        <ToggleButtonGroup onFocus={handleFocus} onKeyDown={handleKeyDown}>
          <ToggleButton value="one">One</ToggleButton>
          <ToggleButton value="two">Two</ToggleButton>
        </ToggleButtonGroup>,
      );

      await user.tab();
      await user.keyboard('{ArrowRight}');

      expect(screen.getAllByRole('button')[1]).toHaveFocus();
      expect(handleFocus.callCount).to.be.greaterThan(0);
      expect(handleKeyDown.callCount).to.equal(1);
    });
  });

  describe('exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      render(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(screen.getByRole('button')).to.have.attribute('aria-pressed', 'true');
    });

    it('should not render a selected ToggleButton when its value is not selected', () => {
      render(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(screen.getAllByRole('button')[1]).to.have.attribute('aria-pressed', 'false');
    });
  });

  describe('non exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      render(
        <ToggleButtonGroup value={['one']}>
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).to.have.attribute('aria-pressed', 'true');
      expect(buttons[1]).to.have.attribute('aria-pressed', 'false');
    });
  });

  describe('prop: onChange', () => {
    describe('exclusive', () => {
      it('passed value should be null when current value is toggled off', () => {
        const handleChange = spy();

        render(
          <ToggleButtonGroup value="one" exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        screen.getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal(null);
      });

      it('should be a single value when value is toggled on', () => {
        const handleChange = spy();

        render(
          <ToggleButtonGroup exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        screen.getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('one');
      });

      it('should be a single value when a new value is toggled on', () => {
        const handleChange = spy();

        render(
          <ToggleButtonGroup exclusive value="one" onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        screen.getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('two');
      });
    });

    describe('non exclusive', () => {
      it('should be an empty array when current value is toggled off', () => {
        const handleChange = spy();

        render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        screen.getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.deep.equal([]);
      });

      it('should be an array with a single value when value is toggled on', () => {
        const handleChange = spy();

        render(
          <ToggleButtonGroup onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        screen.getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one']);
      });

      it('should be an array with a single value when a secondary value is toggled off', () => {
        const handleChange = spy();

        render(
          <ToggleButtonGroup value={['one', 'two']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        screen.getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['two']);
      });

      it('should be an array of all selected values when a second value is toggled on', () => {
        const handleChange = spy();

        render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        screen.getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one', 'two']);
      });
    });
  });

  it('should not be fullWidth by default', () => {
    const { container } = render(
      <ToggleButtonGroup>
        <ToggleButton value="one">1</ToggleButton>
        <ToggleButton value="two">2</ToggleButton>
      </ToggleButtonGroup>,
    );
    const button = screen.getAllByRole('button')[1];
    const buttonGroup = container.firstChild;
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
    expect(button).not.to.have.class(toggleButtonClasses.fullWidth);
  });

  it('can pass fullWidth to Button', () => {
    const { container } = render(
      <ToggleButtonGroup fullWidth>
        <ToggleButton value="one">1</ToggleButton>
        <ToggleButton value="two">2</ToggleButton>
      </ToggleButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    const button = screen.getAllByRole('button')[1];
    expect(buttonGroup).to.have.class(classes.fullWidth);
    expect(button).to.have.class(toggleButtonClasses.fullWidth);
  });

  describe('position classes', () => {
    it('correctly applies position classes to buttons', () => {
      render(
        <ToggleButtonGroup value="one">
          <Tooltip title="tooltip">
            <ToggleButton value="one">One</ToggleButton>
          </Tooltip>
          <Tooltip title="tooltip">
            <span>
              <ToggleButton value="two" disabled>
                Two
              </ToggleButton>
            </span>
          </Tooltip>
          <Tooltip title="tooltip">
            <span>
              <ToggleButton value="three" disabled>
                Three
              </ToggleButton>
            </span>
          </Tooltip>
        </ToggleButtonGroup>,
      );

      const firstButton = screen.getAllByRole('button')[0];
      const middleButton = screen.getAllByRole('button')[1];
      const lastButton = screen.getAllByRole('button')[2];

      expect(firstButton).to.have.class(classes.firstButton);
      expect(firstButton).not.to.have.class(classes.middleButton);
      expect(firstButton).not.to.have.class(classes.lastButton);

      expect(middleButton).to.have.class(classes.middleButton);
      expect(middleButton).not.to.have.class(classes.firstButton);
      expect(middleButton).not.to.have.class(classes.lastButton);

      expect(lastButton).to.have.class(classes.lastButton);
      expect(lastButton).not.to.have.class(classes.middleButton);
      expect(lastButton).not.to.have.class(classes.firstButton);
    });

    it('does not apply any position classes to a single button', () => {
      render(
        <ToggleButtonGroup>
          <ToggleButton value="one">One</ToggleButton>
        </ToggleButtonGroup>,
      );

      const button = screen.getByRole('button');

      expect(button).not.to.have.class(classes.firstButton);
      expect(button).not.to.have.class(classes.middleButton);
      expect(button).not.to.have.class(classes.lastButton);
    });

    it('should keep a button mounted when the button before it is removed', async () => {
      function Toolbar({ showLeft }) {
        return (
          <ToggleButtonGroup>
            {showLeft && <ToggleButton value="left">Left</ToggleButton>}
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        );
      }
      const { setProps } = render(<Toolbar showLeft />);
      const centerButton = screen.getByRole('button', { name: 'Center' });
      await act(async () => {
        centerButton.focus();
      });

      setProps({ showLeft: false });

      expect(screen.getByRole('button', { name: 'Center' })).to.equal(centerButton);
      expect(centerButton).toHaveFocus();
    });
  });

  describe('WCAG 2.2 conformance', () => {
    it('2.1.1 Keyboard: Space and Enter select the focused button', async () => {
      // Arrow-key navigation is covered by the `keyboard navigation` block.
      const handleChange = spy();
      const { user } = render(
        <ToggleButtonGroup value={null} exclusive onChange={handleChange}>
          <ToggleButton value="bold">Bold</ToggleButton>
          <ToggleButton value="italic">Italic</ToggleButton>
        </ToggleButtonGroup>,
      );

      await user.tab();
      await user.keyboard('[Space]');
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.args[1]).to.equal('bold');

      await user.keyboard('{ArrowRight}');
      await user.keyboard('[Enter]');
      expect(handleChange.callCount).to.equal(2);
      expect(handleChange.secondCall.args[1]).to.equal('italic');
    });

    describe('1.3.1 Info and Relationships', () => {
      it('exposes the group role on the root', () => {
        render(
          <ToggleButtonGroup value="left">
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>,
        );

        expect(screen.getByRole('group')).not.to.equal(null);
      });
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('names the group from its aria-label', () => {
        render(
          <ToggleButtonGroup value="left" aria-label="text alignment">
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>,
        );

        expect(screen.getByRole('group', { name: 'text alignment' })).not.to.equal(null);
      });

      it('reflects the exclusive selection as aria-pressed on the children', async () => {
        function ControlledGroup() {
          const [alignment, setAlignment] = React.useState('left');
          return (
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={(event, newAlignment) => setAlignment(newAlignment)}
              aria-label="text alignment"
            >
              <ToggleButton value="left" disableRipple>
                Left
              </ToggleButton>
              <ToggleButton value="right" disableRipple>
                Right
              </ToggleButton>
            </ToggleButtonGroup>
          );
        }

        const { user } = render(<ControlledGroup />);
        const [left, right] = screen.getAllByRole('button');
        expect(left).to.have.attribute('aria-pressed', 'true');
        expect(right).to.have.attribute('aria-pressed', 'false');

        await user.click(right);
        expect(left).to.have.attribute('aria-pressed', 'false');
        expect(right).to.have.attribute('aria-pressed', 'true');
      });
    });
  });
});
