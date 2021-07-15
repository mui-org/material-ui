import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import scStyled from 'styled-components';
import styled from '@material-ui/styled-engine-sc';

describe('styled', () => {
  const render = createClientRender();

  it('should help debug wrong args', () => {
    expect(() => {
      expect(() => {
        styled('span')();
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev(
      'Material-UI: Seems like you called `styled("span")()` without a `style` argument',
    );

    expect(() => {
      expect(() => {
        styled('span')(undefined, { color: 'red' });
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev(
      'Material-UI: the styled("span")(...args) API requires all its args to be defined',
    );
  });

  it('should respect the options', () => {
    const StyledComponent = styled('div', {
      shouldForwardProp: (prop) => prop !== 'color',
      label: 'TestComponent',
    })({ color: 'red' });

    const { container } = render(<StyledComponent color="blue" />);
    expect(container.firstChild).not.to.have.attribute('color');
    expect(container.querySelector('[class^=TestComponent]')).not.to.equal(null);
  });

  it('has primitive', () => {
    expect(styled.div).to.equal(scStyled.div);
  });
});
