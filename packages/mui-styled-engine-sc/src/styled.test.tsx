import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import styled from '@mui/styled-engine-sc';

describe('styled', () => {
  const { render } = createRenderer();

  it('should help debug wrong args', () => {
    expect(() => {
      expect(() => {
        (styled('span') as any)();
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev('MUI: Seems like you called `styled("span")()` without a `style` argument');

    expect(() => {
      expect(() => {
        (styled('span') as any)(undefined, { color: 'red' });
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev('MUI: the styled("span")(...args) API requires all its args to be defined');
  });

  it('should respect the options', () => {
    const StyledComponent = (styled as any)('div', {
      shouldForwardProp: (prop: PropertyKey) => prop !== 'color',
      label: 'TestComponent',
    })({ color: 'red' }) as any;

    render(<StyledComponent data-testid="component" color="blue" />);

    expect(screen.getByTestId('component')).not.to.have.attribute('color');
    expect(screen.getByTestId('component').className).to.match(/^TestComponent-/);
  });

  it("should not allow styled-components's APIs: .attrs", () => {
    expect(typeof styled('span').attrs).to.equal('undefined');
  });

  // The babel-plugin-styled-components depends on the withConfig option to be defined
  it("should allow styled-components's APIs: .withConfig", () => {
    expect(typeof styled('span').withConfig).to.equal('function');
  });
});
