import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { createClientRender, screen } from 'test/utils';
import usePossiblyOpaqueIdentifier from './usePossiblyOpaqueIdentifier';

const TestComponent = ({ id: idProp }) => {
  const id = usePossiblyOpaqueIdentifier(idProp);
  return <span data-testid="test" id={id} />;
};

describe('useId', () => {
  const render = createClientRender();

  it('returns the provided ID', () => {
    const { setProps } = render(<TestComponent id="some-id" />);

    expect(screen.getByTestId('test')).to.have.attribute('id', 'some-id');

    setProps({ id: 'another-id' });

    expect(screen.getByTestId('test')).to.have.attribute('id', 'another-id');
  });

  it("generates an ID if one isn't provided", () => {
    const { setProps } = render(<TestComponent />);

    expect(screen.getByTestId('test')).to.have.attribute('id');

    setProps({ id: 'another-id' });

    expect(screen.getByTestId('test')).to.have.attribute('id', 'another-id');
  });

  it('generates an ID on the server with', () => {
    const container = document.createElement('div');

    container.innerHTML = ReactDOMServer.renderToString(<TestComponent />);

    if (typeof React.unstable_useOpaqueIdentifier !== 'function') {
      expect(container.querySelector('[data-testid="test"]')).not.to.have.attribute('id');
    } else {
      expect(container.querySelector('[data-testid="test"]')).to.have.attribute('id');
    }

    render(<TestComponent />, { container, hydrate: true });

    expect(container.querySelector('[data-testid="test"]')).to.have.attribute('id');
  });
});
