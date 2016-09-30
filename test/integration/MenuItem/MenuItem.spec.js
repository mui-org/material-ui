import {assert} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import getMuiTheme from 'src/styles/getMuiTheme';
import MenuItem from 'src/MenuItem/MenuItem';

describe('<MenuItem />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should have a min-height to allow display even within null <SelectItem /> option', () => {
    const wrapper = shallowWithContext(<MenuItem />);
    assert.equal(wrapper.find('ListItem').prop('style').minHeight, '48px');
  });
});
