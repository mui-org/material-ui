// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import BottomNavigationItem, { styleSheet } from './BottomNavigationItem';

describe('<BottomNavigationItem>', () => {
  let shallow;
  let classes;
  const icon = <span className="material-icons">restore</span>;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(
      <BottomNavigationItem icon={icon} />
    );
    assert.strictEqual(wrapper.is('ButtonBase'), true, 'should be a ButtonBase');
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<BottomNavigationItem className="woof" icon={icon} />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the selected and root classes', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} selected />);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the selectedIconOnly and root classes', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} showLabel={false} />);
    assert.strictEqual(wrapper.hasClass(classes.selectedIconOnly), true,
      'should have the selectedIconOnly class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render icon with the icon class', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true, 'should have the icon class');
  });

  it('should render icon with the user and icon classes', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.hasClass('material-icons'), true, 'should have the material-icons class');
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true, 'should have the icon class');
  });

  it('should render label with the label class', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} />);
    const label = wrapper.childAt(1);
    assert.strictEqual(label.hasClass(classes.label), true, 'should have the label class');
  });

  it('should render label with the selectedLabel class', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} selected />);
    const label = wrapper.childAt(1);
    assert.strictEqual(label.hasClass(classes.selectedLabel), true, 'should have the selectedLabel class');
    assert.strictEqual(label.hasClass(classes.label), true, 'should have the label class');
  });

  it('should render label with the hiddenLabel class', () => {
    const wrapper = shallow(<BottomNavigationItem icon={icon} showLabel={false} />);
    const label = wrapper.childAt(1);
    assert.strictEqual(label.hasClass(classes.hiddenLabel), true, 'should have the hiddenLabel class');
    assert.strictEqual(label.hasClass(classes.label), true, 'should have the label class');
  });

  it('should render a font icon if a icon string is passed', () => {
    const wrapper = shallow(<BottomNavigationItem icon="book" />);
    assert.strictEqual(wrapper.find('.material-icons').length, 1, 'should have the material icons class');
  });
});
