// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformance } from 'test/utils';
import Tab from '@material-ui/core/Tab';
import Tabs, { tabsClasses as classes } from '@material-ui/core/Tabs';
import TabList from './TabList';
import TabContext from '../TabContext';

describe('<TabList />', () => {
  const render = createClientRender();

  describeConformance(<TabList />, () => ({
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/15300
    classes,
    inheritComponent: Tabs,
    /**
     * @param {React.ReactNode} node
     */
    render: (node) => render(<TabContext value="0">{node}</TabContext>),
    wrapMount: (mount) => (node) => {
      const wrapper = mount(<TabContext value="0">{node}</TabContext>);
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLDivElement,
    // TODO: no idea why reactTestRenderer fails
    skip: ['reactTestRenderer'],
  }));

  // outside of TabContext pass every test in Tabs

  it('provides the active value to Tab so that they can be indicated as selected', () => {
    const { getAllByRole } = render(
      <TabContext value="0">
        <TabList>
          <Tab value="0" />
          <Tab value="1" />
        </TabList>
      </TabContext>,
    );
    const [tabOne, tabTwo] = getAllByRole('tab');

    expect(tabOne).to.have.attribute('aria-selected', 'true');
    expect(tabTwo).to.have.attribute('aria-selected', 'false');
  });

  it('should accept a null child', () => {
    render(
      <TabContext value="0">
        <TabList>
          <Tab value="0" />
          {null}
        </TabList>
      </TabContext>,
    );
  });
});
