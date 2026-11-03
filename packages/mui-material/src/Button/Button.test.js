import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import {
  createRenderer,
  screen,
  simulateKeyboardDevice,
  within,
  isJsdom,
} from '@mui/internal-test-utils';
import { ClassNames } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button, { buttonClasses as classes } from '@mui/material/Button';
import ButtonBase, { touchRippleClasses } from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Button />', () => {
  const { render, renderToString } = createRenderer();

  /**
   * @param {{ mock: { calls: unknown[][] } }} errorSpy
   * @returns {string[]}
   */
  function getWarningMessages(errorSpy) {
    return errorSpy.mock.calls.map((call) =>
      String(call[0]).replace(/\s+/g, ' ').trim().toLowerCase(),
    );
  }

  /**
   * @param {{ mock: { calls: unknown[][] } }} errorSpy
   * @param {string[]} fragments
   */
  function expectWarningWithFragments(errorSpy, fragments) {
    const messages = getWarningMessages(errorSpy);

    expect(messages.length).to.be.greaterThanOrEqual(1);
    expect(
      messages.some((message) =>
        fragments.every((fragment) => message.includes(fragment.toLowerCase())),
      ),
    ).to.equal(true);
  }

  describeConformance(<Button startIcon="icon">Conformance?</Button>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiButton',
    testDeepOverrides: { slotName: 'startIcon', slotClassName: classes.startIcon },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
  }));

  it('should render with the root, text, and colorPrimary classes but no others', () => {
    render(<Button>Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeLarge);
  });

  it('does not warn for intrinsic non-button components when nativeButton is omitted', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Button component="span">Hello World</Button>);

    expect(screen.getByRole('button')).to.have.tagName('SPAN');
    expect(errorSpy.mock.calls.length).to.equal(0);
    errorSpy.mockRestore();
  });

  it('warns for custom non-button components when nativeButton is omitted', () => {
    const StyledSpan = React.forwardRef(function StyledSpan(props, ref) {
      return <span ref={ref} {...props} />;
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Button component={StyledSpan}>Hello World</Button>);

    expect(screen.getByText('Hello World')).to.have.tagName('SPAN');
    expectWarningWithFragments(errorSpy, ['nativebutton={false}', 'non-<button>']);
    errorSpy.mockRestore();
  });

  it('does not warn for custom button components when nativeButton is omitted', () => {
    const CustomButton = React.forwardRef(function CustomButton(props, ref) {
      return <button ref={ref} {...props} />;
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Button component={CustomButton}>Hello World</Button>);

    expect(screen.getByRole('button')).to.have.tagName('BUTTON');
    expect(errorSpy.mock.calls.length).to.equal(0);
    errorSpy.mockRestore();
  });

  it('does not warn for custom non-button components when nativeButton={false}', () => {
    const StyledSpan = React.forwardRef(function StyledSpan(props, ref) {
      return <span ref={ref} {...props} />;
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Button component={StyledSpan} nativeButton={false}>
        Hello World
      </Button>,
    );

    expect(screen.getByRole('button')).to.have.tagName('SPAN');
    expect(errorSpy.mock.calls.length).to.equal(0);
    errorSpy.mockRestore();
  });

  it('warns when nativeButton={false} is used with a custom component that renders a button', () => {
    const CustomButton = React.forwardRef(function CustomButton(props, ref) {
      return <button ref={ref} {...props} />;
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Button component={CustomButton} nativeButton={false}>
        Hello World
      </Button>,
    );

    expect(screen.getByRole('button')).to.have.tagName('BUTTON');
    expectWarningWithFragments(errorSpy, ['nativebutton', 'false', 'non-<button>']);
    errorSpy.mockRestore();
  });

  it('does not forward focusableWhenDisabled to ButtonBase', () => {
    render(
      <Button disabled focusableWhenDisabled>
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.attribute('disabled');
    expect(button).not.to.have.attribute('aria-disabled');
  });

  it('does not pass classes.root to ButtonBase classes', () => {
    render(<Button classes={{ root: 'my-root-class' }}>Hello</Button>);
    const button = screen.getByRole('button');
    const classList = button.className.split(' ');
    // The root class is not duplicated, it should only be applied once via the className prop.
    expect(classList.filter((c) => c === 'my-root-class')).to.have.length(1);
  });

  it('startIcon and endIcon should have icon class', () => {
    render(
      <Button startIcon={<span>start icon</span>} endIcon={<span>end icon</span>}>
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');
    const startIcon = button.querySelector(`.${classes.startIcon}`);
    const endIcon = button.querySelector(`.${classes.endIcon}`);
    expect(startIcon).to.have.class(classes.icon);
    expect(endIcon).to.have.class(classes.icon);
  });

  it('should add the appropriate color class to root element based on color prop', () => {
    render(
      <React.Fragment>
        <Button color="inherit" data-testid="color-inherit">
          Hello World
        </Button>
        <Button color="primary" data-testid="color-primary">
          Hello World
        </Button>
        <Button color="secondary" data-testid="color-secondary">
          Hello World
        </Button>
        <Button color="success" data-testid="color-success">
          Hello World
        </Button>
        <Button color="error" data-testid="color-error">
          Hello World
        </Button>
        <Button color="info" data-testid="color-info">
          Hello World
        </Button>
        <Button color="warning" data-testid="color-warning">
          Hello World
        </Button>
      </React.Fragment>,
    );

    expect(screen.getByTestId('color-inherit')).to.have.class(classes.colorInherit);
    expect(screen.getByTestId('color-primary')).to.have.class(classes.colorPrimary);
    expect(screen.getByTestId('color-secondary')).to.have.class(classes.colorSecondary);
    expect(screen.getByTestId('color-success')).to.have.class(classes.colorSuccess);
    expect(screen.getByTestId('color-error')).to.have.class(classes.colorError);
    expect(screen.getByTestId('color-info')).to.have.class(classes.colorInfo);
    expect(screen.getByTestId('color-warning')).to.have.class(classes.colorWarning);
  });

  it('can render a text primary button', () => {
    render(<Button color="primary">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
  });

  it('should render a text secondary button', () => {
    render(<Button color="secondary">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).to.have.class(classes.colorSecondary);
  });

  it('should render a text success button', () => {
    render(<Button color="success">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).to.have.class(classes.colorSuccess);
  });

  it('should render a text error button', () => {
    render(<Button color="error">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).to.have.class(classes.colorError);
  });

  it('should render a text info button', () => {
    render(<Button color="info">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).to.have.class(classes.colorInfo);
  });

  it('should render a text warning button', () => {
    render(<Button color="warning">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).to.have.class(classes.colorWarning);
  });

  it('should render an outlined button', () => {
    render(<Button variant="outlined">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.text);
  });

  it('should render a primary outlined button', () => {
    render(
      <Button variant="outlined" color="primary">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
  });

  it('should render a secondary outlined button', () => {
    render(
      <Button variant="outlined" color="secondary">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
  });

  it('should render an inherit outlined button', () => {
    render(
      <Button variant="outlined" color="inherit">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).to.have.class(classes.colorInherit);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
  });

  it('should render a success outlined button', () => {
    render(
      <Button variant="outlined" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).to.have.class(classes.colorSuccess);
  });

  it('should render a error outlined button', () => {
    render(
      <Button variant="outlined" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).to.have.class(classes.colorError);
  });

  it('should render a info outlined button', () => {
    render(
      <Button variant="outlined" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).to.have.class(classes.colorInfo);
  });

  it('should render a warning outlined button', () => {
    render(
      <Button variant="outlined" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).to.have.class(classes.colorWarning);
  });

  it('should render a contained button', () => {
    render(<Button variant="contained">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
  });

  it('should render a contained primary button', () => {
    render(
      <Button variant="contained" color="primary">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorWarning);
  });

  it('should render a contained secondary button', () => {
    render(
      <Button variant="contained" color="secondary">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorWarning);
  });

  it('should render a contained success button', () => {
    render(
      <Button variant="contained" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).to.have.class(classes.colorSuccess);
  });

  it('should render a contained error button', () => {
    render(
      <Button variant="contained" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).to.have.class(classes.colorError);
  });

  it('should render a contained info button', () => {
    render(
      <Button variant="contained" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorWarning);
    expect(button).to.have.class(classes.colorInfo);
  });

  it('should render a contained warning button', () => {
    render(
      <Button variant="contained" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorSuccess);
    expect(button).not.to.have.class(classes.colorError);
    expect(button).not.to.have.class(classes.colorInfo);
    expect(button).to.have.class(classes.colorWarning);
  });

  it('should render a small text button', () => {
    render(<Button size="small">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.contained);
    expect(button).to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large text button', () => {
    render(<Button size="large">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).to.have.class(classes.sizeLarge);
  });

  it('should render a small outlined button', () => {
    render(
      <Button variant="outlined" size="small">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.contained);
    expect(button).to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large outlined button', () => {
    render(
      <Button variant="outlined" size="large">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).to.have.class(classes.sizeLarge);
  });

  it('should render a small contained button', () => {
    render(
      <Button variant="contained" size="small">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).to.have.class(classes.contained);
    expect(button).to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large contained button', () => {
    render(
      <Button variant="contained" size="large">
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).to.have.class(classes.sizeLarge);
  });

  it('should render a button with startIcon', () => {
    render(<Button startIcon={<span>icon</span>}>Hello World</Button>);
    const button = screen.getByRole('button');
    const startIcon = button.querySelector(`.${classes.startIcon}`);

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(startIcon).not.to.have.class(classes.endIcon);
  });

  it('should render a button with endIcon', () => {
    render(<Button endIcon={<span>icon</span>}>Hello World</Button>);
    const button = screen.getByRole('button');
    const endIcon = button.querySelector(`.${classes.endIcon}`);

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(endIcon).not.to.have.class(classes.startIcon);
  });

  it.skipIf(isJsdom())('aligns its text baseline when start-side icons are present', () => {
    const baselineStyle = {
      display: 'inline-block',
      width: 0,
      height: 0,
      padding: 0,
      margin: 0,
      overflow: 'hidden',
      verticalAlign: 'baseline',
    };

    function BaselineMarker(props) {
      return <span {...props} style={baselineStyle} />;
    }

    function TestIcon() {
      return (
        <svg aria-hidden focusable="false" viewBox="0 0 24 24" style={{ display: 'block' }}>
          <path d="M3 5h18v14H3z" />
        </svg>
      );
    }

    function renderRow(name, button) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.75,
          }}
        >
          <span>
            Label
            <BaselineMarker data-testid={`${name}-label-baseline`} />
          </span>
          {button}
        </div>
      );
    }

    function buttonText(name) {
      return (
        <span>
          Button
          <BaselineMarker data-testid={`${name}-button-baseline`} />
        </span>
      );
    }

    render(
      <React.Fragment>
        {renderRow('plain', <Button>{buttonText('plain')}</Button>)}
        {renderRow(
          'start-icon',
          <Button startIcon={<TestIcon />}>{buttonText('start-icon')}</Button>,
        )}
        {renderRow('end-icon', <Button endIcon={<TestIcon />}>{buttonText('end-icon')}</Button>)}
        {renderRow(
          'loading-start',
          <Button loading loadingPosition="start">
            {buttonText('loading-start')}
          </Button>,
        )}
      </React.Fragment>,
    );

    function expectBaselineAligned(name) {
      const labelBaseline = screen
        .getByTestId(`${name}-label-baseline`)
        .getBoundingClientRect().top;
      const buttonBaseline = screen
        .getByTestId(`${name}-button-baseline`)
        .getBoundingClientRect().top;

      expect(Math.abs(buttonBaseline - labelBaseline), `${name} baseline offset`).to.be.lessThan(1);
    }

    expectBaselineAligned('plain');
    expectBaselineAligned('start-icon');
    expectBaselineAligned('end-icon');
    expectBaselineAligned('loading-start');
  });

  it('should have a ripple', async () => {
    render(<Button TouchRippleProps={{ className: 'touch-ripple' }}>Hello World</Button>);

    const button = screen.getByRole('button');
    await ripple.startTouch(button);
    expect(button.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', async () => {
    render(
      <Button disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');
    await ripple.startTouch(button);
    expect(button.querySelector('.touch-ripple')).to.equal(null);
  });

  it('can disable the elevation', () => {
    render(<Button disableElevation>Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.disableElevation);
  });

  // JSDOM doesn't support :focus-visible
  it.skipIf(isJsdom())('should have a focusRipple', async function test() {
    render(
      <Button TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}>
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    simulateKeyboardDevice();
    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  // JSDOM doesn't support :focus-visible
  it.skipIf(isJsdom())('can disable the focusRipple', async function test() {
    render(
      <Button
        disableFocusRipple
        TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}
      >
        Hello World
      </Button>,
    );

    const button = screen.getByRole('button');

    simulateKeyboardDevice();
    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  describe.skipIf(!isJsdom())('server-side', () => {
    it('should server-side render', () => {
      const { container } = renderToString(<Button>Hello World</Button>);
      expect(container.firstChild).to.have.text('Hello World');
    });
  });

  it('should automatically change the button to an anchor element when href is provided', () => {
    const { container } = render(<Button href="https://google.com">Hello</Button>);
    const button = container.firstChild;

    expect(button).to.have.property('nodeName', 'A');
    expect(button).not.to.have.attribute('role');
    expect(button).not.to.have.attribute('type');
    expect(button).to.have.attribute('href', 'https://google.com');
  });

  it('should forward classes to ButtonBase', () => {
    const disabledClassName = 'testDisabledClassName';
    const { container } = render(<Button disabled classes={{ disabled: disabledClassName }} />);

    expect(container.querySelector('button')).to.have.class(disabledClassName);
  });

  it("should disable ripple when MuiButtonBase has disableRipple in theme's defaultProps", () => {
    const theme = createTheme({
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button>Disabled ripple</Button>
      </ThemeProvider>,
    );
    expect(container.firstChild.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
  });

  it("should disable ripple when MuiButtonBase has disableRipple in theme's defaultProps but override on the individual Buttons if provided", async () => {
    const theme = createTheme({
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button disableRipple={false}>Enabled ripple</Button>
        <Button>Disabled ripple 1</Button>
        <Button>Disabled ripple 2</Button>
      </ThemeProvider>,
    );
    await ripple.startTouch(container.querySelector('button'));
    expect(container.querySelectorAll(`.${touchRippleClasses.root}`)).to.have.length(1);
  });

  describe('Emotion compatibility', () => {
    it('classes.root should overwrite builtin styles.', () => {
      // This is pink
      const color = 'rgb(255, 192, 204)';

      render(
        <ClassNames>
          {({ css }) => (
            <Button color="primary" classes={{ root: css({ color }) }}>
              This text should be pink
            </Button>
          )}
        </ClassNames>,
      );

      const button = screen.getByRole('button');

      expect(getComputedStyle(button).color).to.equal(color);
    });

    it('className should overwrite classes.root and builtin styles.', () => {
      const colorPink = 'rgb(255, 192, 204)';
      const colorRed = 'rgb(255, 0, 0)';

      render(
        <ClassNames>
          {({ css }) => (
            <Button
              color="primary"
              className={css({ color: colorRed })}
              classes={{ root: css({ color: colorPink }) }}
            >
              This text should be red
            </Button>
          )}
        </ClassNames>,
      );

      const button = screen.getByRole('button');

      expect(getComputedStyle(button).color).to.equal(colorRed);
    });

    it('classes.* should overwrite builtin styles.', () => {
      // This is pink
      const color = 'rgb(255, 192, 204)';

      render(
        <ClassNames>
          {({ css }) => (
            <Button color="primary" classes={{ text: css({ color }) }}>
              This text should be pink
            </Button>
          )}
        </ClassNames>,
      );

      const button = screen.getByRole('button');

      expect(getComputedStyle(button).color).to.equal(color);
    });
  });

  describe('prop: loading', () => {
    it('should not have a loading wrapper by default', () => {
      const { container } = render(<Button>Test</Button>);

      expect(container.querySelector(`.${classes.loadingWrapper}`)).to.equal(null);
    });

    it('should have a loading wrapper when loading is boolean', () => {
      const { container, rerender } = render(<Button loading={false}>Test</Button>);

      expect(container.querySelector(`.${classes.loadingWrapper}`)).not.to.equal(null);

      rerender(<Button loading>Test</Button>);

      expect(container.querySelector(`.${classes.loadingWrapper}`)).not.to.equal(null);
    });

    it('disables the button', () => {
      render(<Button loading />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('tabIndex', -1);
      expect(button).to.have.property('disabled', true);
    });

    it('cannot be enabled while `loading`', () => {
      render(<Button disabled={false} loading />);

      expect(screen.getByRole('button')).to.have.property('disabled', true);
    });

    it('renders a progressbar that is labelled by the button', () => {
      render(<Button loading>Submit</Button>);

      const button = screen.getByRole('button');
      const progressbar = within(button).getByRole('progressbar');
      expect(progressbar).toHaveAccessibleName('Submit');
    });

    it('has no id when `loading=false` and no `id` prop is present`', () => {
      const id = 'some-id';
      render(
        <React.Fragment>
          <Button />
          <Button id={id} />
        </React.Fragment>,
      );

      const buttons = screen.getAllByRole('button');

      expect(buttons[0]).not.to.have.attribute('id');
      expect(buttons[1]).to.have.attribute('id', id);
    });
  });

  describe('prop: loadingIndicator', () => {
    it('is not rendered by default', () => {
      render(<Button loadingIndicator="loading">Test</Button>);

      expect(screen.getByRole('button')).to.have.text('Test');
    });

    it('is rendered before the children when `loading`', () => {
      render(
        <Button loadingIndicator="loading…" loading>
          Test
        </Button>,
      );

      expect(screen.getByRole('button')).to.have.text('loading…Test');
    });

    it('should have loading position class attached to root when `loading`', () => {
      const view = render(<Button loading>Test</Button>);
      expect(screen.getByRole('button')).to.have.class(classes.loadingPositionCenter);

      view.rerender(
        <Button loading loadingPosition="start">
          Test
        </Button>,
      );
      expect(screen.getByRole('button')).to.have.class(classes.loadingPositionStart);

      view.rerender(
        <Button loading loadingPosition="end">
          Test
        </Button>,
      );
      expect(screen.getByRole('button')).to.have.class(classes.loadingPositionEnd);
    });
  });

  describe('WCAG 2.2 conformance', () => {
    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the button', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">Before</button>
          <Button>Middle</Button>
          <button type="button">After</button>
        </React.Fragment>,
      );

      await user.tab();
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();

      // Tab moves focus back out of the button - it is never captured.
      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

      // Shift+Tab moves back onto it.
      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();

      // Another Shift+Tab moves out of the button - still not captured.
      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in natural DOM order with no positive tabIndex', () => {
        render(<Button>Middle</Button>);
        expect(screen.getByRole('button')).to.have.property('tabIndex', 0);
      });

      it('removes a disabled button from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <Button disabled>Disabled</Button>
            <button type="button">After</button>
          </React.Fragment>,
        );

        await user.tab();
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

        // Tab skips the disabled button and lands on the next control.
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

        // Backwards tabbing also skips the disabled button and lands back on the first control.
        await user.tab({ shift: true });
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
      });

      it('removes a loading button from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <Button loading>Loading</Button>
            <button type="button">After</button>
          </React.Fragment>,
        );

        await user.tab();
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

        // Tab skips the disabled button and lands on the next control.
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

        // Backwards tabbing also skips the disabled button and lands back on the first control.
        await user.tab({ shift: true });
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
      });
    });

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleClick = spy();
      const { user } = render(
        <React.Fragment>
          <Button onClick={handleClick}>Pointer cancellation</Button>
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const button = screen.getByRole('button', { name: 'Pointer cancellation' });

      // Press on the button, move away, then release: nothing runs on the down
      // event, and releasing off the target cancels the activation.
      await user.pointer([
        { keys: '[MouseLeft>]', target: button },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(handleClick.callCount).to.equal(0);

      // A full click — press and release over the target — activates.
      await user.click(button);
      expect(handleClick.callCount).to.equal(1);
    });

    it('3.2.1 On Focus: moving keyboard focus to the button does not activate it', async () => {
      const handleClick = spy();
      const { user } = render(<Button onClick={handleClick}>On focus</Button>);

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
      // Focus alone changes no context.
      expect(handleClick.callCount).to.equal(0);
    });

    it('3.2.2 On Input: toggling the pressed or loading state does not activate the button', async () => {
      const handleClick = spy();
      const { setProps, user } = render(
        <Button onClick={handleClick} aria-pressed={false} loading={false}>
          Toggle
        </Button>,
      );

      // Flipping the pressed and loading state programmatically must not activate the button.
      setProps({ 'aria-pressed': true });
      setProps({ loading: true });
      expect(handleClick.callCount).to.equal(0);

      // Only explicit activation runs the handler. `loading` is turned off first,
      // since a loading button is removed from interaction.
      setProps({ loading: false });
      await user.click(screen.getByRole('button'));
      expect(handleClick.callCount).to.equal(1);
    });

    describe('2.5.3 Label in Name', () => {
      it('uses the visible text as the accessible name', () => {
        render(<Button>Save changes</Button>);

        // getByRole with `name` only resolves if the accessible name matches the label.
        expect(screen.getByRole('button', { name: 'Save changes' })).not.to.equal(null);
      });

      it('keeps the visible words in the name when a decorative icon is present', () => {
        render(<Button startIcon={<span data-testid="icon" />}>Delete</Button>);

        expect(screen.getByRole('button', { name: 'Delete' })).not.to.equal(null);
      });
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('renders a native button with the correct role', () => {
        render(<Button>Submit</Button>);

        expect(screen.getByRole('button', { name: 'Submit' })).to.have.tagName('button');
      });

      it('exposes the link role when rendered as an anchor', () => {
        render(<Button href="/pricing">Pricing</Button>);

        expect(screen.getByRole('link', { name: 'Pricing' })).to.have.tagName('a');
      });

      it('reflects the disabled state', () => {
        render(<Button disabled>Submit</Button>);

        expect(screen.getByRole('button')).to.have.property('disabled', true);
      });
    });
  });
});
