import { describe, it, expect } from 'vitest';
import type { PropDescriptor } from 'react-docgen';
import createDescribeableProp from './createDescribeableProp';

function createProp(description: string, type = 'bool'): PropDescriptor {
  return { description, required: false, type: { name: type } as PropDescriptor['type'] };
}

describe('createDescribeableProp', () => {
  it('describes a documented prop', () => {
    const prop = createDescribeableProp(createProp('If `true`, the thing.'), 'thing');
    expect(prop?.annotation.description).to.equal('If `true`, the thing.');
  });

  it('throws for a prop without a description', () => {
    expect(() => createDescribeableProp(createProp(''), 'thing')).to.throw(
      'The "thing" prop has no description.',
    );
  });

  it('throws for a prop with only tags', () => {
    expect(() => createDescribeableProp(createProp('@deprecated'), 'thing')).to.throw(
      'The "thing" prop has no description.',
    );
  });

  it('ignores a prop with @ignore', () => {
    expect(createDescribeableProp(createProp('@ignore'), 'thing')).to.equal(null);
  });

  it('ignores a string className even when documented', () => {
    expect(createDescribeableProp(createProp('The class name.', 'string'), 'className')).to.equal(
      null,
    );
  });

  it('describes a className with a component-specific type', () => {
    const prop = createDescribeableProp(
      createProp('A function of the state that returns the class name.', 'union'),
      'className',
    );
    expect(prop?.annotation.description).to.equal(
      'A function of the state that returns the class name.',
    );
  });

  it('ignores an undocumented prop declared in a dependency', () => {
    expect(createDescribeableProp(createProp(''), 'thing', {}, true)).to.equal(null);
  });

  it('describes a documented prop declared in a dependency', () => {
    const prop = createDescribeableProp(createProp('The thing.'), 'thing', {}, true);
    expect(prop?.annotation.description).to.equal('The thing.');
  });

  it('ignores a prop with @internal', () => {
    expect(createDescribeableProp(createProp('@internal\nUsed by the parent.'), 'thing')).to.equal(
      null,
    );
  });
});
