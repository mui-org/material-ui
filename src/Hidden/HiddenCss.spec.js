// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import HiddenCss from './HiddenCss';

const Foo = () => <div>bar</div>;

describe('<HiddenCss />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = getClasses(
      <HiddenCss>
        <div />
      </HiddenCss>,
    );
  });

  describe('the generated class names', () => {
    it('should be ok with only', () => {
      const wrapper = shallow(
        <HiddenCss only="sm">
          <div className="foo" />
        </HiddenCss>,
      );
      assert.strictEqual(wrapper.props().className, `foo ${classes.onlySm}`);
    });

    it('should be ok with mdDown', () => {
      const wrapper = shallow(
        <HiddenCss mdDown>
          <div className="foo" />
        </HiddenCss>,
      );
      assert.strictEqual(wrapper.props().className, `foo ${classes.mdDown}`);
    });

    it('should be ok with mdUp', () => {
      const wrapper = shallow(
        <HiddenCss mdUp>
          <div className="foo" />
        </HiddenCss>,
      );
      assert.strictEqual(wrapper.props().className, `foo ${classes.mdUp}`);
    });
  });

  describe('prop: children', () => {
    it('should work when empty', () => {
      shallow(<HiddenCss mdUp />);
    });

    it('should work when Node', () => {
      shallow(<HiddenCss mdUp>foo</HiddenCss>);
    });

    it('should work when Element', () => {
      shallow(
        <HiddenCss mdUp>
          <Foo />
        </HiddenCss>,
      );
    });

    it('should work when ChildrenArray', () => {
      shallow(
        <HiddenCss mdUp>
          <Foo />
          <Foo />
          foo
        </HiddenCss>,
      );
    });
  });
});
