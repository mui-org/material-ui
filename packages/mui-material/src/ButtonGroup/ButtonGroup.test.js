import { describe, it, expect } from 'vitest';
import {
  act,
  createRenderer,
  screen,
  simulateKeyboardDevice,
  isJsdom,
} from '@mui/internal-test-utils';
import ButtonGroup, { buttonGroupClasses as classes } from '@mui/material/ButtonGroup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button, { buttonClasses } from '@mui/material/Button';
import ButtonGroupContext from './ButtonGroupContext';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<ButtonGroup />', () => {
  const { render } = createRenderer();

  describeConformance(
    <ButtonGroup>
      <Button>Conformance?</Button>
    </ButtonGroup>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
      muiName: 'MuiButtonGroup',
      testVariantProps: { variant: 'contained' },
    }),
  );

  it('should render with the root class but no others', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    expect(buttonGroup).to.have.class(classes.root);
    expect(buttonGroup).not.to.have.class(classes.contained);
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
  });

  it('should have colorPrimary, horizontal class', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    expect(buttonGroup).to.have.class(classes.colorPrimary);
    expect(buttonGroup).to.have.class(classes.horizontal);
  });

  it('should have colorSecondary class', () => {
    const { container } = render(
      <ButtonGroup color="secondary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );

    const buttonGroup = container.firstChild;
    expect(buttonGroup).to.have.class(classes.colorSecondary);
  });

  it('should render an outlined button', () => {
    render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(buttonClasses.colorPrimary);
    expect(button).not.to.have.class(buttonClasses.colorSecondary);
  });

  it('can render an outlined primary button', () => {
    render(
      <ButtonGroup color="primary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(buttonClasses.colorPrimary);
    expect(button).to.have.class(classes.grouped);
    expect(button).not.to.have.class(buttonClasses.colorSecondary);
  });

  it('can render a contained button', () => {
    render(
      <ButtonGroup variant="contained">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(buttonClasses.contained);
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(buttonClasses.colorPrimary);
    expect(button).not.to.have.class(buttonClasses.colorSecondary);
  });

  it('can render a small button', () => {
    render(
      <ButtonGroup size="small">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(buttonClasses.sizeSmall);
  });

  it('can render a large button', () => {
    render(
      <ButtonGroup size="large">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(buttonClasses.sizeLarge);
  });

  it('should have a ripple', async () => {
    const { container } = render(
      <ButtonGroup>
        <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
      </ButtonGroup>,
    );
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector('.touchRipple')).not.to.equal(null);
  });

  it('can disable the elevation', () => {
    render(
      <ButtonGroup disableElevation>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(buttonClasses.disableElevation);
  });

  it('can disable the ripple', async () => {
    const { container } = render(
      <ButtonGroup disableRipple>
        <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
      </ButtonGroup>,
    );
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector('.touchRipple')).to.equal(null);
  });

  it('applies a global disableRipple (MuiButtonBase.defaultProps) to grouped buttons', async () => {
    const { container } = render(
      <ThemeProvider
        theme={createTheme({
          components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
        })}
      >
        <ButtonGroup>
          <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
        </ButtonGroup>
      </ThemeProvider>,
    );
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector('.touchRipple')).to.equal(null);
  });

  it('explicit disableRipple on ButtonGroup overrides the global default', async () => {
    const { container } = render(
      <ThemeProvider
        theme={createTheme({
          components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
        })}
      >
        <ButtonGroup disableRipple={false}>
          <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
        </ButtonGroup>
      </ThemeProvider>,
    );
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector('.touchRipple')).not.to.equal(null);
  });

  // JSDOM doesn't support :focus-visible
  it.skipIf(isJsdom())(
    'applies a global disableFocusRipple (MuiButton.defaultProps) to grouped buttons',
    async function test() {
      const { container } = render(
        <ThemeProvider
          theme={createTheme({
            components: { MuiButton: { defaultProps: { disableFocusRipple: true } } },
          })}
        >
          <ButtonGroup>
            <Button TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}>
              Hello World
            </Button>
          </ButtonGroup>
        </ThemeProvider>,
      );
      const button = screen.getByRole('button');

      simulateKeyboardDevice();
      await ripple.startFocus(button);

      expect(container.querySelector('.pulsate-focus-visible')).to.equal(null);
    },
  );

  // JSDOM doesn't support :focus-visible
  it.skipIf(isJsdom())(
    'explicit disableFocusRipple on ButtonGroup overrides the global default',
    async function test() {
      const { container } = render(
        <ThemeProvider
          theme={createTheme({
            components: { MuiButton: { defaultProps: { disableFocusRipple: true } } },
          })}
        >
          <ButtonGroup disableFocusRipple={false}>
            <Button TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}>
              Hello World
            </Button>
          </ButtonGroup>
        </ThemeProvider>,
      );
      const button = screen.getByRole('button');

      simulateKeyboardDevice();
      await ripple.startFocus(button);

      expect(container.querySelector('.pulsate-focus-visible')).not.to.equal(null);
    },
  );

  it('should not be fullWidth by default', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = screen.getByRole('button');
    const buttonGroup = container.firstChild;
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
    expect(button).not.to.have.class(buttonClasses.fullWidth);
  });

  it('can pass fullWidth to Button', () => {
    const { container } = render(
      <ButtonGroup fullWidth>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    const button = screen.getByRole('button');
    expect(buttonGroup).to.have.class(classes.fullWidth);
    expect(button).to.have.class(buttonClasses.fullWidth);
  });

  it('classes.grouped should be merged with Button className', () => {
    render(
      <ButtonGroup>
        <Button className="foo-bar">Hello World</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button')).to.have.class(classes.grouped);
    expect(screen.getByRole('button')).to.have.class('foo-bar');
  });

  it('should forward the context to children', () => {
    let context;
    render(
      <ButtonGroup size="large" variant="contained">
        <ButtonGroupContext.Consumer>
          {(value) => {
            context = value;
          }}
        </ButtonGroupContext.Consumer>
      </ButtonGroup>,
    );
    expect(context.variant).to.equal('contained');
    expect(context.size).to.equal('large');
    expect(context.fullWidth).to.equal(false);
    // Unset ripple flags are not forwarded, so each child resolves its own default (#32970).
    expect(context.disableRipple).to.equal(undefined);
    expect(context.disableFocusRipple).to.equal(undefined);
    expect(context.disableElevation).to.equal(false);
    expect(context.disabled).to.equal(false);
    expect(context.color).to.equal('primary');
  });

  describe('theme default props on Button', () => {
    it('should override default variant prop', () => {
      render(
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiButton: {
                defaultProps: {
                  color: 'primary',
                  size: 'medium',
                  variant: 'contained',
                },
              },
            },
          })}
        >
          <ButtonGroup variant="outlined" size="small" color="secondary">
            <Button>Hello World</Button>
          </ButtonGroup>
        </ThemeProvider>,
      );

      expect(screen.getByRole('button')).to.have.class(buttonClasses.outlined);
      expect(screen.getByRole('button')).to.have.class(buttonClasses.sizeSmall);
      expect(screen.getByRole('button')).to.have.class(buttonClasses.colorSecondary);
    });
  });

  describe('position classes', () => {
    it('correctly applies position classes to buttons', () => {
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </ButtonGroup>,
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
        <ButtonGroup>
          <Button>Single Button</Button>
        </ButtonGroup>,
      );

      const button = screen.getByRole('button');

      expect(button).not.to.have.class(classes.firstButton);
      expect(button).not.to.have.class(classes.middleButton);
      expect(button).not.to.have.class(classes.lastButton);
    });

    it('should keep a button mounted when the button before it is removed', async () => {
      function Toolbar({ showUndo }) {
        return (
          <ButtonGroup>
            {showUndo && <Button>Undo</Button>}
            <Button>Save</Button>
            <Button>Delete</Button>
          </ButtonGroup>
        );
      }
      const { setProps } = render(<Toolbar showUndo />);
      const saveButton = screen.getByRole('button', { name: 'Save' });
      await act(async () => {
        saveButton.focus();
      });

      setProps({ showUndo: false });

      expect(screen.getByRole('button', { name: 'Save' })).to.equal(saveButton);
      expect(saveButton).toHaveFocus();
    });
  });
});
