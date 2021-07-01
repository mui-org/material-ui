import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, createClientRender, fireEvent } from 'test/utils';
import NativeSelectInput from './NativeSelectInput';

describe('<NativeSelectInput />', () => {
  const render = createClientRender();

  describeConformanceV5(<NativeSelectInput IconComponent="div" />, () => ({
    only: ['refForwarding'],
    refInstanceof: window.HTMLSelectElement,
    muiName: 'MuiNativeSelectInput',
  }));

  it('should render a native select', () => {
    const { container } = render(
      <NativeSelectInput IconComponent="div" onChange={() => {}} value={10}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );

    expect(container.firstChild.value).to.equal('10');
  });

  it('should respond to update event', () => {
    const handleChange = spy();
    render(
      <NativeSelectInput defaultValue={10} IconComponent="div" onChange={handleChange}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );

    fireEvent.change(document.querySelector('select'), { target: { value: 20 } });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][0].target.value).to.equal('20');
  });

  it('should apply outlined class', () => {
    const outlined = 'outlined';
    const { container } = render(
      <NativeSelectInput IconComponent="div" variant="outlined" classes={{ outlined }} />,
    );

    expect(container.firstChild).to.have.class(outlined);
  });

  it('should apply filled class', () => {
    const filled = 'filled';
    const { container } = render(
      <NativeSelectInput IconComponent="div" variant="filled" classes={{ filled }} />,
    );

    expect(container.firstChild).to.have.class(filled);
  });
});
