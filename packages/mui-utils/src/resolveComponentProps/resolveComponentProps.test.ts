import { expect, describe, it } from 'vitest';
import { spy } from 'sinon';
import resolveComponentProps from './resolveComponentProps';

describe('resolveComponentProps', () => {
  it('returns componentProps as-is when it is a plain object', () => {
    const componentProps = { maxLength: 10 };
    const result = resolveComponentProps(componentProps, { type: 'text' });
    expect(result).to.equal(componentProps);
    expect(result).to.deep.equal({ maxLength: 10 });
  });

  it('calls componentProps once with the ownerState when it is a function', () => {
    const ownerState = { type: 'text' };
    const componentProps = spy((state: typeof ownerState) => ({
      maxLength: state.type === 'text' ? 10 : 20,
    }));

    resolveComponentProps(componentProps, ownerState);

    expect(componentProps.callCount).to.equal(1);
    expect(componentProps.args[0][0]).to.equal(ownerState);
  });

  it('returns the value returned by componentProps when it is a function', () => {
    const returnedProps = { maxLength: 10 };
    const result = resolveComponentProps(() => returnedProps, { type: 'text' });
    expect(result).to.equal(returnedProps);
  });

  it('resolves props based on the ownerState', () => {
    const componentProps = (ownerState: { type: 'text' | 'number' }) => ({
      maxLength: ownerState.type === 'text' ? 10 : 20,
    });

    expect(resolveComponentProps(componentProps, { type: 'text' })).to.deep.equal({
      maxLength: 10,
    });
    expect(resolveComponentProps(componentProps, { type: 'number' })).to.deep.equal({
      maxLength: 20,
    });
  });
});
