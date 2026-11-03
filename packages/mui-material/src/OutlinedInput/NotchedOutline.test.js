import { describe, it, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NotchedOutline from './NotchedOutline';

describe('<NotchedOutline />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    notched: true,
    label: 'My label',
  };

  it('should pass props', () => {
    const { container } = render(
      <NotchedOutline
        {...defaultProps}
        className="notched-outline"
        style={{
          width: 17,
        }}
      />,
    );

    expect(container.querySelector('fieldset')).to.have.class('notched-outline');
    expect(container.querySelector('fieldset').style.width).to.equal('17px');
  });

  it('should set alignment rtl', () => {
    const { container: container1 } = render(
      <ThemeProvider
        theme={createTheme({
          direction: 'ltr',
        })}
      >
        <NotchedOutline {...defaultProps} />
      </ThemeProvider>,
    );
    expect(container1.querySelector('fieldset')).toHaveComputedStyle({
      paddingLeft: '8px',
    });

    const { container: container2 } = render(
      <ThemeProvider
        theme={createTheme({
          direction: 'rtl',
        })}
      >
        <NotchedOutline {...defaultProps} />
      </ThemeProvider>,
    );
    expect(container2.querySelector('fieldset')).toHaveComputedStyle({
      paddingRight: '8px',
    });
  });

  it.skipIf(isJsdom())(
    'should not set padding (notch) for empty, null or undefined label props',
    function test() {
      const spanStyle = { paddingLeft: '0px', paddingRight: '0px' };
      ['', undefined, null].forEach((prop) => {
        const { container: container1 } = render(<NotchedOutline {...defaultProps} label={prop} />);
        expect(container1.querySelector('span')).toHaveComputedStyle(spanStyle);
      });
    },
  );
});
